"use client";

import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import type { Opportunity } from "@/types/assessment";

export function OpportunityCard({
  opportunity,
  index = 0,
  onClick,
}: {
  opportunity: Opportunity;
  index?: number;
  onClick?: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      onClick={onClick}
      className="grid gap-7 border-t border-border py-10 md:grid-cols-[70px_1.4fr_1fr] md:py-14"
    >
      <span className="text-sm text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <p className="eyebrow mb-3">AI opportunity</p>
        <h2 className="text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-4xl">
          {opportunity.title}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          {opportunity.description}
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm">
        <Metric label="Annual savings" value={formatCurrency(opportunity.annualSavings)} />
        <Metric label="Complexity" value={opportunity.implementationComplexity} />
        <Metric label="Deployment" value={opportunity.deploymentTime} />
        <Metric label="Automation" value={`${opportunity.automationPercent}%`} />
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
