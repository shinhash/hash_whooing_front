export type LedgerRole = 'OWNER' | 'EDITOR' | 'VIEWER';

export interface LedgerMembership {
  ledgerId: string;
  userId: string;
  role: LedgerRole;
  joinedAt: string;
}
