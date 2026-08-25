import { NavLink, Outlet, useParams } from 'react-router';

export function LedgerLayout() {
  const { ledgerId } = useParams<{ ledgerId: string }>();

  // NavLink에 상대 경로 대신 ledgerId를 포함한 절대 경로를 명시해
  // 새로고침/딥링크 시에도 항상 올바른 장부 컨텍스트를 가리키도록 한다.
  const navItem = (to: string, label: string) => (
    <NavLink
      to={`/ledgers/${ledgerId}${to}`}
      end={to === ''}
      className={({ isActive }) => (isActive ? 'ledger-nav__item is-active' : 'ledger-nav__item')}
    >
      {label}
    </NavLink>
  );

  return (
    <div className="ledger-layout">
      <aside className="ledger-nav">
        {navItem('', '대시보드')}
        {navItem('/transactions', '거래내역')}
        {navItem('/accounts', '계정과목')}
        {navItem('/reports', '리포트')}
        {navItem('/members', '멤버 관리')}
      </aside>

      <section className="ledger-content">
        {/* transactions, accounts, reports 등 하위 라우트가 렌더링된다 */}
        <Outlet />
      </section>
    </div>
  );
}
