"use client";

import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import type { Opportunity } from "@/types/assessment";
import { useLanguage } from "@/context/language-provider";

export function OpportunityCard({
  opportunity,
  index = 0,
  onClick,
}: {
  opportunity: Opportunity;
  index?: number;
  onClick?: () => void;
}) {
  const { t, td } = useLanguage();
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      onClick={onClick}
      className={`mb-4 grid gap-7 rounded-[28px] p-7 md:grid-cols-[54px_160px_1.25fr_1fr] md:p-9 ${
        index % 3 === 0
          ? "bg-[#f0edff]"
          : index % 3 === 1
            ? "bg-[#fff0cb]"
            : "bg-[#ffe0d8]"
      }`}
    >
      <span className="text-sm text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>
      <OpportunityGraphic opportunity={opportunity} />
      <div>
        <p className="eyebrow mb-3">{t("aiOpportunity")}</p>
        <h2 className="text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-4xl">
          {td(opportunity.title)}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          {td(opportunity.description)}
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm">
        <Metric label={t("annualSavings")} value={formatCurrency(opportunity.annualSavings)} />
        <Metric label={t("complexity")} value={t(opportunity.implementationComplexity.toLowerCase())} />
        <Metric label={t("deployment")} value={td(opportunity.deploymentTime)} />
        <Metric label={t("automation")} value={`${opportunity.automationPercent}%`} />
      </dl>
    </motion.article>
  );
}

function OpportunityGraphic({ opportunity }: { opportunity: Opportunity }) {
  const bars = [
    { value: opportunity.automationPercent, color: "bg-[#6b4eff]" },
    { value: opportunity.confidenceScore, color: "bg-[#ff8a6c]" },
    { value: opportunity.dataAvailability, color: "bg-[#2f1c4d]" },
  ];
  return (
    <div className="flex h-36 items-end gap-2 rounded-2xl bg-white/55 p-4" aria-hidden="true">
      {bars.map((bar, index) => (
        <div key={index} className="flex h-full flex-1 items-end rounded-full bg-white/80 p-1">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${bar.value}%` }}
            className={`w-full rounded-full ${bar.color}`}
          />
        </div>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mb-1 text-xs text-muted-foreground">{label}</dt>
      <dd className="text-base font-semibold">{value}</dd>
    </div>
  );
}
