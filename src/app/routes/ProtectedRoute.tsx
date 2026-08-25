import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../providers/AuthProvider';
import Loader from '../../comm/ui/Loader';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const location = useLocation();

  // 세션 복원(리프레시 토큰 검증) 진행 중에는 로그인 페이지로 성급히 튕기지 않는다.
  if (status === 'idle' || status === 'loading') {
    return <Loader />;
  }

  if (status === 'unauthenticated') {
    // 로그인 후 원래 가려던 경로로 되돌아갈 수 있도록 state에 목적지를 담아 전달
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
