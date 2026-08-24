import { useState } from "react";

type ReportTab = "balance" | "income" | "cashflow";

function fmt(n: number) {
  return n.toLocaleString("ko-KR");
}

function Row({ label, amount, indent = 0, bold = false, color }: {
  label: string;
  amount: number;
  indent?: number;
  bold?: boolean;
  color?: string;
}) {
  return (
    <div
      className={`flex items-center border-b border-[#2a3348]/40 py-2.5 ${bold ? "" : "hover:bg-[#1e2535]/30"} transition-colors`}
      style={{ paddingLeft: `${20 + indent * 20}px`, paddingRight: "20px" }}
    >
      <span className={`flex-1 text-sm ${bold ? "font-semibold text-[#e2e8f0]" : "text-[#94a3b8]"}`}>
        {label}
      </span>
      <span
        className="mono text-sm font-medium"
        style={{ color: color ?? (bold ? "#e2e8f0" : "#94a3b8") }}
      >
        {fmt(Math.abs(amount))}
      </span>
      <span className="mono ml-1 text-[11px] text-[#64748b]">원</span>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-[#1e2535] px-5 py-2">
      <p className="text-[11px] font-medium uppercase tracking-widest text-[#64748b]">{title}</p>
    </div>
  );
}

function BalanceSheet() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Assets */}
      <div className="rounded-xl border border-[#2a3348] bg-[#161b27] overflow-hidden">
        <div className="border-b border-[#2a3348] px-5 py-4">
          <h3 className="text-sm font-semibold text-[#2dd4bf]">자산</h3>
        </div>
        <SectionHeader title="유동자산" />
        <Row label="현금" amount={1_350_000} indent={1} />
        <Row label="보통예금" amount={18_500_000} indent={1} />
        <Row label="카카오뱅크" amount={8_200_000} indent={1} />
        <Row label="토스뱅크" amount={5_400_000} indent={1} />
        <Row label="유동자산 합계" amount={33_450_000} bold color="#2dd4bf" />
        <SectionHeader title="비유동자산" />
        <Row label="적금" amount={9_400_000} indent={1} />
        <Row label="비유동자산 합계" amount={9_400_000} bold color="#2dd4bf" />
        <Row label="자산 총계" amount={42_850_000} bold color="#2dd4bf" />
      </div>

      {/* Liabilities + Equity */}
      <div className="rounded-xl border border-[#2a3348] bg-[#161b27] overflow-hidden">
        <div className="border-b border-[#2a3348] px-5 py-4">
          <h3 className="text-sm font-semibold text-[#f87171]">부채 · 자본</h3>
        </div>
        <SectionHeader title="부채" />
        <Row label="신용카드" amount={420_000} indent={1} />
        <Row label="전세보증금" amount={7_780_000} indent={1} />
        <Row label="부채 합계" amount={8_200_000} bold color="#f87171" />
        <SectionHeader title="자본" />
        <Row label="자본금" amount={34_650_000} indent={1} />
        <Row label="자본 합계" amount={34_650_000} bold color="#a78bfa" />
        <Row label="부채·자본 총계" amount={42_850_000} bold color="#e2e8f0" />
      </div>
    </div>
  );
}

function IncomeStatement() {
  const revenue = 4_220_000;
  const expense = 331_500;
  const net = revenue - expense;
  return (
    <div className="rounded-xl border border-[#2a3348] bg-[#161b27] overflow-hidden max-w-2xl">
      <div className="border-b border-[#2a3348] px-5 py-4">
        <h3 className="text-sm font-semibold text-[#e2e8f0]">손익계산서</h3>
        <p className="text-[11px] text-[#64748b] mt-0.5">2026년 8월 1일 ~ 8월 24일</p>
      </div>
      <SectionHeader title="수익" />
      <Row label="급여수익" amount={3_800_000} indent={1} />
      <Row label="기타수익" amount={300_000} indent={1} />
      <Row label="배당수익" amount={120_000} indent={1} />
      <Row label="수익 합계" amount={revenue} bold color="#34d399" />
      <SectionHeader title="비용" />
      <Row label="식비" amount={48_500} indent={1} />
      <Row label="교통비" amount={80_000} indent={1} />
      <Row label="여가비" amount={92_000} indent={1} />
      <Row label="공과금" amount={111_000} indent={1} />
      <Row label="비용 합계" amount={expense} bold color="#f87171" />
      <div className="border-t border-[#2a3348] bg-[#1e2535]/50 px-5 py-4">
        <div className="flex items-center">
          <span className="flex-1 text-sm font-bold text-[#e2e8f0]">당기 순이익</span>
          <span className="mono text-xl font-bold text-[#34d399]">{fmt(net)}</span>
          <span className="mono ml-1 text-sm text-[#64748b]">원</span>
        </div>
      </div>
    </div>
  );
}

function CashFlow() {
  const weeks = ["1주차", "2주차", "3주차", "4주차"];
  const income = [3_800_000, 300_000, 120_000, 0];
  const expense = [89_000, 148_000, 17_000, 77_500];
  const maxVal = 4_000_000;

  return (
    <div className="rounded-xl border border-[#2a3348] bg-[#161b27] overflow-hidden max-w-3xl">
      <div className="border-b border-[#2a3348] px-5 py-4">
        <h3 className="text-sm font-semibold text-[#e2e8f0]">현금흐름</h3>
        <p className="text-[11px] text-[#64748b] mt-0.5">8월 주별 수입 / 지출</p>
      </div>
      <div className="px-6 py-6 space-y-6">
        {weeks.map((w, i) => (
          <div key={w} className="space-y-1.5">
            <div className="flex justify-between text-xs text-[#64748b] mb-2">
              <span>{w}</span>
              <span className="mono">
                <span className="text-[#34d399]">+{fmt(income[i])}</span>
                {" / "}
                <span className="text-[#f87171]">−{fmt(expense[i])}</span>
              </span>
            </div>
            <div className="h-4 rounded-full bg-[#2a3348] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#34d399]/60"
                style={{ width: `${(income[i] / maxVal) * 100}%` }}
              />
            </div>
            <div className="h-2 rounded-full bg-[#2a3348] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#f87171]/70"
                style={{ width: `${(expense[i] / maxVal) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="grid grid-cols-3 divide-x divide-[#2a3348] border-t border-[#2a3348]">
        {[
          { label: "총 수입", val: 4_220_000, color: "#34d399" },
          { label: "총 지출", val: 331_500, color: "#f87171" },
          { label: "순수지", val: 3_888_500, color: "#2dd4bf" },
        ].map((s) => (
          <div key={s.label} className="px-5 py-4 text-center">
            <p className="text-[11px] text-[#64748b]">{s.label}</p>
            <p className="mono mt-1 text-sm font-semibold" style={{ color: s.color }}>
              {fmt(s.val)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reports() {
  const [tab, setTab] = useState<ReportTab>("balance");

  const TABS: { id: ReportTab; label: string }[] = [
    { id: "balance", label: "재무상태표" },
    { id: "income", label: "손익계산서" },
    { id: "cashflow", label: "현금흐름" },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-6xl mx-auto">
      {/* Period selector + tabs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg border border-[#2a3348] bg-[#161b27] p-1 self-start">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === t.id
                  ? "bg-[#2dd4bf]/10 text-[#2dd4bf]"
                  : "text-[#64748b] hover:text-[#94a3b8]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-[#2a3348] bg-[#161b27] px-3 py-1.5 text-xs text-[#94a3b8] focus:outline-none">
            <option>2026년</option>
            <option>2025년</option>
          </select>
          <select className="rounded-lg border border-[#2a3348] bg-[#161b27] px-3 py-1.5 text-xs text-[#94a3b8] focus:outline-none">
            <option>8월</option>
            <option>7월</option>
            <option>6월</option>
          </select>
          <button className="rounded-lg border border-[#2a3348] px-3 py-1.5 text-xs text-[#64748b] hover:border-[#2dd4bf]/40 hover:text-[#2dd4bf] transition-colors">
            내보내기
          </button>
        </div>
      </div>

      {tab === "balance" && <BalanceSheet />}
      {tab === "income" && <IncomeStatement />}
      {tab === "cashflow" && <CashFlow />}
    </div>
  );
}
