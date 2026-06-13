"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/glass-card";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { Opportunity } from "@/types/assessment";
import { Clock, Gauge, TrendingUp, Zap } from "lucide-react";

interface OpportunityCardProps {
  opportunity: Opportunity;
  index?: number;
  onClick?: () => void;
}

export function OpportunityCard({
  opportunity,
  index = 0,
  onClick,
}: OpportunityCardProps) {
  const complexityVariant =
    opportunity.implementationComplexity === "Low"
      ? "success"
      : opportunity.implementationComplexity === "Medium"
        ? "warning"
        : "secondary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <GlassCard hover={!!onClick} glow onClick={onClick} className="h-full">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight">
            {opportunity.title}
          </h3>
          <Badge variant={complexityVariant}>
            {opportunity.implementationComplexity}
          </Badge>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          {opportunity.description}
        </p>

        <div className="mb-4 font-mono text-2xl font-bold text-emerald-400">
          {formatCurrency(opportunity.annualSavings)}
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            / yr
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Metric
            icon={Clock}
            label="Deploy time"
            value={opportunity.deploymentTime}
          />
          <Metric
            icon={Gauge}
            label="Confidence"
            value={formatPercent(opportunity.confidenceScore)}
          />
          <Metric
            icon={Zap}
            label="Automation"
            value={formatPercent(opportunity.automationPercent)}
          />
          <Metric
            icon={TrendingUp}
            label="Value score"
            value={`${opportunity.valueScore}/10`}
          />
        </div>
      </GlassCard>
    </motion.div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-3">
      <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
