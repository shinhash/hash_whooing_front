import { isRouteErrorResponse, useRouteError, useNavigate } from 'react-router';

export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  const status = isRouteErrorResponse(error) ? error.status : undefined;
  const message =
    isRouteErrorResponse(error) && error.statusText
      ? error.statusText
      : error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.';

  return (
    <div className="route-error">
      <h1>{status ?? '오류'}</h1>
      <p>{message}</p>
      <button type="button" onClick={() => navigate('/ledgers')}>내 장부로 이동</button>
    </div>
  );
}
