import { useState } from "react";

const ACCOUNT_LIST = [
  "현금", "보통예금", "카카오뱅크", "토스뱅크", "적금", "신용카드",
  "급여수익", "기타수익", "배당수익",
  "식비", "교통비", "여가비", "공과금", "의료비", "교육비",
];

type Line = { account: string; debit: string; credit: string };

function fmt(n: number) {
  return n.toLocaleString("ko-KR");
}

function parseAmount(s: string) {
  return parseInt(s.replace(/,/g, ""), 10) || 0;
}

const PRESETS = [
  { label: "급여 수령", lines: [{ account: "보통예금", debit: "3800000", credit: "" }, { account: "급여수익", debit: "", credit: "3800000" }] },
  { label: "식비 지출", lines: [{ account: "식비", debit: "50000", credit: "" }, { account: "현금", debit: "", credit: "50000" }] },
  { label: "계좌 이체", lines: [{ account: "카카오뱅크", debit: "500000", credit: "" }, { account: "보통예금", debit: "", credit: "500000" }] },
];

export default function Journal() {
  const [date, setDate] = useState("2026-08-24");
  const [desc, setDesc] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { account: "", debit: "", credit: "" },
    { account: "", debit: "", credit: "" },
  ]);
  const [saved, setSaved] = useState(false);

  const totalDebit = lines.reduce((s, l) => s + parseAmount(l.debit), 0);
  const totalCredit = lines.reduce((s, l) => s + parseAmount(l.credit), 0);
  const balanced = totalDebit > 0 && totalDebit === totalCredit;

  function updateLine(i: number, field: keyof Line, value: string) {
    setLines((prev) => prev.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)));
  }

  function addLine() {
    setLines((prev) => [...prev, { account: "", debit: "", credit: "" }]);
  }

  function removeLine(i: number) {
    setLines((prev) => prev.filter((_, idx) => idx !== i));
  }

  function applyPreset(p: typeof PRESETS[number]) {
    setLines(p.lines);
    setDesc(p.label);
  }

  function handleSave() {
    if (!balanced) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-5">
      {/* Presets */}
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-wider text-[#64748b]">빠른 입력</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p)}
              className="rounded-lg border border-[#2a3348] bg-[#1e2535] px-3 py-1.5 text-xs font-medium text-[#94a3b8] hover:border-[#2dd4bf]/40 hover:text-[#2dd4bf] transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-[#2a3348] bg-[#161b27] overflow-hidden">
        <div className="border-b border-[#2a3348] px-6 py-4">
          <h2 className="text-sm font-semibold text-[#e2e8f0]">분개 입력</h2>
          <p className="text-[11px] text-[#64748b] mt-0.5">차변 합계 = 대변 합계여야 합니다</p>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Date + desc */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1.5 text-xs font-medium text-[#64748b]">날짜</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-[#2a3348] bg-[#1e2535] px-3 py-2 text-sm text-[#e2e8f0] focus:border-[#2dd4bf]/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1.5 text-xs font-medium text-[#64748b]">적요</label>
              <input
                type="text"
                placeholder="거래 설명을 입력하세요"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full rounded-lg border border-[#2a3348] bg-[#1e2535] px-3 py-2 text-sm text-[#e2e8f0] placeholder:text-[#64748b] focus:border-[#2dd4bf]/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Lines */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {["계정과목", "차변 (Dr.)", "대변 (Cr.)", ""].map((h) => (
                    <th key={h} className="pb-2 text-left text-[11px] font-medium uppercase tracking-wider text-[#64748b]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-2">
                {lines.map((line, i) => (
                  <tr key={i}>
                    <td className="pr-2 pb-2">
                      <select
                        value={line.account}
                        onChange={(e) => updateLine(i, "account", e.target.value)}
                        className="w-full rounded-lg border border-[#2a3348] bg-[#1e2535] px-3 py-2 text-sm text-[#e2e8f0] focus:border-[#2dd4bf]/50 focus:outline-none"
                      >
                        <option value="">계정 선택</option>
                        {ACCOUNT_LIST.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </td>
                    <td className="pr-2 pb-2">
                      <input
                        type="text"
                        placeholder="0"
                        value={line.debit}
                        onChange={(e) => updateLine(i, "debit", e.target.value)}
                        className="mono w-full rounded-lg border border-[#2a3348] bg-[#1e2535] px-3 py-2 text-right text-sm text-[#2dd4bf] placeholder:text-[#64748b] focus:border-[#2dd4bf]/50 focus:outline-none"
                      />
                    </td>
                    <td className="pr-2 pb-2">
                      <input
                        type="text"
                        placeholder="0"
                        value={line.credit}
                        onChange={(e) => updateLine(i, "credit", e.target.value)}
                        className="mono w-full rounded-lg border border-[#2a3348] bg-[#1e2535] px-3 py-2 text-right text-sm text-[#f87171] placeholder:text-[#64748b] focus:border-[#2dd4bf]/50 focus:outline-none"
                      />
                    </td>
                    <td className="pb-2">
                      {lines.length > 2 && (
                        <button
                          onClick={() => removeLine(i)}
                          className="rounded p-1 text-[#64748b] hover:text-[#f87171] transition-colors"
                        >
                          ✕
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-[#2a3348]">
                  <td className="pt-3 text-xs font-medium text-[#64748b]">합계</td>
                  <td className="mono pt-3 pr-2 text-right text-sm font-semibold text-[#2dd4bf]">
                    {fmt(totalDebit)}
                  </td>
                  <td className="mono pt-3 pr-2 text-right text-sm font-semibold text-[#f87171]">
                    {fmt(totalCredit)}
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Balance indicator */}
          <div
            className={`rounded-lg px-4 py-3 text-sm font-medium ${
              totalDebit === 0
                ? "bg-[#1e2535] text-[#64748b]"
                : balanced
                  ? "bg-[#34d399]/10 text-[#34d399]"
                  : "bg-[#f87171]/10 text-[#f87171]"
            }`}
          >
            {totalDebit === 0
              ? "금액을 입력하세요"
              : balanced
                ? "✓ 대차 균형이 맞습니다"
                : `✗ 차이: ${fmt(Math.abs(totalDebit - totalCredit))}원`}
          </div>

          <div className="flex gap-3">
            <button
              onClick={addLine}
              className="rounded-lg border border-[#2a3348] px-4 py-2 text-sm text-[#64748b] hover:border-[#2dd4bf]/40 hover:text-[#2dd4bf] transition-colors"
            >
              + 행 추가
            </button>
            <button
              onClick={handleSave}
              disabled={!balanced}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
                balanced
                  ? "bg-[#2dd4bf] text-[#0f1117] hover:opacity-90"
                  : "cursor-not-allowed bg-[#2a3348] text-[#64748b]"
              }`}
            >
              {saved ? "✓ 저장됨" : "저장"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
