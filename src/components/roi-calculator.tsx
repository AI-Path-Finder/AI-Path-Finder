"use client";

import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Input } from "@/components/ui/input";
import { calculateROI } from "@/lib/roi";
import type { Currency, ROIInputs, ROIScenario } from "@/types/assessment";
import { useLanguage } from "@/context/language-provider";

const CURRENCIES: Currency[] = ["EUR", "GBP", "USD", "CHF"];
const SCENARIOS: ROIScenario[] = ["conservative", "base", "optimistic"];

export function ROICalculator({ inputs, onChange }: { inputs: ROIInputs; onChange: (inputs: Partial<ROIInputs>) => void }) {
  const { t } = useLanguage();
  const results = useMemo(() => calculateROI(inputs), [inputs]);
  const money = (value: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: inputs.currency, maximumFractionDigits: 0 }).format(value);

  return (
    <div className="space-y-10">
      <section className="flex flex-wrap items-center justify-between gap-5 border-y border-border py-5">
        <div className="flex gap-2">
          {SCENARIOS.map((scenario) => (
            <button key={scenario} onClick={() => onChange({ scenario })} className={`rounded-md px-4 py-2 text-sm font-semibold ${inputs.scenario === scenario ? "bg-[#2f1c4d] text-white" : "bg-secondary"}`}>
              {t(scenario)}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm text-muted-foreground">
          {t("currency")}
          <select value={inputs.currency} onChange={(event) => onChange({ currency: event.target.value as Currency })} className="rounded-md border border-border bg-background px-3 py-2 font-semibold text-foreground">
            {CURRENCIES.map((currency) => <option key={currency}>{currency}</option>)}
          </select>
        </label>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-6">{t("editableEstimates")}</p>
          <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
            <InputField label={t("employeeCount")} value={inputs.employeeCount} min={1} max={5000} onChange={(v) => onChange({ employeeCount: v })} />
            <InputField label={t("averageSalary")} value={inputs.averageSalary} min={15000} max={250000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ averageSalary: v })} />
            <InputField label={t("manualHoursWeek")} value={inputs.manualHoursPerWeek} min={1} max={40} suffix={t("hoursShort")} onChange={(v) => onChange({ manualHoursPerWeek: v })} />
            <InputField label={t("expectedAutomation")} value={inputs.automationPercent} min={5} max={95} suffix="%" onChange={(v) => onChange({ automationPercent: v })} />
            <InputField label={t("softwareCost")} value={inputs.softwareCost} min={0} max={1000000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ softwareCost: v })} />
            <InputField label={t("integrationCost")} value={inputs.integrationCost} min={0} max={1000000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ integrationCost: v })} />
            <InputField label={t("trainingCost")} value={inputs.trainingCost} min={0} max={500000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ trainingCost: v })} />
            <InputField label={t("maintenanceCost")} value={inputs.annualMaintenanceCost} min={0} max={500000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ annualMaintenanceCost: v })} />
            <InputField label={t("reviewTime")} value={inputs.reviewPercent} min={0} max={80} suffix="%" onChange={(v) => onChange({ reviewPercent: v })} />
          </div>
        </div>

        <div className="rounded-[30px] bg-[#e8ddff] p-7 md:p-9">
          <p className="eyebrow mb-6">{t("projectedReturn")}</p>
          <div className="grid grid-cols-2 gap-6">
            <Result label={t("annualSavings")} value={money(results.annualSavings)} />
            <Result label={t("totalImplementationCost")} value={money(results.implementationCost)} />
            <Result label={t("paybackPeriod")} value={`${results.paybackMonths}${t("months")}`} />
            <Result label={t("roi12")} value={`${results.roi12Month}%`} />
            <Result label={t("value24")} value={money(results.value24Month)} />
            <Result label={t("effectiveAutomation")} value={`${results.effectiveAutomationPercent}%`} />
          </div>
          <div className="mt-8 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.monthlyData}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={5} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <Tooltip formatter={(value: number) => [money(value), ""]} />
                <Area type="monotone" dataKey="net" stroke="#2f1c4d" fill="rgba(47,28,77,.12)" name={t("netValue")} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-y border-border py-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">{t("mainAssumptions")}</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>{t("assumptionHours")}</li>
            <li>{t("assumptionReview", { review: inputs.reviewPercent })}</li>
            <li>{t("assumptionScenario", { scenario: t(inputs.scenario) })}</li>
            <li>{t("assumptionMaintenance")}</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{t("formulaExplanation")}</h2>
          <ol className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>1. {t("formulaSavings")}</li>
            <li>2. {t("formulaCosts")}</li>
            <li>3. {t("formulaRoi")}</li>
            <li>4. {t("formulaPayback")}</li>
          </ol>
        </div>
      </section>
    </div>
  );
}

function InputField({ label, value, onChange, suffix, min, max, step = 1 }: { label: string; value: number; onChange: (v: number) => void; suffix?: string; min: number; max: number; step?: number }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-muted-foreground">{label}</span>
      <div className="flex items-end gap-2">
        <Input type="number" value={value} min={min} max={max} step={step} onChange={(event) => onChange(Math.min(max, Math.max(min, Number(event.target.value) || 0)))} />
        {suffix && <span className="pb-3 text-xs font-semibold text-muted-foreground">{suffix}</span>}
      </div>
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return <div><p className="mb-1 text-xs text-muted-foreground">{label}</p><p className="text-xl font-semibold tracking-[-0.04em] md:text-2xl">{value}</p></div>;
}
