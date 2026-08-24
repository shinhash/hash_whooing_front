import { useState } from "react";

type Props = {
  onLogin: () => void;
  onGoSignup: () => void;
};

export default function Login({ onLogin, onGoSignup }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해 주세요.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  }

  return (
    <div className="flex min-h-screen bg-[#0f1117]">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[480px] flex-col justify-between bg-[#161b27] border-r border-[#2a3348] px-12 py-50">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#2dd4bf] text-[#0f1117]">
            <LedgerIcon />
          </div>
          <span className="text-sm font-semibold tracking-wide text-[#e2e8f0]">후잉 부기</span>
        </div>

        <div>
          <p className="text-3xl font-bold leading-snug text-[#e2e8f0]">
            복식부기로<br />
            돈의 흐름을<br />
            정확히 파악하세요.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#64748b]">
            수입·지출을 차변·대변으로 기록하면<br />
            재무상태표와 손익계산서가 자동으로 만들어집니다.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-2 lg:hidden">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#2dd4bf] text-[#0f1117]">
            <LedgerIcon />
          </div>
          <span className="text-sm font-semibold text-[#e2e8f0]">후잉 부기</span>
        </div>

        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-[#e2e8f0]">로그인</h1>
          <p className="mt-1.5 text-sm text-[#64748b]">계정에 로그인하세요</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-1.5 text-xs font-medium text-[#94a3b8]">이메일</label>
              <input
                type="email"
                placeholder="hong@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#2a3348] bg-[#161b27] px-4 py-3 text-sm text-[#e2e8f0] placeholder:text-[#475569] transition-colors focus:border-[#2dd4bf]/60 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-medium text-[#94a3b8]">비밀번호</label>
                <button type="button" className="text-xs text-[#2dd4bf] hover:underline">
                  비밀번호 찾기
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[#2a3348] bg-[#161b27] px-4 py-3 pr-11 text-sm text-[#e2e8f0] placeholder:text-[#475569] transition-colors focus:border-[#2dd4bf]/60 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors"
                >
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg bg-[#f87171]/10 px-4 py-2.5 text-xs text-[#f87171]">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#2dd4bf] py-3 text-sm font-semibold text-[#0f1117] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#64748b]">
            계정이 없으신가요?{" "}
            <button
              onClick={onGoSignup}
              className="font-medium text-[#2dd4bf] hover:underline"
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function LedgerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="2" width="12" height="2" rx="1" />
      <rect x="2" y="6" width="8" height="2" rx="1" />
      <rect x="2" y="10" width="10" height="2" rx="1" />
      <rect x="2" y="14" width="6" height="1.5" rx="0.75" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <ellipse cx="8" cy="8" rx="6" ry="4" />
      <circle cx="8" cy="8" r="1.5" />
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="2" y1="2" x2="14" y2="14" />
      <path d="M6.5 6.6A2 2 0 0 0 9.4 9.5" />
      <path d="M4 4.8C2.8 5.7 2 7 2 8c0 2 2.7 4 6 4a8 8 0 0 0 3-.6" />
      <path d="M12.5 11.3C13.5 10.4 14 9.2 14 8c0-2-2.7-4-6-4a8 8 0 0 0-1.5.15" />
    </svg>
  );
}
