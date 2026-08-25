type Props = {
  size?: number;
  label?: string;
};

export default function Loader({ size = 80, label = "불러오는 중..." }: Props) {
  return (
    <div className="flex flex-col items-center gap-5 justify-center items-center h-screen">
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer rotating ring */}
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="#2a3348"
          strokeWidth="2"
        />
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="#2dd4bf"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="56 170"
          strokeDashoffset="0"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Inner pulse ring */}
        <circle cx="40" cy="40" r="26" stroke="#2dd4bf" strokeWidth="1" opacity="0">
          <animate attributeName="r" values="20;28;20" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="1.8s" repeatCount="indefinite" />
        </circle>

        {/* Ledger icon — center */}
        <g transform="translate(28, 26)">
          {/* Ledger lines animating in sequence */}
          <rect x="0" y="0" width="24" height="4" rx="2" fill="#2dd4bf" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.7;1" dur="2s" repeatCount="indefinite" begin="0s" />
          </rect>
          <rect x="0" y="8" width="16" height="4" rx="2" fill="#2dd4bf" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.7;1" dur="2s" repeatCount="indefinite" begin="0.25s" />
          </rect>
          <rect x="0" y="16" width="20" height="4" rx="2" fill="#2dd4bf" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.7;1" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </rect>
          <rect x="0" y="24" width="12" height="3" rx="1.5" fill="#2dd4bf" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.7;1" dur="2s" repeatCount="indefinite" begin="0.75s" />
          </rect>
        </g>

        {/* Orbiting dot */}
        <circle cx="40" cy="4" r="3" fill="#2dd4bf">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {label && (
        <p className="text-xs text-[#64748b] tracking-wide">{label}</p>
      )}
    </div>
  );
}

/* Full-screen loading overlay */
export function LoaderScreen({ label }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f1117]">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#2dd4bf] text-[#0f1117]">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <rect x="2" y="2" width="12" height="2" rx="1" />
            <rect x="2" y="6" width="8" height="2" rx="1" />
            <rect x="2" y="10" width="10" height="2" rx="1" />
            <rect x="2" y="14" width="6" height="1.5" rx="0.75" />
          </svg>
        </div>
        <span className="text-sm font-semibold tracking-wide text-[#e2e8f0]">후잉 부기</span>
      </div>

      <Loader size={88} label={label ?? "잠시만 기다려 주세요..."} />

      {/* Animated ledger entries at the bottom */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
