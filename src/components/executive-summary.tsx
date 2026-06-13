"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import { GradientText } from "@/components/gradient-text";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { Recommendation } from "@/types/assessment";

interface ExecutiveSummaryProps {
  recommendation: Recommendation;
}

export function ExecutiveSummary({ recommendation }: ExecutiveSummaryProps) {
  const { opportunity, reasons } = recommendation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard glow className="relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/30">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Executive Summary</p>
              <Badge variant="success">Recommended first initiative</Badge>
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
            We recommend implementing{" "}
            <GradientText as="span">{opportunity.title}</GradientText> first.
          </h2>

          <p className="mb-8 max-w-2xl text-muted-foreground leading-relaxed">
            Based on your organizational profile, this initiative delivers the
            optimal balance of business impact, implementation feasibility, and
            risk profile.
          </p>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Metric label="Projected savings" value={formatCurrency(opportunity.annualSavings)} />
            <Metric label="Deploy timeline" value={opportunity.deploymentTime} />
            <Metric label="Confidence" value={`${opportunity.confidenceScore}%`} />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Why this initiative
            </h3>
            <ul className="space-y-3">
              {reasons.map((reason, i) => (
                <motion.li
                  key={reason}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{reason}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-4">
      <p className="mb-1 text-xs text-muted-foreground">{label}</p>
      <p className="font-mono text-lg font-semibold">{value}</p>
    </div>
  );
}
