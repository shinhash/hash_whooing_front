import { useParams } from 'react-router-dom';

export default function ReportPage() {
  const { ledgerId, period } = useParams<{ ledgerId: string; period?: string }>();
  return (
    <h1>
      리포트 - {ledgerId} ({period ?? '이번 달'})
    </h1>
  );
}
