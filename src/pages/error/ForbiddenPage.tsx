import { Link } from 'react-router';

export default function ForbiddenPage() {
  return (
    <div>
      <h1>403 - 접근 권한이 없습니다</h1>
      <p>이 장부에 대한 권한이 부족합니다. 장부 소유자에게 권한을 요청하세요.</p>
      <Link to="/ledgers">내 장부로 이동</Link>
    </div>
  );
}
