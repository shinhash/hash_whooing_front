import { Link } from 'react-router';

// 실제 구현 시 entities/ledger의 useMyLedgers() 훅(React Query)으로 TB_LEDGER_MEMBER 기준 목록 조회
export default function LedgerListPage() {
  return (
    <div>
      <h1>내 장부</h1>
      {/* TODO: useMyLedgers() 연동 후 목록 렌더링 */}
      <Link to="/ledgers/sample-ledger-id">샘플 장부로 이동</Link>
    </div>
  );
}
