import { useQuery } from '@tanstack/react-query';
import { ledgerMemberApi } from './api';

export const ledgerMemberKeys = {
  myMembership: (ledgerId: string) => ['ledger-member', 'me', ledgerId] as const,
};

export function useMyLedgerMembership(ledgerId: string | undefined) {
  return useQuery({
    queryKey: ledgerMemberKeys.myMembership(ledgerId ?? ''),
    queryFn: () => ledgerMemberApi.getMyMembership(ledgerId as string),
    enabled: !!ledgerId,
    // 권한 정보는 자주 바뀌지 않으므로 신선도를 길게 가져가고,
    // 멤버 관리 화면에서 역할 변경 시 명시적으로 invalidate 한다.
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
