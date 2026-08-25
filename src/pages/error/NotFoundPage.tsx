import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <Link to="/ledgers">내 장부로 이동</Link>
    </div>
  );
}
