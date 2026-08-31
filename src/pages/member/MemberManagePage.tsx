import { useParams } from 'react-router';

// 라우터 단계에서 이미 OWNER/EDITOR만 진입 가능하도록 가드되어 있음 (router.tsx의 requiredRole 참조)
export default function MemberManagePage() {
  const { ledgerId } = useParams<{ ledgerId: string }>();
  return <h1>멤버 관리 - {ledgerId}</h1>;
}
