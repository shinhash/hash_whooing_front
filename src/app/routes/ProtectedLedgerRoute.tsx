import type { ReactNode } from 'react';
import { Navigate, Outlet, useParams } from 'react-router';
import { useMyLedgerMembership } from '../../entities/ledger-member/queries';
import type { LedgerRole } from '../../entities/ledger-member/types';
import Loader from '../../comm/ui/Loader';

interface ProtectedLedgerRouteProps {
  children?: ReactNode;
  /** 지정 시 해당 role 목록에 포함된 사용자만 접근 허용 (미지정 시 멤버이기만 하면 허용) */
  requiredRole?: LedgerRole[];
}

/**
 * 라우팅 레벨의 권한 제어는 "화면 노출" 목적일 뿐이며,
 * 실제 쓰기 작업(거래 등록/수정, 멤버 초대 등)의 최종 권한 검증은
 * 각 API 호출 시점에 서버가 재확인한다 (05_Frontend설계서 11장 원칙).
 */
export function ProtectedLedgerRoute({ children, requiredRole }: ProtectedLedgerRouteProps) {
  const { ledgerId } = useParams<{ ledgerId: string }>();
  const { data: membership, isLoading, isError } = useMyLedgerMembership(ledgerId);

  if (isLoading) {
    return <Loader />;
  }

  // 멤버가 아니거나(404) 조회 실패 시 장부 목록으로 되돌린다.
  if (isError || !membership) {
    return <Navigate to="/ledgers" replace />;
  }

  if (requiredRole && !requiredRole.includes(membership.role)) {
    return <Navigate to="/403" replace />;
  }

  // children이 주어지면 그대로 렌더링(리프 라우트), 없으면 중첩 라우트의 Outlet을 렌더링(레이아웃 라우트)
  return <>{children ?? <Outlet />}</>;
}
