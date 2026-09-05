import { useState } from "react";
import LoaderScreen from "../../comm/ui/Loader";
import { LedgerIcon, EyeIcon, EyeOffIcon } from "../../comm/ui/Icons";
import { useLocation, useNavigate } from 'react-router';

// type Props = {
//   onSignup: () => void;
//   onGoLogin: () => void;
// };

type Field = "name" | "email" | "phone" | "password" | "passwordConfirm";

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export default function JoinUs() {
  const navigate = useNavigate();
  const location = useLocation();

  // ProtectedRoute에서 state.from으로 전달한 원래 목적지가 있으면 그곳으로, 없으면 /ledgers로 이동
  const from = (location.state as { from?: Location })?.from?.pathname ?? '/ledgers';
  
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", passwordConfirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "done">("form");

  function set(field: Field, value: string) {
    setForm((f) => ({ ...f, [field]: field === "phone" ? formatPhone(value) : value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate() {
    const next: Partial<Record<Field, string>> = {};
    if (!form.name.trim()) next.name = "이름을 입력해 주세요.";
    if (!form.email.includes("@")) next.email = "유효한 이메일을 입력해 주세요.";
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) next.phone = "전화번호를 올바르게 입력해 주세요.";
    if (form.password.length < 8) next.password = "비밀번호는 8자 이상이어야 합니다.";
    if (form.password !== form.passwordConfirm) next.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("done");
    }, 900);
  }

  /**
   * FUNCTION LINE
   */
  const moveLoginPage = () => {
    navigate('/login');
  }

  if(loading) return(<LoaderScreen size={100} label="loading..." />);

  if (step === "done") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f1117] px-6">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#2dd4bf]/10">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="16" cy="16" r="14" />
              <polyline points="10,16 14,20 22,12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#e2e8f0]">가입이 완료됐습니다!</h2>
          <p className="mt-2 text-sm text-[#64748b]">
            <span className="text-[#2dd4bf]">{form.name}</span>님, 후잉 부기에 오신 걸 환영합니다.
          </p>
          <button
            className="mt-8 w-full rounded-lg bg-[#2dd4bf] py-3 text-sm font-semibold text-[#0f1117] hover:opacity-90 transition-opacity"
          >
            시작하기
          </button>
        </div>
      </div>
    );
  }

  const pwStrength = (() => {
    const p = form.password;
    if (p.length === 0) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "약함", "보통", "강함", "매우 강함"][pwStrength];
  const strengthColor = ["", "#f87171", "#fbbf24", "#34d399", "#2dd4bf"][pwStrength];

  return (
    <div className="flex min-h-screen bg-[#0f1117]">
      {/* Left branding */}
      <div className="hidden lg:flex lg:w-[440px] flex-col justify-between bg-[#161b27] border-r border-[#2a3348] px-12 py-50">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#2dd4bf] text-[#0f1117]">
            <LedgerIcon />
          </div>
          <span className="text-sm font-semibold tracking-wide text-[#e2e8f0]">후잉 부기</span>
        </div>

        <div>
          <p className="text-3xl font-bold leading-snug text-[#e2e8f0]">
            지금 시작하면<br />
            재무가 보입니다.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#64748b]">
            무료로 가입하고 복식부기 기반의<br />
            스마트한 가계 관리를 시작하세요.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { icon: "✓", text: "차변·대변 복식부기 자동 처리" },
            { icon: "✓", text: "재무상태표·손익계산서 자동 생성" },
            { icon: "✓", text: "예산 설정 및 초과 알림" },
            { icon: "✓", text: "모바일·PC 어디서나 사용 가능" },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2dd4bf]/15 text-[10px] font-bold text-[#2dd4bf]">
                {f.icon}
              </span>
              <span className="text-sm text-[#94a3b8]">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#2dd4bf] text-[#0f1117]">
            <LedgerIcon />
          </div>
          <span className="text-sm font-semibold text-[#e2e8f0]">후잉 부기</span>
        </div>

        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-[#e2e8f0]">회원가입</h1>
          <p className="mt-1.5 text-sm text-[#64748b]">무료로 시작하세요</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* 이름 */}
            <Field
              label="이름"
              error={errors.name}
            >
              <input
                type="text"
                placeholder="홍길동"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={input(!!errors.name)}
              />
            </Field>

            {/* 이메일 */}
            <Field label="이메일" error={errors.email}>
              <input
                type="email"
                placeholder="hong@example.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={input(!!errors.email)}
              />
            </Field>

            {/* 전화번호 */}
            <Field label="전화번호" error={errors.phone}>
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={input(!!errors.phone)}
              />
            </Field>

            {/* 비밀번호 */}
            <Field label="비밀번호" error={errors.password}>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="8자 이상 입력"
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  className={input(!!errors.password) + " pr-11"}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors"
                >
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ background: i <= pwStrength ? strengthColor : "#2a3348" }}
                      />
                    ))}
                  </div>
                  <p className="text-[11px]" style={{ color: strengthColor }}>{strengthLabel}</p>
                </div>
              )}
            </Field>

            {/* 비밀번호 확인 */}
            <Field label="비밀번호 확인" error={errors.passwordConfirm}>
              <div className="relative">
                <input
                  type={showPw2 ? "text" : "password"}
                  placeholder="비밀번호 재입력"
                  value={form.passwordConfirm}
                  onChange={(e) => set("passwordConfirm", e.target.value)}
                  className={input(!!errors.passwordConfirm) + " pr-11"}
                />
                <button
                  type="button"
                  onClick={() => setShowPw2((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors"
                >
                  {showPw2 ? <EyeOffIcon /> : <EyeIcon />}
                </button>
                {form.passwordConfirm.length > 0 && form.password === form.passwordConfirm && (
                  <span className="absolute right-9 top-1/2 -translate-y-1/2 text-[#34d399]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="2,7 5.5,10.5 12,4" />
                    </svg>
                  </span>
                )}
              </div>
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#2dd4bf] py-3 text-sm font-semibold text-[#0f1117] transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
            >
              {loading ? "가입 중..." : "회원가입"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#64748b]">
            이미 계정이 있으신가요?{" "}
            <button onClick={moveLoginPage} className="font-medium text-[#2dd4bf] hover:underline">
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function input(hasError: boolean) {
  return `w-full rounded-lg border bg-[#161b27] px-4 py-3 text-sm text-[#e2e8f0] placeholder:text-[#475569] transition-colors focus:outline-none ${
    hasError
      ? "border-[#f87171]/60 focus:border-[#f87171]"
      : "border-[#2a3348] focus:border-[#2dd4bf]/60"
  }`;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block mb-1.5 text-xs font-medium text-[#94a3b8]">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-[#f87171]">{error}</p>}
    </div>
  );
}

