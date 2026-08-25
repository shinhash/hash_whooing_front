export interface ApiResponse<T> {
  data: T;
  meta?: {
    totalCount?: number;
    page?: number;
  };
}

export interface ApiFieldError {
  field: string;
  reason: string;
}

export interface ApiError {
  code: string; // 예: TXN_BALANCE_MISMATCH, LEDGER_NOT_FOUND
  message: string;
  fieldErrors?: ApiFieldError[];
}
