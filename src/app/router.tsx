import { createBrowserRouter, Navigate } from 'react-router';
import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';

import { RootLayout } from './layouts/RootLayout';
import { LedgerLayout } from './layouts/LedgerLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { ProtectedLedgerRoute } from './routes/ProtectedLedgerRoute';
import Loader from '../comm/ui/Loader';
import { RouteErrorBoundary } from './routes/RouteErrorBoundary';

/**
 * 코드 스플리팅 원칙
 * - 페이지 단위(pages/*)는 항상 lazy import 한다.
 * - features/entities 내부 공용 훅/유틸은 정적 import를 유지해 번들 분리 단위를 "화면"으로 고정한다.
 * - React.lazy는 default export만 지원하므로 각 페이지는 default export를 갖는다.
 */
const withSuspense = (node: ReactNode) => <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Loader size={100} label='loading...' /></div>}>{node}</Suspense>;

const Login = lazy(() => import('../pages/auth/Login'));

const LedgerListPage = lazy(() => import('../pages/ledger/LedgerListPage'));
const LedgerDashboardPage = lazy(() => import('../pages/ledger/LedgerDashboardPage'));

const TransactionListPage = lazy(() => import('../pages/transaction/TransactionListPage'));
const TransactionNewPage = lazy(() => import('../pages/transaction/TransactionNewPage'));
const TransactionEditPage = lazy(() => import('../pages/transaction/TransactionEditPage'));

const AccountManagePage = lazy(() => import('../pages/account/AccountManagePage'));

const ReportPage = lazy(() => import('../pages/report/ReportPage'));
// const MemberManagePage = lazy(() => import('../pages/member/MemberManagePage'));
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'));
const NotFoundPage = lazy(() => import('../pages/error/NotFoundPage'));
const ForbiddenPage = lazy(() => import('../pages/error/ForbiddenPage'));

/**
 * 라우트 트리
 *
 * /login
 * /                              -> /ledgers 로 리다이렉트
 * /ledgers                       -> 장부 목록 (인증만 필요)
 * /ledgers/:ledgerId             -> LedgerLayout (멤버십 검증) 하위에 중첩
 *   ├── /                        -> 대시보드
 *   ├── /transactions            -> 거래내역 목록
 *   ├── /transactions/new        -> 거래 등록
 *   ├── /transactions/:txnId/edit-> 거래 수정
 *   ├── /accounts                -> 계정과목 관리
 *   ├── /reports/:period?        -> 리포트
 *   └── /members                 -> 공유 멤버 관리 (소유자/편집자만)
 * /settings
 * /403, *(404)
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: withSuspense(<Login />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="/ledgers" replace /> },
      { path: 'ledgers', element: withSuspense(<LedgerListPage />) },
      {
        path: 'ledgers/:ledgerId',
        element: (
          <ProtectedLedgerRoute>
            <LedgerLayout />
          </ProtectedLedgerRoute>
        ),
        children: [
          { index: true, element: withSuspense(<LedgerDashboardPage />) },
          { path: 'transactions', element: withSuspense(<TransactionListPage />) },
          { path: 'transactions/new', element: withSuspense(<TransactionNewPage />) },
          { path: 'transactions/:txnId/edit', element: withSuspense(<TransactionEditPage />) },
          { path: 'accounts', element: withSuspense(<AccountManagePage />) },
          { path: 'reports/:period?', element: withSuspense(<ReportPage />) },
          {
            path: 'members',
            element: (
              <ProtectedLedgerRoute requiredRole={['OWNER', 'EDITOR']}>
                {/* {withSuspense(<MemberManagePage />)} */}
              </ProtectedLedgerRoute>
            ),
          },
        ],
      },
      { path: 'settings', element: withSuspense(<SettingsPage />) },
      { path: '403', element: withSuspense(<ForbiddenPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
]);
