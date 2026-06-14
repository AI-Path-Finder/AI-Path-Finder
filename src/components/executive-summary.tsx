"use client";

import { motion } from "framer-motion";
import type { Recommendation } from "@/types/assessment";
import { useLanguage } from "@/context/language-provider";

export function ExecutiveSummary({ recommendation }: { recommendation: Recommendation }) {
  const { t, td } = useLanguage();
  const { opportunity, reasons, roiSnapshot } = recommendation;
  const currency = recommendation.currency ?? "EUR";
  const money = (value: number) => new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
  return (
    <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <p className="eyebrow mb-7">{t("executiveRecommendation")}</p>
      <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.06em] md:text-7xl">
        {t("startWith", { title: td(opportunity.title) })}
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {t("recommendationText")}
      </p>

      <dl className="mt-16 grid gap-8 border-y border-border py-10 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label={t("projectedSavings")} value={money(roiSnapshot?.annualSavings ?? opportunity.annualSavings)} />
        <Metric label={t("roi12")} value={roiSnapshot ? `${roiSnapshot.roi12Month}%` : "—"} />
        <Metric label={t("paybackPeriod")} value={roiSnapshot ? (roiSnapshot.breakEvenMonth ? `${roiSnapshot.paybackMonths}${t("months")}` : t("notReached")) : td(opportunity.deploymentTime)} />
        <Metric label={t("recommendationConfidence")} value={`${roiSnapshot?.confidenceScore ?? opportunity.confidenceScore}%`} />
      </dl>

      <section className="grid gap-10 border-b border-border py-14 md:grid-cols-[1fr_2fr]">
        <h2 className="text-2xl font-semibold tracking-[-0.035em]">{t("whyFirst")}</h2>
        <ol className="space-y-7">
          {reasons.map((reason, index) => (
            <li key={reason} className="grid grid-cols-[34px_1fr] gap-4 leading-relaxed">
              <span className="text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
              <span>{td(reason)}</span>
            </li>
          ))}
        </ol>
      </section>
    </motion.article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div><dt className="mb-3 text-xs text-muted-foreground">{label}</dt><dd className="text-3xl font-semibold tracking-[-0.045em]">{value}</dd></div>;
}
