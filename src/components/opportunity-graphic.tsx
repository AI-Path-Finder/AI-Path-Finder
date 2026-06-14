"use client";

const INK = "#8778a3";
const LAVENDER = "#cbbdff";
const PEACH = "#f0a28d";
const CREAM = "#f3e8cc";
const PAPER = "#f6f0ff";

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
    <div className={`${compact ? "h-16 w-20" : "h-40 w-full"} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 160 160" className="h-full w-full overflow-visible opacity-95">
        {iconFor(opportunityId)}
      </svg>
    </div>
  );
}

function iconFor(id: string) {
  switch (id) {
    case "customer-support":
      return <SupportAutomationIcon />;
    case "knowledge-assistant":
      return <KnowledgeIcon />;
    case "document-processing":
      return <DocumentProcessingIcon />;
    case "meeting-summarization":
      return <MeetingSummaryIcon />;
    case "sales-assistant":
      return <SalesQualificationIcon />;
    case "invoice-automation":
      return <InvoiceAutomationIcon />;
    case "it-helpdesk":
      return <HelpdeskAutomationIcon />;
    case "marketing-content":
      return <ContentOperationsIcon />;
    case "contract-review":
      return <ContractReviewIcon />;
    default:
      return <CoreAutomationIcon />;
  }
}

function SupportAutomationIcon() {
  return (
    <g fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
      <path d="M39 83V70a41 41 0 0 1 82 0v13" strokeWidth="7" />
      <rect x="29" y="76" width="24" height="42" rx="12" fill={LAVENDER} strokeWidth="4" />
      <rect x="107" y="76" width="24" height="42" rx="12" fill={LAVENDER} strokeWidth="4" />
      <path d="M119 118c0 11-9 17-20 17H87" strokeWidth="5" />
      <rect x="70" y="127" width="22" height="13" rx="6.5" fill={PEACH} strokeWidth="3.5" />
      <path d="M71 51h18M80 42v18" strokeWidth="3.5" />
      <circle cx="80" cy="51" r="16" fill={PAPER} strokeWidth="3.5" />
      <path d="M73 51h14M80 44v14" strokeWidth="3" />
    </g>
  );
}

function KnowledgeIcon() {
  return (
    <g stroke={INK} strokeLinecap="round" strokeLinejoin="round">
      <path d="M80 28c-15-9-33 2-31 19-15 4-18 25-5 34-8 15 4 32 20 29 4 15 24 17 32 5V45c-1-12-7-19-16-17z" fill={LAVENDER} strokeWidth="4" />
      <path d="M80 28c15-9 33 2 31 19 15 4 18 25 5 34 8 15-4 32-20 29-4 15-24 17-32 5" fill={PAPER} strokeWidth="4" />
      <path d="M80 38v72M61 51c10 0 19 8 19 18M99 51c-10 0-19 8-19 18M56 84c13 0 24 9 24 21M104 84c-13 0-24 9-24 21" fill="none" strokeWidth="3" />
      <circle cx="80" cy="68" r="7" fill={PEACH} strokeWidth="3" />
      <path d="M67 132h26M72 141h16" fill="none" strokeWidth="4" />
    </g>
  );
}

function DocumentProcessingIcon() {
  return (
    <g stroke={INK} strokeLinecap="round" strokeLinejoin="round">
      <path d="M45 23h48l24 24v85c0 6-4 10-10 10H45c-6 0-10-4-10-10V33c0-6 4-10 10-10z" fill={PAPER} strokeWidth="4" />
      <path d="M93 23v24h24" fill={CREAM} strokeWidth="4" />
      <path d="M52 69h45M52 84h35M52 99h45M52 114h27" fill="none" strokeWidth="4" />
      <rect x="91" y="92" width="42" height="42" rx="13" fill={LAVENDER} strokeWidth="4" />
      <path d="M103 113h18M112 104v18" fill="none" strokeWidth="3.5" />
      <circle cx="112" cy="113" r="12" fill="none" strokeWidth="3" />
    </g>
  );
}

function MeetingSummaryIcon() {
  return (
    <g stroke={INK} strokeLinecap="round" strokeLinejoin="round">
      <path d="M25 38h72c7 0 12 5 12 12v34c0 7-5 12-12 12H59l-22 17v-17H25c-7 0-12-5-12-12V50c0-7 5-12 12-12z" fill={LAVENDER} strokeWidth="4" />
      <path d="M42 58h39M42 70h28" fill="none" strokeWidth="4" />
      <rect x="82" y="76" width="65" height="62" rx="12" fill={PAPER} strokeWidth="4" />
      <path d="M98 96h33M98 108h25M98 120h29" fill="none" strokeWidth="4" />
      <path d="m121 54 6 9 11 2-8 8 2 11-11-5-10 5 2-11-8-8 11-2z" fill={PEACH} strokeWidth="3" />
    </g>
  );
}

function SalesQualificationIcon() {
  return (
    <g stroke={INK} strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 29h112l-35 43v45l-42 18V72z" fill={CREAM} strokeWidth="4" />
      <path d="M59 72h42" fill="none" strokeWidth="4" />
      <circle cx="55" cy="48" r="7" fill={LAVENDER} strokeWidth="3" />
      <circle cx="80" cy="48" r="7" fill={PEACH} strokeWidth="3" />
      <circle cx="105" cy="48" r="7" fill={PAPER} strokeWidth="3" />
      <circle cx="80" cy="103" r="17" fill={LAVENDER} strokeWidth="4" />
      <path d="m72 103 6 6 11-14" fill="none" strokeWidth="4" />
    </g>
  );
}

function InvoiceAutomationIcon() {
  return (
    <g stroke={INK} strokeLinecap="round" strokeLinejoin="round">
      <path d="M42 25h76v110l-10-7-10 7-10-7-10 7-10-7-10 7-16-10z" fill={PAPER} strokeWidth="4" />
      <path d="M58 50h44M58 65h25M58 91h44M58 106h23" fill="none" strokeWidth="4" />
      <circle cx="111" cy="103" r="28" fill={PEACH} strokeWidth="4" />
      <path d="m98 103 9 9 18-23" fill="none" strokeWidth="5" />
      <path d="M72 39c0-6 16-6 16 0s-16 6-16 12 16 6 16 0M80 30v30" fill="none" strokeWidth="3" />
    </g>
  );
}

function HelpdeskAutomationIcon() {
  return (
    <g stroke={INK} strokeLinecap="round" strokeLinejoin="round">
      <rect x="24" y="31" width="112" height="78" rx="13" fill={PAPER} strokeWidth="4" />
      <path d="M24 52h112M45 121h70M61 109v12M99 109v12" fill="none" strokeWidth="4" />
      <circle cx="39" cy="42" r="3" fill={PEACH} stroke="none" />
      <circle cx="49" cy="42" r="3" fill={LAVENDER} stroke="none" />
      <path d="M48 71h38M48 83h25" fill="none" strokeWidth="4" />
      <circle cx="108" cy="81" r="22" fill={LAVENDER} strokeWidth="4" />
      <path d="M108 69v24M96 81h24" fill="none" strokeWidth="4" />
    </g>
  );
}

function ContentOperationsIcon() {
  return (
    <g stroke={INK} strokeLinecap="round" strokeLinejoin="round">
      <rect x="27" y="29" width="106" height="102" rx="15" fill={PAPER} strokeWidth="4" />
      <rect x="42" y="44" width="76" height="43" rx="9" fill={LAVENDER} strokeWidth="3.5" />
      <circle cx="61" cy="61" r="7" fill={PEACH} strokeWidth="3" />
      <path d="m48 80 17-16 12 11 12-15 22 20M44 103h52M44 116h37" fill="none" strokeWidth="4" />
      <path d="m117 94 4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill={PEACH} strokeWidth="3" />
    </g>
  );
}

function ContractReviewIcon() {
  return (
    <g stroke={INK} strokeLinecap="round" strokeLinejoin="round">
      <path d="M43 23h74v114H43z" fill={PAPER} strokeWidth="4" />
      <path d="M57 48h46M57 63h34M57 78h46M57 93h28M57 108h43" fill="none" strokeWidth="4" />
      <circle cx="110" cy="105" r="27" fill={CREAM} strokeWidth="4" />
      <path d="M110 89v20M110 119v1" fill="none" strokeWidth="5" />
      <path d="m97 31 5 8 9 2-7 6 2 9-9-4-8 4 2-9-7-6 9-2z" fill={LAVENDER} strokeWidth="3" />
    </g>
  );
}

function CoreAutomationIcon() {
  return (
    <g stroke={INK} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="80" cy="80" r="47" fill={LAVENDER} strokeWidth="4" />
      <circle cx="80" cy="80" r="20" fill={PAPER} strokeWidth="4" />
      <path d="M80 21v18M80 121v18M21 80h18M121 80h18M38 38l13 13M109 109l13 13M122 38l-13 13M51 109l-13 13" fill="none" strokeWidth="5" />
      <circle cx="80" cy="80" r="7" fill={PEACH} strokeWidth="3" />
    </g>
  );
}
