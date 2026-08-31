import { useParams } from 'react-router';

export default function TransactionNewPage() {
  const { ledgerId } = useParams<{ ledgerId: string }>();
  // 실제 구현 시 features/transaction-create/TransactionForm 컴포넌트를 여기서 사용 (설계서 6장)
  return <h1>거래 등록 - {ledgerId}</h1>;
}
