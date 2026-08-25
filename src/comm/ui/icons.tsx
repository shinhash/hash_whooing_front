export const LedgerIcon = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="2" width="12" height="2" rx="1" />
      <rect x="2" y="6" width="8" height="2" rx="1" />
      <rect x="2" y="10" width="10" height="2" rx="1" />
      <rect x="2" y="14" width="6" height="1.5" rx="0.75" />
    </svg>
  );
}

export const GridIcon = ({ active }: { active: boolean }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={active ? "#2dd4bf" : "#64748b"}>
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

export const ListIcon = ({ active }: { active: boolean }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={active ? "#2dd4bf" : "#64748b"}>
      <rect x="1" y="3" width="14" height="2" rx="1" />
      <rect x="1" y="7" width="14" height="2" rx="1" />
      <rect x="1" y="11" width="10" height="2" rx="1" />
    </svg>
  );
}

export const PenIcon = ({ active }: { active: boolean }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={active ? "#2dd4bf" : "#64748b"} strokeWidth="1.5" strokeLinecap="round">
      <path d="M11 2l3 3-8 8H3v-3l8-8z" />
    </svg>
  );
}

export const BookIcon = ({ active }: { active: boolean }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={active ? "#2dd4bf" : "#64748b"} strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
      <line x1="5" y1="6" x2="9" y2="6" />
      <line x1="5" y1="9" x2="11" y2="9" />
    </svg>
  );
}

export const ChartIcon = ({ active }: { active: boolean }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={active ? "#2dd4bf" : "#64748b"}>
      <rect x="1" y="8" width="3" height="7" rx="0.5" />
      <rect x="6" y="4" width="3" height="11" rx="0.5" />
      <rect x="11" y="1" width="3" height="14" rx="0.5" />
    </svg>
  );
}

export const MenuIcon = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="2" y1="4.5" x2="16" y2="4.5" />
      <line x1="2" y1="9" x2="16" y2="9" />
      <line x1="2" y1="13.5" x2="16" y2="13.5" />
    </svg>
  );
}

export const EyeIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <ellipse cx="8" cy="8" rx="6" ry="4" />
      <circle cx="8" cy="8" r="1.5" />
    </svg>
  );
}

export const EyeOffIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="2" y1="2" x2="14" y2="14" />
      <path d="M6.5 6.6A2 2 0 0 0 9.4 9.5" />
      <path d="M4 4.8C2.8 5.7 2 7 2 8c0 2 2.7 4 6 4a8 8 0 0 0 3-.6" />
      <path d="M12.5 11.3C13.5 10.4 14 9.2 14 8c0-2-2.7-4-6-4a8 8 0 0 0-1.5.15" />
    </svg>
  );
}