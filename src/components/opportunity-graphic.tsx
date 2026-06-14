"use client";

import { motion } from "framer-motion";

export function OpportunityGraphic({
  opportunityId,
  compact = false,
  className = "",
}: {
  opportunityId: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-white/60 ${compact ? "h-20 w-24" : "h-40 w-full"} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 180 150" className="h-full w-full">
        {graphicFor(opportunityId)}
      </svg>
    </div>
  );
}

function graphicFor(id: string) {
  switch (id) {
    case "document-processing":
      return (
        <>
          {[0, 1, 2].map((item) => <motion.rect key={item} x={18 + item * 8} y={28 + item * 8} width="58" height="76" rx="6" fill="#fffdf8" stroke="#2f1c4d" initial={{ x: -8 }} animate={{ x: 0 }} />)}
          <path d="M46 53h27M46 65h20M46 77h24" stroke="#6b4eff" strokeWidth="4" strokeLinecap="round" />
          <path d="M92 70h22" stroke="#2f1c4d" strokeWidth="3" strokeDasharray="4 4" />
          <path d="m109 64 9 6-9 6" fill="none" stroke="#2f1c4d" strokeWidth="3" />
          <rect x="122" y="34" width="40" height="28" rx="6" fill="#e8ddff" /><rect x="122" y="70" width="40" height="28" rx="6" fill="#ffdd8d" /><rect x="122" y="106" width="40" height="20" rx="6" fill="#ff9d86" />
        </>
      );
    case "customer-support":
      return (
        <>
          <rect x="18" y="28" width="55" height="30" rx="15" fill="#fffdf8" stroke="#2f1c4d" /><rect x="18" y="68" width="68" height="30" rx="15" fill="#fffdf8" stroke="#2f1c4d" /><rect x="18" y="108" width="48" height="24" rx="12" fill="#fffdf8" stroke="#2f1c4d" />
          <path d="M92 78h18M105 72l8 6-8 6" stroke="#2f1c4d" strokeWidth="3" fill="none" />
          <circle cx="138" cy="78" r="27" fill="#6b4eff" /><path d="M126 78c0-8 5-14 12-14s12 6 12 14v9h-8v-9c0-3-2-6-4-6s-4 3-4 6v9h-8z" fill="white" />
        </>
      );
    case "knowledge-assistant":
      return (
        <>
          <circle cx="90" cy="76" r="25" fill="#6b4eff" />
          {[[35,35],[145,35],[34,116],[146,116]].map(([x,y], index) => <g key={index}><line x1="90" y1="76" x2={x} y2={y} stroke="#2f1c4d" strokeWidth="2" strokeDasharray="4 4" /><rect x={x-20} y={y-14} width="40" height="28" rx="5" fill={index % 2 ? "#ffdd8d" : "#fffdf8"} stroke="#2f1c4d" /></g>)}
          <path d="M79 70h22M79 78h16M79 86h19" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </>
      );
    case "sales-assistant":
      return (
        <>
          <path d="M25 28h130l-23 30H48z" fill="#e8ddff" stroke="#2f1c4d" /><path d="M48 64h84l-20 29H68z" fill="#ffdd8d" stroke="#2f1c4d" /><path d="M69 99h42l-10 25H79z" fill="#ff9d86" stroke="#2f1c4d" />
          <circle cx="145" cy="115" r="17" fill="#6b4eff" /><path d="m137 115 6 6 11-13" fill="none" stroke="white" strokeWidth="3" />
        </>
      );
    case "invoice-automation":
      return (
        <>
          <rect x="28" y="24" width="72" height="102" rx="7" fill="#fffdf8" stroke="#2f1c4d" />
          <path d="M45 48h37M45 62h27M45 84h37M45 98h23" stroke="#2f1c4d" strokeWidth="3" strokeLinecap="round" />
          <circle cx="126" cy="81" r="31" fill="#ffdd8d" stroke="#2f1c4d" /><path d="m111 81 10 10 20-23" fill="none" stroke="#2f1c4d" strokeWidth="5" />
        </>
      );
    case "it-helpdesk":
      return (
        <>
          <rect x="20" y="31" width="140" height="82" rx="10" fill="#2f1c4d" /><path d="M37 55h35M37 68h25M37 81h42" stroke="#e8ddff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="125" cy="72" r="25" fill="#6b4eff" /><path d="M115 72h20M125 62v20" stroke="white" strokeWidth="4" />
          <path d="M70 126h40M82 113v13M98 113v13" stroke="#2f1c4d" strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case "marketing-content":
      return (
        <>
          <rect x="24" y="27" width="55" height="80" rx="8" fill="#e8ddff" stroke="#2f1c4d" /><rect x="87" y="42" width="68" height="80" rx="8" fill="#fffdf8" stroke="#2f1c4d" />
          <circle cx="51" cy="52" r="11" fill="#ff9d86" /><path d="m34 91 13-17 10 9 10-14 7 22z" fill="#6b4eff" />
          <path d="M102 64h38M102 78h27M102 92h34" stroke="#2f1c4d" strokeWidth="3" strokeLinecap="round" />
          <path d="m144 24 3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#ff9d86" />
        </>
      );
    case "contract-review":
      return (
        <>
          <rect x="34" y="20" width="82" height="110" rx="7" fill="#fffdf8" stroke="#2f1c4d" />
          <path d="M50 45h48M50 59h40M50 73h48M50 87h32M50 101h45" stroke="#2f1c4d" strokeWidth="3" strokeLinecap="round" />
          <circle cx="121" cy="94" r="26" fill="#ff9d86" stroke="#2f1c4d" /><path d="M121 80v17M121 106v2" stroke="#2f1c4d" strokeWidth="5" strokeLinecap="round" />
        </>
      );
    default:
      return (
        <>
          <circle cx="90" cy="75" r="38" fill="#6b4eff" />
          <path d="M53 75h74M90 38v74" stroke="white" strokeWidth="4" strokeDasharray="7 7" />
          <circle cx="90" cy="75" r="12" fill="#ffdd8d" />
        </>
      );
  }
}
