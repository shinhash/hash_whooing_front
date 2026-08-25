import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';

import { router } from './router';
import { AuthProvider } from './providers/AuthProvider';

// 서버 상태 캐시 정책의 기본값.
// - staleTime: 화면 진입마다 무조건 재조회하지 않도록 기본 30초 신선도 부여
// - retry: 401/403은 재시도 대상이 아니므로 httpClient interceptor에서 별도 처리 후 여기서는 네트워크 오류만 재시도
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
