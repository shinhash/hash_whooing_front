import { useParams } from 'react-router';

export default function LedgerDashboardPage() {
  const { ledgerId } = useParams<{ ledgerId: string }>();
  // 실제 구현 시 balanceKeys.summary(ledgerId, period) 쿼리로 잔액 요약 조회 (설계서 4.2절)
  return <h1>장부 대시보드 - {ledgerId}</h1>;
}
