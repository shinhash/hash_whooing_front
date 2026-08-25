import axios, { AxiosError } from 'axios';
import type { ApiError } from '../../types/api';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // Refresh Token(HttpOnly 쿠키) 전송을 위해 필수
});

// AuthProvider가 매 렌더링마다 최신 accessToken을 이 getter로 등록해 둔다.
// (모듈 스코프 axios 인스턴스는 React 상태를 직접 구독할 수 없으므로 함수 주입 방식 사용)
let accessTokenGetter: () => string | null = () => null;
export function setAccessTokenGetter(getter: () => string | null) {
  accessTokenGetter = getter;
}

httpClient.interceptors.request.use((config) => {
  const token = accessTokenGetter();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<() => void> = [];

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !isRefreshing) {
      isRefreshing = true;
      try {
        await httpClient.post('/auth/refresh');
        pendingQueue.forEach((resolve) => resolve());
        pendingQueue = [];
        return httpClient(originalRequest);
      } catch (refreshError) {
        pendingQueue = [];
        window.location.href = '/login';
        return Promise.reject(normalizeApiError(refreshError as AxiosError));
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(normalizeApiError(error));
  },
);

function normalizeApiError(error: AxiosError): ApiError {
  const data = error.response?.data as Partial<ApiError> | undefined;
  return {
    code: data?.code ?? 'UNKNOWN_ERROR',
    message: data?.message ?? error.message ?? '요청 처리 중 오류가 발생했습니다.',
    fieldErrors: data?.fieldErrors,
  };
}
