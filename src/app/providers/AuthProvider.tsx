import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { httpClient, setAccessTokenGetter } from '../../comm/api-client/httpClient';

interface AuthUser {
  userId: string;
  email: string;
  name: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthContextValue['status']>('idle');

  // httpClient interceptor가 매 요청마다 최신 accessToken을 읽을 수 있도록 getter를 등록.
  // (state 클로저 문제를 피하기 위해 ref 대신 getter 함수를 주입하는 방식 사용)
  useEffect(() => {
    setAccessTokenGetter(() => accessToken);
  }, [accessToken]);

  // 앱 최초 로드시: HttpOnly 쿠키(Refresh Token) 기반으로 세션 복원 시도
  useEffect(() => {
    (async () => {
      setStatus('loading');
      try {
        const { data } = await httpClient.post('/auth/refresh');
        setAccessToken(data.accessToken);
        setUser(data.user);
        setStatus('authenticated');
      } catch {
        setStatus('unauthenticated');
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await httpClient.post('/auth/login', { email, password });
    setAccessToken(data.accessToken);
    setUser(data.user);
    setStatus('authenticated');
  };

  const logout = () => {
    httpClient.post('/auth/logout').finally(() => {
      setAccessToken(null);
      setUser(null);
      setStatus('unauthenticated');
    });
  };

  const value = useMemo(
    () => ({ user, accessToken, status, login, logout }),
    [user, accessToken, status],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
  return ctx;
}
