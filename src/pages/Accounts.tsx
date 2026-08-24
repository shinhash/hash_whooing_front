import { useState } from "react";

type AccountGroup = {
  code: string;
  name: string;
  type: string;
  balance: number;
  children?: { code: string; name: string; balance: number }[];
};

const ACCOUNTS: AccountGroup[] = [
  {
    code: "1",
    name: "자산",
    type: "asset",
    balance: 42_850_000,
    children: [
      { code: "101", name: "현금", balance: 1_350_000 },
      { code: "102", name: "보통예금", balance: 18_500_000 },
      { code: "103", name: "카카오뱅크", balance: 8_200_000 },
      { code: "104", name: "토스뱅크", balance: 5_400_000 },
      { code: "105", name: "적금", balance: 9_400_000 },
    ],
  },
  {
    code: "2",
    name: "부채",
    type: "liability",
    balance: 8_200_000,
    children: [
      { code: "201", name: "신용카드", balance: 420_000 },
      { code: "202", name: "전세보증금", balance: 7_780_000 },
    ],
  },
  {
    code: "3",
    name: "자본",
    type: "equity",
    balance: 34_650_000,
    children: [{ code: "301", name: "자본금", balance: 34_650_000 }],
  },
  {
    code: "4",
    name: "수익",
    type: "income",
    balance: 4_220_000,
    children: [
      { code: "401", name: "급여수익", balance: 3_800_000 },
      { code: "402", name: "기타수익", balance: 300_000 },
      { code: "403", name: "배당수익", balance: 120_000 },
    ],
  },
  {
    code: "5",
    name: "비용",
    type: "expense",
    balance: 331_500,
    children: [
      { code: "501", name: "식비", balance: 48_500 },
      { code: "502", name: "교통비", balance: 80_000 },
      { code: "503", name: "여가비", balance: 92_000 },
      { code: "504", name: "공과금", balance: 111_000 },
    ],
  },
];

const TYPE_COLORS: Record<string, string> = {
  asset: "#2dd4bf",
  liability: "#f87171",
  equity: "#a78bfa",
  income: "#34d399",
  expense: "#fbbf24",
};

const TYPE_LABELS: Record<string, string> = {
  asset: "자산",
  liability: "부채",
  equity: "자본",
  income: "수익",
  expense: "비용",
};

function fmt(n: number) {
  return n.toLocaleString("ko-KR");
}

export default function Accounts() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["1", "4"]));

  function toggle(code: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  }

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-4">
      {/* Summary pills */}
      <div className="flex flex-wrap gap-2">
        {ACCOUNTS.map((g) => (
          <div
            key={g.code}
            className="rounded-lg border border-[#2a3348] bg-[#161b27] px-4 py-2.5"
          >
            <span className="text-xs text-[#64748b]">{TYPE_LABELS[g.type]} </span>
            <span className="mono text-sm font-semibold" style={{ color: TYPE_COLORS[g.type] }}>
              {fmt(g.balance)}원
            </span>
          </div>
        ))}
      </div>

      {/* Account tree */}
      <div className="rounded-xl border border-[#2a3348] bg-[#161b27] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#2a3348] px-5 py-4">
          <h2 className="text-sm font-semibold text-[#e2e8f0]">계정과목 목록</h2>
          <button className="rounded-lg border border-[#2a3348] px-3 py-1.5 text-xs text-[#64748b] hover:border-[#2dd4bf]/40 hover:text-[#2dd4bf] transition-colors">
            + 계정 추가
          </button>
        </div>

        <div className="divide-y divide-[#2a3348]/50">
          {ACCOUNTS.map((g) => (
            <div key={g.code}>
              {/* Group row */}
              <button
                onClick={() => toggle(g.code)}
                className="flex w-full items-center gap-3 px-5 py-4 hover:bg-[#1e2535]/50 transition-colors"
              >
                <span
                  className="mono flex h-6 w-6 items-center justify-center rounded text-[10px] font-semibold"
                  style={{
                    background: TYPE_COLORS[g.type] + "18",
                    color: TYPE_COLORS[g.type],
                  }}
                >
                  {g.code}
                </span>
                <span className="flex-1 text-left text-sm font-semibold text-[#e2e8f0]">
                  {g.name}
                </span>
                <span
                  className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    background: TYPE_COLORS[g.type] + "18",
                    color: TYPE_COLORS[g.type],
                  }}
                >
                  {TYPE_LABELS[g.type]}
                </span>
                <span className="mono text-sm font-semibold text-[#e2e8f0]">
                  {fmt(g.balance)}
                </span>
                <span className="mono text-[11px] text-[#64748b] ml-1">원</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="1.5"
                  className={`transition-transform ${expanded.has(g.code) ? "rotate-180" : ""}`}
                >
                  <polyline points="2,4 6,8 10,4" />
                </svg>
              </button>

              {/* Children */}
              {expanded.has(g.code) && g.children && (
                <div className="border-t border-[#2a3348]/40 bg-[#0f1117]/40">
                  {g.children.map((child) => (
                    <div
                      key={child.code}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-[#1e2535]/30 transition-colors cursor-pointer"
                    >
                      <div className="w-6" />
                      <span className="mono text-[11px] text-[#64748b] w-8">{child.code}</span>
                      <span className="flex-1 text-sm text-[#94a3b8]">{child.name}</span>
                      <span className="mono text-sm text-[#e2e8f0]">{fmt(child.balance)}</span>
                      <span className="mono text-[11px] text-[#64748b]">원</span>
                      <div className="w-4" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
