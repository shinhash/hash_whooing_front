import { useParams, Link } from 'react-router';

export default function TransactionListPage() {
  const { ledgerId } = useParams<{ ledgerId: string }>();
  return (
    <div>
      <h1>거래내역</h1>
      <Link to={`/ledgers/${ledgerId}/transactions/new`}>거래 등록</Link>
      {/* TODO: transactionKeys.list(ledgerId, filter) 쿼리 + 가상화 리스트 */}
    </div>
  );
}
