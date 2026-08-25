import { useParams } from 'react-router-dom';

export default function TransactionEditPage() {
  const { ledgerId, txnId } = useParams<{ ledgerId: string; txnId: string }>();
  return (
    <h1>
      거래 수정 - {ledgerId} / {txnId}
    </h1>
  );
}
