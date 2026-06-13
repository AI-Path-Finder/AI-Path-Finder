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
  const { t } = useLanguage();
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      onClick={onClick}
      className={`mb-4 grid gap-7 rounded-[28px] p-7 md:grid-cols-[70px_1.4fr_1fr] md:p-10 ${
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
      <div>
        <p className="eyebrow mb-3">{t("aiOpportunity")}</p>
        <h2 className="text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-4xl">
          {opportunity.title}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          {opportunity.description}
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm">
        <Metric label={t("annualSavings")} value={formatCurrency(opportunity.annualSavings)} />
        <Metric label={t("complexity")} value={t(opportunity.implementationComplexity.toLowerCase())} />
        <Metric label={t("deployment")} value={opportunity.deploymentTime} />
        <Metric label={t("automation")} value={`${opportunity.automationPercent}%`} />
      </dl>
    </motion.article>
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
