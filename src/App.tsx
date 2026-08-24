import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import Journal from "./pages/Journal";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

type AuthScreen = "login" | "signup" | "app";

type Page = "dashboard" | "transactions" | "journal" | "accounts" | "reports";

const NAV = [
  { id: "dashboard" as Page, label: "대시보드", icon: GridIcon },
  { id: "transactions" as Page, label: "거래내역", icon: ListIcon },
  { id: "journal" as Page, label: "분개 입력", icon: PenIcon },
  { id: "accounts" as Page, label: "계정과목", icon: BookIcon },
  { id: "reports" as Page, label: "보고서", icon: ChartIcon },
];

export default function App() {
  const [auth, setAuth] = useState<AuthScreen>("login");
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (auth === "login") {
    return <Login onLogin={() => setAuth("app")} onGoSignup={() => setAuth("signup")} />;
  }
  if (auth === "signup") {
    return <Signup onSignup={() => setAuth("app")} onGoLogin={() => setAuth("login")} />;
  }

  const PageComponent = {
    dashboard: Dashboard,
    transactions: Transactions,
    journal: Journal,
    accounts: Accounts,
    reports: Reports,
  }[page];

  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-[#0f1117]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-[#2a3348] bg-[#161b27] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-2.5 border-b border-[#2a3348] px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#2dd4bf] text-[#0f1117]">
            <LedgerIcon />
          </div>
          <span className="text-sm font-semibold tracking-wide text-[#e2e8f0]">
            후잉 부기
          </span>
        </div>

        {/* Account selector */}
        <div className="mx-3 mt-4 rounded-lg border border-[#2a3348] bg-[#1e2535] px-3 py-2.5">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#64748b]">
            가계부
          </p>
          <p className="mt-0.5 text-sm font-medium text-[#e2e8f0]">
            홍길동 가계
          </p>
          <p className="text-[11px] text-[#64748b]">2026년 8월</p>
        </div>

        {/* Nav */}
        <nav className="mt-4 flex-1 space-y-0.5 px-2">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setPage(id);
                setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                page === id
                  ? "bg-[#2dd4bf]/10 text-[#2dd4bf]"
                  : "text-[#94a3b8] hover:bg-[#1e2535] hover:text-[#e2e8f0]"
              }`}
            >
              <Icon active={page === id} />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom user */}
        <div className="flex items-center gap-3 border-t border-[#2a3348] px-4 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2a3348] text-xs font-semibold text-[#2dd4bf]">
            홍
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-[#e2e8f0]">홍길동</p>
            <p className="truncate text-[10px] text-[#64748b]">hong@example.com</p>
          </div>
          <button
            onClick={() => setAuth("login")}
            title="로그아웃"
            className="shrink-0 rounded p-1 text-[#64748b] hover:text-[#f87171] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3" />
              <polyline points="10,5 14,8 10,11" />
              <line x1="14" y1="8" x2="6" y2="8" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#2a3348] bg-[#161b27] px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded p-1.5 text-[#64748b] hover:bg-[#1e2535] hover:text-[#e2e8f0] lg:hidden"
          >
            <MenuIcon />
          </button>
          <h1 className="text-sm font-semibold text-[#e2e8f0]">
            {NAV.find((n) => n.id === page)?.label}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-[11px] text-[#64748b] sm:block">
              2026년 8월 24일 일요일
            </span>
            <button className="rounded-lg bg-[#2dd4bf] px-3 py-1.5 text-xs font-semibold text-[#0f1117] transition-opacity hover:opacity-90">
              + 거래 추가
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <PageComponent />
        </main>
      </div>
    </div>
  );
}

/* ── Icon components ── */
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
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={active ? "#2dd4bf" : "#64748b"}>
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}
function ListIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={active ? "#2dd4bf" : "#64748b"}>
      <rect x="1" y="3" width="14" height="2" rx="1" />
      <rect x="1" y="7" width="14" height="2" rx="1" />
      <rect x="1" y="11" width="10" height="2" rx="1" />
    </svg>
  );
}
function PenIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={active ? "#2dd4bf" : "#64748b"} strokeWidth="1.5" strokeLinecap="round">
      <path d="M11 2l3 3-8 8H3v-3l8-8z" />
    </svg>
  );
}
function BookIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={active ? "#2dd4bf" : "#64748b"} strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
      <line x1="5" y1="6" x2="9" y2="6" />
      <line x1="5" y1="9" x2="11" y2="9" />
    </svg>
  );
}
function ChartIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={active ? "#2dd4bf" : "#64748b"}>
      <rect x="1" y="8" width="3" height="7" rx="0.5" />
      <rect x="6" y="4" width="3" height="11" rx="0.5" />
      <rect x="11" y="1" width="3" height="14" rx="0.5" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="2" y1="4.5" x2="16" y2="4.5" />
      <line x1="2" y1="9" x2="16" y2="9" />
      <line x1="2" y1="13.5" x2="16" y2="13.5" />
    </svg>
  );
}
