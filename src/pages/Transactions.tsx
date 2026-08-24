import { useState } from "react";

type TxType = "all" | "income" | "expense" | "transfer";

const ALL_TX = [
  { id: 1, date: "2026-08-24", desc: "이마트 식비", debit: "식비", credit: "현금", amount: 42_000, type: "expense" as const },
  { id: 2, date: "2026-08-23", desc: "급여 수령", debit: "보통예금", credit: "급여수익", amount: 3_800_000, type: "income" as const },
  { id: 3, date: "2026-08-22", desc: "넷플릭스 구독", debit: "여가비", credit: "신용카드", amount: 17_000, type: "expense" as const },
  { id: 4, date: "2026-08-21", desc: "카카오뱅크 이체", debit: "카카오뱅크", credit: "보통예금", amount: 500_000, type: "transfer" as const },
  { id: 5, date: "2026-08-20", desc: "주유비", debit: "교통비", credit: "현금", amount: 80_000, type: "expense" as const },
  { id: 6, date: "2026-08-19", desc: "부업 수입", debit: "보통예금", credit: "기타수익", amount: 300_000, type: "income" as const },
  { id: 7, date: "2026-08-18", desc: "전기요금", debit: "공과금", credit: "신용카드", amount: 56_000, type: "expense" as const },
  { id: 8, date: "2026-08-17", desc: "커피숍", debit: "식비", credit: "현금", amount: 6_500, type: "expense" as const },
  { id: 9, date: "2026-08-16", desc: "정기 저축", debit: "적금", credit: "보통예금", amount: 500_000, type: "transfer" as const },
  { id: 10, date: "2026-08-15", desc: "통신비", debit: "공과금", credit: "신용카드", amount: 55_000, type: "expense" as const },
  { id: 11, date: "2026-08-14", desc: "배당금 수령", debit: "보통예금", credit: "배당수익", amount: 120_000, type: "income" as const },
  { id: 12, date: "2026-08-13", desc: "헬스장 월회비", debit: "여가비", credit: "신용카드", amount: 75_000, type: "expense" as const },
];

const TYPE_LABELS: Record<string, string> = {
  income: "수익",
  expense: "지출",
  transfer: "이체",
};

const TYPE_COLORS: Record<string, string> = {
  income: "#34d399",
  expense: "#f87171",
  transfer: "#94a3b8",
};

function fmt(n: number) {
  return n.toLocaleString("ko-KR");
}

export default function Transactions() {
  const [filter, setFilter] = useState<TxType>("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_TX.filter(
    (t) =>
      (filter === "all" || t.type === filter) &&
      (search === "" ||
        t.desc.includes(search) ||
        t.debit.includes(search) ||
        t.credit.includes(search))
  );

  const totals = {
    income: ALL_TX.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
    expense: ALL_TX.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 max-w-5xl mx-auto">
      {/* Header stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[#2a3348] bg-[#161b27] p-4">
          <p className="text-[11px] uppercase tracking-wider text-[#64748b]">8월 수익</p>
          <p className="mono mt-1 text-xl font-semibold text-[#34d399]">{fmt(totals.income)}<span className="text-xs text-[#64748b]"> 원</span></p>
        </div>
        <div className="rounded-xl border border-[#2a3348] bg-[#161b27] p-4">
          <p className="text-[11px] uppercase tracking-wider text-[#64748b]">8월 지출</p>
          <p className="mono mt-1 text-xl font-semibold text-[#f87171]">{fmt(totals.expense)}<span className="text-xs text-[#64748b]"> 원</span></p>
        </div>
        <div className="rounded-xl border border-[#2a3348] bg-[#161b27] p-4 col-span-2 sm:col-span-1">
          <p className="text-[11px] uppercase tracking-wider text-[#64748b]">순수지</p>
          <p className="mono mt-1 text-xl font-semibold text-[#2dd4bf]">
            {fmt(totals.income - totals.expense)}<span className="text-xs text-[#64748b]"> 원</span>
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-[#2a3348] bg-[#161b27] overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-[#2a3348] p-4 sm:flex-row sm:items-center">
          <div className="flex gap-1">
            {(["all", "income", "expense", "transfer"] as TxType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-[#2dd4bf]/10 text-[#2dd4bf]"
                    : "text-[#64748b] hover:bg-[#1e2535] hover:text-[#94a3b8]"
                }`}
              >
                {f === "all" ? "전체" : TYPE_LABELS[f]}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-auto w-full rounded-lg border border-[#2a3348] bg-[#1e2535] px-3 py-1.5 text-sm text-[#e2e8f0] placeholder:text-[#64748b] focus:border-[#2dd4bf]/50 focus:outline-none sm:w-48"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a3348]">
                {["날짜", "내용", "차변", "대변", "유형", "금액"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#64748b]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a3348]/50">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-[#1e2535]/50 transition-colors cursor-pointer">
                  <td className="mono px-5 py-3.5 text-[#64748b]">{t.date.slice(5)}</td>
                  <td className="px-5 py-3.5 text-[#e2e8f0]">{t.desc}</td>
                  <td className="px-5 py-3.5 text-[#94a3b8]">{t.debit}</td>
                  <td className="px-5 py-3.5 text-[#94a3b8]">{t.credit}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        color: TYPE_COLORS[t.type],
                        background: TYPE_COLORS[t.type] + "18",
                      }}
                    >
                      {TYPE_LABELS[t.type]}
                    </span>
                  </td>
                  <td className="mono px-5 py-3.5 text-right font-medium" style={{ color: TYPE_COLORS[t.type] }}>
                    {t.type === "expense" ? "−" : t.type === "income" ? "+" : ""}
                    {fmt(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-[#64748b]">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
