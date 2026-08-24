const SUMMARY = [
  { label: "자산", value: 42_850_000, sub: "현금·예금·투자", color: "#2dd4bf", sign: 1 },
  { label: "부채", value: 8_200_000, sub: "카드·대출", color: "#f87171", sign: -1 },
  { label: "순자산", value: 34_650_000, sub: "자산 − 부채", color: "#a78bfa", sign: 1 },
  { label: "이번달 수익", value: 5_400_000, sub: "8월 수익 합계", color: "#34d399", sign: 1 },
  { label: "이번달 지출", value: 2_180_000, sub: "8월 비용 합계", color: "#fbbf24", sign: -1 },
];

const RECENT = [
  { date: "08-24", desc: "이마트 식비", debit: "식비", credit: "현금", amount: 42_000, type: "expense" },
  { date: "08-24", desc: "기타 식비", debit: "식비", credit: "현금", amount: 42000, type: "expense" },
  { date: "08-23", desc: "급여 수령", debit: "보통예금", credit: "급여수익", amount: 3_800_000, type: "income" },
  { date: "08-22", desc: "넷플릭스 구독", debit: "여가비", credit: "신용카드", amount: 17_000, type: "expense" },
  { date: "08-21", desc: "카카오뱅크 이체", debit: "카카오뱅크", credit: "보통예금", amount: 500_000, type: "transfer" },
  { date: "08-20", desc: "주유비", debit: "교통비", credit: "현금", amount: 80_000, type: "expense" },
  { date: "08-19", desc: "부업 수입", debit: "보통예금", credit: "기타수익", amount: 300_000, type: "income" },
  { date: "08-18", desc: "전기요금", debit: "공과금", credit: "신용카드", amount: 56_000, type: "expense" },
];

const BUDGET_ITEMS = [
  { label: "식비", used: 420_000, total: 600_000 },
  { label: "교통비", used: 110_000, total: 150_000 },
  { label: "여가비", used: 87_000, total: 200_000 },
  { label: "공과금", used: 56_000, total: 100_000 },
];

function fmt(n: number) {
  return n.toLocaleString("ko-KR");
}

export default function Dashboard() {
  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {SUMMARY.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[#2a3348] bg-[#161b27] p-4"
          >
            <p className="text-[11px] font-medium uppercase tracking-wider text-[#64748b]">
              {s.label}
            </p>
            <p
              className="mono mt-1.5 text-lg font-semibold leading-tight"
              style={{ color: s.color }}
            >
              {fmt(s.value)}
              <span className="text-xs font-normal text-[#64748b]"> 원</span>
            </p>
            <p className="mt-1 text-[10px] text-[#64748b]">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Recent transactions */}
        <div className="rounded-xl border border-[#2a3348] bg-[#161b27] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#2a3348] px-5 py-4">
            <h2 className="text-sm font-semibold text-[#e2e8f0]">최근 거래</h2>
            <button className="text-xs text-[#2dd4bf] hover:underline">전체 보기</button>
          </div>
          <div className="divide-y divide-[#2a3348]/60">
            {RECENT.map((t, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-[#1e2535]/50 transition-colors">
                <span className="mono w-10 shrink-0 text-[11px] text-[#64748b]">{t.date}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[#e2e8f0]">{t.desc}</p>
                  <p className="text-[11px] text-[#64748b]">{t.credit} → {t.debit}</p>
                </div>
                <span
                  className="mono shrink-0 text-sm font-medium"
                  style={{
                    color:
                      t.type === "income"
                        ? "#34d399"
                        : t.type === "expense"
                          ? "#f87171"
                          : "#94a3b8",
                  }}
                >
                  {t.type === "expense" ? "−" : t.type === "income" ? "+" : ""}
                  {fmt(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget + mini chart */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[#2a3348] bg-[#161b27] overflow-hidden">
            <div className="border-b border-[#2a3348] px-5 py-4">
              <h2 className="text-sm font-semibold text-[#e2e8f0]">예산 현황</h2>
              <p className="text-[11px] text-[#64748b] mt-0.5">8월 지출 예산</p>
            </div>
            <div className="px-5 py-4 space-y-4">
              {BUDGET_ITEMS.map((b) => {
                const pct = Math.round((b.used / b.total) * 100);
                const color = pct > 90 ? "#f87171" : pct > 70 ? "#fbbf24" : "#2dd4bf";
                return (
                  <div key={b.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#94a3b8]">{b.label}</span>
                      <span className="mono text-[#64748b]">
                        {fmt(b.used)} / {fmt(b.total)}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#2a3348] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                    <p className="text-right text-[10px] mt-0.5" style={{ color }}>
                      {pct}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly balance */}
          <div className="rounded-xl border border-[#2a3348] bg-[#161b27] p-5">
            <h2 className="text-sm font-semibold text-[#e2e8f0]">월간 잔액</h2>
            <div className="mt-4 space-y-2">
              {[
                { m: "5월", v: 2_800_000 },
                { m: "6월", v: 3_100_000 },
                { m: "7월", v: 2_650_000 },
                { m: "8월", v: 3_220_000 },
              ].map((d) => {
                const max = 3_500_000;
                return (
                  <div key={d.m} className="flex items-center gap-2">
                    <span className="w-6 text-[11px] text-[#64748b]">{d.m}</span>
                    <div className="flex-1 h-5 rounded bg-[#2a3348] overflow-hidden">
                      <div
                        className="h-full rounded bg-[#2dd4bf]/20 flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${(d.v / max) * 100}%` }}
                      >
                        <span className="mono text-[10px] text-[#2dd4bf]">{fmt(d.v)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
