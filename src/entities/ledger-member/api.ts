import { httpClient } from '../../comm/api-client/httpClient';
import type { ApiResponse } from '../../types/api';
import type { LedgerMembership } from './types';

export const ledgerMemberApi = {
  // 현재 로그인 사용자의 특정 장부에 대한 멤버십/역할을 조회한다.
  // 서버는 TB_LEDGER_MEMBER를 조회해 응답하며, 멤버가 아닌 경우 404를 반환한다.
  getMyMembership: (ledgerId: string) =>
    httpClient
      .get<ApiResponse<LedgerMembership>>(`/ledgers/${ledgerId}/members/me`)
      .then((r) => r.data.data),
};
