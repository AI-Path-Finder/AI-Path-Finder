"use client";

const INK = "#2f1c4d";
const VIOLET = "#bba9ff";
const CREAM = "#fff6dc";
const CORAL = "#ff9d86";
const PAPER = "#fffdf8";

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
    <div className={`${compact ? "h-16 w-32" : "h-40 w-full"} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 300 140" className="h-full w-full overflow-visible">
        <FlowLines />
        <Inputs type={opportunityId} />
        <Processor type={opportunityId} />
        <Outputs type={opportunityId} />
      </svg>
    </div>
  );
}

function FlowLines() {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M76 41h18q6 0 6 6v17q0 6 6 6h12" />
      <path d="M76 70h42" />
      <path d="M76 99h18q6 0 6-6V76q0-6 6-6h12" />
      <path d="m113 66 5 4-5 4" />
      <path d="M182 70h18q6 0 6-6V47q0-6 6-6h12" />
      <path d="M182 70h42" />
      <path d="M182 70h18q6 0 6 6v17q0 6 6 6h12" />
      <path d="m219 37 5 4-5 4M219 66l5 4-5 4M219 95l5 4-5 4" />
    </g>
  );
}

function Inputs({ type }: { type: string }) {
  const widths = type === "knowledge-assistant" ? [42, 55, 34] : type === "sales-assistant" ? [28, 43, 52] : [48, 38, 54];
  return (
    <g>
      {widths.map((width, index) => (
        <rect
          key={index}
          x={12 + (index % 2) * 7}
          y={30 + index * 29}
          width={width}
          height="16"
          rx="5"
          fill={index === 1 ? CREAM : PAPER}
          stroke={INK}
          strokeWidth="1.3"
        />
      ))}
      <InputMarks type={type} />
    </g>
  );
}

function InputMarks({ type }: { type: string }) {
  if (type === "customer-support" || type === "it-helpdesk") {
    return <g fill={CORAL}><circle cx="21" cy="38" r="2.5" /><circle cx="28" cy="67" r="2.5" /><circle cx="21" cy="96" r="2.5" /></g>;
  }
  if (type === "document-processing" || type === "invoice-automation" || type === "contract-review") {
    return <g stroke={INK} strokeWidth="1"><path d="M20 35h19M20 40h13M27 64h20M27 69h14M20 93h24M20 98h17" /></g>;
  }
  if (type === "sales-assistant") {
    return <g fill={CORAL}><circle cx="21" cy="38" r="3" /><circle cx="28" cy="67" r="3" /><circle cx="21" cy="96" r="3" /></g>;
  }
  return <g fill={VIOLET}><rect x="20" y="35" width="18" height="6" rx="2" /><rect x="27" y="64" width="22" height="6" rx="2" /><rect x="20" y="93" width="25" height="6" rx="2" /></g>;
}

function Processor({ type }: { type: string }) {
  return (
    <g>
      <rect x="120" y="35" width="60" height="70" rx="16" fill="none" stroke={INK} strokeWidth="1.5" />
      <rect x="126" y="41" width="23" height="25" rx="7" fill={VIOLET} />
      <rect x="151" y="41" width="23" height="25" rx="7" fill={PAPER} stroke={INK} strokeWidth="1" />
      <rect x="126" y="68" width="23" height="25" rx="7" fill={PAPER} stroke={INK} strokeWidth="1" />
      <rect x="151" y="68" width="23" height="25" rx="7" fill={VIOLET} />
      <path d="M137 66v7M149 80h7M163 66v7M149 54h7" fill="none" stroke={INK} strokeWidth="1.1" />
      <ProcessorMark type={type} />
    </g>
  );
}

function ProcessorMark({ type }: { type: string }) {
  if (type === "document-processing") return <path d="M139 49h22M139 55h15M139 61h19" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />;
  if (type === "customer-support") return <path d="M137 51h25v12h-14l-6 5v-5h-5z" fill="none" stroke={INK} strokeWidth="1.4" />;
  if (type === "knowledge-assistant") return <g fill="none" stroke={INK} strokeWidth="1.5"><circle cx="147" cy="55" r="8" /><path d="m153 61 9 8" /></g>;
  if (type === "sales-assistant") return <path d="M137 62h7l5-10 6 7 8-13" fill="none" stroke={INK} strokeWidth="1.6" />;
  if (type === "invoice-automation") return <path d="m138 56 7 7 17-18" fill="none" stroke={INK} strokeWidth="1.8" />;
  if (type === "it-helpdesk") return <g fill="none" stroke={INK} strokeWidth="1.5"><circle cx="150" cy="56" r="10" /><path d="M150 50v12M144 56h12" /></g>;
  if (type === "marketing-content") return <path d="m138 63 7-13 7 8 6-11 6 16z" fill="none" stroke={INK} strokeWidth="1.5" />;
  if (type === "contract-review") return <path d="M142 45v15M142 65v2M153 48h9M153 55h9M153 62h6" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />;
  return <circle cx="150" cy="56" r="9" fill="none" stroke={INK} strokeWidth="1.5" />;
}

function Outputs({ type }: { type: string }) {
  if (type === "customer-support" || type === "it-helpdesk") return <StatusOutputs type={type} />;
  if (type === "document-processing" || type === "invoice-automation") return <GridOutputs type={type} />;
  if (type === "knowledge-assistant") return <KnowledgeOutputs />;
  if (type === "sales-assistant") return <SalesOutputs />;
  if (type === "marketing-content") return <ChannelOutputs />;
  if (type === "contract-review") return <RiskOutputs />;
  return <GridOutputs type={type} />;
}

function GridOutputs({ type }: { type: string }) {
  return (
    <g>
      {[0, 1, 2].map((row) => [0, 1].map((column) => (
        <g key={`${row}-${column}`}>
          <rect x={228 + column * 29} y={31 + row * 29} width="24" height="20" rx="5" fill={(row + column) % 3 === 0 ? CORAL : PAPER} stroke={INK} strokeWidth="1.2" />
          {type === "invoice-automation" && row === 2 && column === 1 && <path d="m264 94 4 4 7-8" fill="none" stroke={INK} strokeWidth="1.4" />}
          {type === "document-processing" && <path d={`M${234 + column * 29} ${38 + row * 29}h12M${234 + column * 29} ${43 + row * 29}h8`} stroke={INK} strokeWidth="1" />}
        </g>
      )))}
    </g>
  );
}

function StatusOutputs({ type }: { type: string }) {
  return (
    <g>
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <rect x="228" y={32 + row * 29} width="58" height="19" rx="5" fill={row === 0 ? VIOLET : PAPER} stroke={INK} strokeWidth="1.2" />
          <circle cx="238" cy={41.5 + row * 29} r="3" fill={row === 2 ? CORAL : INK} />
          <path d={`M246 ${41.5 + row * 29}h${type === "it-helpdesk" ? 27 - row * 4 : 32 - row * 6}`} stroke={INK} strokeWidth="1.3" />
          {row === 0 && <path d={`m272 ${38 + row * 29} 4 4 7-8`} fill="none" stroke={INK} strokeWidth="1.3" />}
        </g>
      ))}
    </g>
  );
}

function KnowledgeOutputs() {
  return <g><rect x="228" y="31" width="58" height="78" rx="7" fill={PAPER} stroke={INK} strokeWidth="1.2" /><path d="M238 45h37M238 55h27M238 72h33M238 82h22M238 96h31" stroke={INK} strokeWidth="1.4" strokeLinecap="round" /><circle cx="275" cy="96" r="5" fill={VIOLET} /></g>;
}

function SalesOutputs() {
  return <g><path d="M228 31h58l-9 22h-40zM238 60h38l-8 20h-22zM247 87h20l-5 20h-10z" fill={PAPER} stroke={INK} strokeWidth="1.2" /><circle cx="279" cy="102" r="7" fill={CORAL} /><path d="m275 102 3 3 5-7" fill="none" stroke={INK} strokeWidth="1.2" /></g>;
}

function ChannelOutputs() {
  return <g>{[[228,32],[259,32],[228,65],[259,65],[228,98],[259,98]].map(([x,y], index) => <rect key={index} x={x} y={y} width="24" height="20" rx="5" fill={index === 1 || index === 4 ? CORAL : PAPER} stroke={INK} strokeWidth="1.2" />)}<path d="M234 43h12M265 43h12M234 76h12M265 76h12M234 109h12M265 109h12" stroke={INK} strokeWidth="1" /></g>;
}

function RiskOutputs() {
  return <g><rect x="228" y="30" width="58" height="80" rx="7" fill={PAPER} stroke={INK} strokeWidth="1.2" /><path d="M238 44h29M238 55h38M238 66h25M238 88h36M238 99h22" stroke={INK} strokeWidth="1.3" strokeLinecap="round" /><rect x="267" y="61" width="12" height="12" rx="3" fill={CORAL} /><path d="M273 64v4M273 70v1" stroke={INK} strokeWidth="1.2" /></g>;
}
