import { useParams } from 'react-router';

export default function AccountManagePage() {
  const { ledgerId } = useParams<{ ledgerId: string }>();
  return <h1>계정과목 관리 - {ledgerId}</h1>;
}
