"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Input } from "@/components/ui/input";
import { calculateROI, calculateROIScenarios } from "@/lib/roi";
import type { Currency, ROIInputs, ROIScenario } from "@/types/assessment";
import { useLanguage } from "@/context/language-provider";

const CURRENCIES: Currency[] = ["EUR", "GBP", "USD", "CHF"];
const SCENARIOS: ROIScenario[] = ["conservative", "base", "optimistic"];

export function ROICalculator({ inputs, onChange }: { inputs: ROIInputs; onChange: (inputs: Partial<ROIInputs>) => void }) {
  const { t } = useLanguage();
  const scenarios = useMemo(() => calculateROIScenarios(inputs), [inputs]);
  const results = useMemo(() => calculateROI(inputs), [inputs]);
  const money = (value: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: inputs.currency, maximumFractionDigits: 0 }).format(value);
  const scenarioData = scenarios.map((scenario) => ({
    name: scenario.scenario === "base" ? t("expectedScenario") : t(scenario.scenario),
    roi: scenario.roi12Month,
    savings: scenario.annualSavings,
  }));
  const costData = [
    { name: t("beforeAi"), cost: results.costBeforeAI },
    { name: t("afterAi"), cost: results.costAfterAI },
  ];

  return (
    <div className="space-y-12">
      <section className="flex flex-wrap items-center justify-between gap-5 border-y border-border py-5">
        <div>
          <p className="text-sm font-semibold">{t("decisionScenario")}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t("scenarioHelp")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((scenario) => (
            <button key={scenario} onClick={() => onChange({ scenario })} className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${inputs.scenario === scenario ? "bg-[#2f1c4d] text-white" : "bg-secondary hover:bg-secondary/70"}`}>
              {scenario === "base" ? t("expectedScenario") : t(scenario)}
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

      <section className="rounded-[34px] bg-[#2f1c4d] p-7 text-white md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="eyebrow text-white/55">{t("investmentDecision")}</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.055em] md:text-6xl">
              {results.roi12Month >= 0 ? t("financiallyViable") : t("reviewBusinessCase")}
            </h2>
          </div>
          <div className="min-w-40 border-l border-white/20 pl-5">
            <p className="text-xs text-white/55">{t("confidenceScore")}</p>
            <p className="mt-2 text-5xl font-semibold tracking-[-0.06em]">{results.confidenceScore}%</p>
            <p className="mt-2 text-xs text-white/55">{confidenceLabel(results.confidenceScore, t)}</p>
          </div>
        </div>
        <div className="mt-12 grid gap-7 border-t border-white/20 pt-8 sm:grid-cols-2 xl:grid-cols-4">
          <Result label={t("annualSavings")} value={money(results.annualSavings)} inverted />
          <Result label={t("totalInvestmentRequired")} value={money(results.implementationCost)} inverted />
          <Result label={t("paybackPeriod")} value={results.breakEvenMonth ? `${results.paybackMonths}${t("months")}` : t("notReached")} inverted />
          <Result label={t("roi12")} value={`${results.roi12Month}%`} inverted />
          <Result label={t("netSavingsFirstYear")} value={money(results.netFirstYearSavings)} inverted />
          <Result label={t("breakEvenDate")} value={results.breakEvenMonth ? t("monthNumber", { month: results.breakEvenMonth }) : t("notReached")} inverted />
          <Result label={t("efficiencyGain")} value={`${results.operationalEfficiencyGain}%`} inverted />
          <Result label={t("costReduction")} value={`${results.costReductionPercent}%`} inverted />
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="eyebrow mb-3">{t("scenarioComparison")}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.045em] md:text-5xl">{t("threePossibleOutcomes")}</h2>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {scenarios.map((scenario) => {
            const active = scenario.scenario === inputs.scenario;
            return (
              <button key={scenario.scenario} type="button" onClick={() => onChange({ scenario: scenario.scenario })} className={`border-t-2 px-5 py-6 text-left transition-colors ${active ? "border-[#6b4eff] bg-[#f0edff]" : "border-border hover:bg-secondary/50"}`}>
                <span className="text-sm font-semibold">{scenario.scenario === "base" ? t("expectedScenario") : t(scenario.scenario)}</span>
                <span className="mt-8 block text-5xl font-semibold tracking-[-0.06em]">{scenario.roi12Month}%</span>
                <span className="mt-2 block text-xs text-muted-foreground">{t("roi12")}</span>
                <span className="mt-6 block border-t border-foreground/10 pt-4 text-sm text-muted-foreground">
                  {money(scenario.annualSavings)} {t("annualSavings").toLowerCase()} · {scenario.breakEvenMonth ? `${scenario.paybackMonths}${t("months")}` : t("notReached")}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-8">
          <p className="eyebrow mb-3">{t("editableEstimates")}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.045em] md:text-5xl">{t("businessCaseAssumptions")}</h2>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          <InputGroup title={t("currentOperationalCosts")} description={t("currentOperationalCostsHelp")}>
            <InputField label={t("employeeCount")} value={inputs.employeeCount} min={1} max={5000} onChange={(v) => onChange({ employeeCount: v })} />
            <InputField label={t("averageSalary")} value={inputs.averageSalary} min={15000} max={250000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ averageSalary: v })} />
            <InputField label={t("manualHoursDay")} value={inputs.manualHoursPerDay} min={0.25} max={8} step={0.25} suffix={t("hoursShort")} onChange={(v) => onChange({ manualHoursPerDay: v })} slider />
            <InputField label={t("tasksPerMonth")} value={inputs.tasksPerMonth} min={1} max={1000000} step={100} onChange={(v) => onChange({ tasksPerMonth: v })} />
            <InputField label={t("currentOperationalCost")} value={inputs.currentOperationalCost} min={0} max={10000000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ currentOperationalCost: v })} />
          </InputGroup>

          <InputGroup title={t("aiImplementationCosts")} description={t("aiImplementationCostsHelp")}>
            <InputField label={t("developmentCost")} value={inputs.developmentCost} min={0} max={3000000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ developmentCost: v })} />
            <InputField label={t("consultingCost")} value={inputs.consultingCost} min={0} max={2000000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ consultingCost: v })} />
            <InputField label={t("infrastructureCost")} value={inputs.infrastructureCost} min={0} max={2000000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ infrastructureCost: v })} />
            <InputField label={t("softwareCost")} value={inputs.softwareCost} min={0} max={2000000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ softwareCost: v })} />
            <InputField label={t("integrationCost")} value={inputs.integrationCost} min={0} max={2000000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ integrationCost: v })} />
            <InputField label={t("trainingCost")} value={inputs.trainingCost} min={0} max={1000000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ trainingCost: v })} />
          </InputGroup>

          <InputGroup title={t("efficiencyAssumptions")} description={t("efficiencyAssumptionsHelp")}>
            <InputField label={t("expectedAutomation")} value={inputs.automationPercent} min={5} max={95} suffix="%" onChange={(v) => onChange({ automationPercent: v })} slider />
            <InputField label={t("productivityIncrease")} value={inputs.productivityIncreasePercent} min={0} max={100} suffix="%" onChange={(v) => onChange({ productivityIncreasePercent: v })} slider />
            <InputField label={t("manualWorkReduction")} value={inputs.manualWorkReductionPercent} min={0} max={100} suffix="%" onChange={(v) => onChange({ manualWorkReductionPercent: v })} slider />
            <InputField label={t("errorReduction")} value={inputs.errorReductionPercent} min={0} max={100} suffix="%" onChange={(v) => onChange({ errorReductionPercent: v })} slider />
            <InputField label={t("processAcceleration")} value={inputs.processAccelerationPercent} min={0} max={100} suffix="%" onChange={(v) => onChange({ processAccelerationPercent: v })} slider />
            <InputField label={t("reviewTime")} value={inputs.reviewPercent} min={0} max={80} suffix="%" onChange={(v) => onChange({ reviewPercent: v })} slider />
          </InputGroup>

          <InputGroup title={t("ongoingCosts")} description={t("ongoingCostsHelp")}>
            <InputField label={t("monthlyApiCost")} value={inputs.monthlyApiCost} min={0} max={500000} step={100} suffix={inputs.currency} onChange={(v) => onChange({ monthlyApiCost: v })} />
            <InputField label={t("monthlyLicensingCost")} value={inputs.monthlyLicensingCost} min={0} max={500000} step={100} suffix={inputs.currency} onChange={(v) => onChange({ monthlyLicensingCost: v })} />
            <InputField label={t("monthlyMaintenanceCost")} value={inputs.monthlyMaintenanceCost} min={0} max={500000} step={100} suffix={inputs.currency} onChange={(v) => onChange({ monthlyMaintenanceCost: v })} />
            <InputField label={t("monitoringCost")} value={inputs.monthlyMonitoringCost} min={0} max={500000} step={100} suffix={inputs.currency} onChange={(v) => onChange({ monthlyMonitoringCost: v })} />
            <InputField label={t("modelRetrainingCost")} value={inputs.annualRetrainingCost} min={0} max={1000000} step={1000} suffix={inputs.currency} onChange={(v) => onChange({ annualRetrainingCost: v })} />
            <InputField label={t("supportCost")} value={inputs.monthlySupportCost} min={0} max={500000} step={100} suffix={inputs.currency} onChange={(v) => onChange({ monthlySupportCost: v })} />
            <InputField label={t("operationalMaintenance")} value={inputs.monthlyOperationalMaintenanceCost} min={0} max={500000} step={100} suffix={inputs.currency} onChange={(v) => onChange({ monthlyOperationalMaintenanceCost: v })} />
          </InputGroup>

          <InputGroup title={t("implementationConfidence")} description={t("implementationConfidenceHelp")} wide>
            <InputField label={t("dataQuality")} value={inputs.dataQuality} min={0} max={100} suffix="%" onChange={(v) => onChange({ dataQuality: v })} slider />
            <InputField label={t("processMaturity")} value={inputs.processMaturity} min={0} max={100} suffix="%" onChange={(v) => onChange({ processMaturity: v })} slider />
            <InputField label={t("adoptionReadiness")} value={inputs.adoptionReadiness} min={0} max={100} suffix="%" onChange={(v) => onChange({ adoptionReadiness: v })} slider />
            <InputField label={t("infrastructureReadiness")} value={inputs.infrastructureReadiness} min={0} max={100} suffix="%" onChange={(v) => onChange({ infrastructureReadiness: v })} slider />
          </InputGroup>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <ChartPanel title={t("investmentRecoveryTimeline")} description={t("investmentRecoveryTimelineHelp")}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={results.monthlyData}>
              <CartesianGrid vertical={false} stroke="rgba(29,26,23,.08)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
              <Tooltip formatter={(value: number) => [money(value), ""]} />
              <ReferenceLine y={0} stroke="rgba(29,26,23,.35)" />
              <Area type="monotone" dataKey="net" stroke="#2f1c4d" fill="rgba(107,78,255,.16)" name={t("netValue")} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title={t("scenarioComparison")} description={t("scenarioComparisonHelp")}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scenarioData}>
              <CartesianGrid vertical={false} stroke="rgba(29,26,23,.08)" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value: number, name: string) => [name === "roi" ? `${value}%` : money(value), name]} />
              <Bar dataKey="roi" fill="#6b4eff" name={t("roi12")} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
        <ChartPanel title={t("costBeforeAfter")} description={t("costBeforeAfterHelp")}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costData}>
              <CartesianGrid vertical={false} stroke="rgba(29,26,23,.08)" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
              <Tooltip formatter={(value: number) => [money(value), t("annualCost")]} />
              <Bar dataKey="cost" fill="#ff9d86" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
        <div className="rounded-[30px] bg-[#ffdd8d] p-7 md:p-9">
          <p className="eyebrow">{t("financialBreakdown")}</p>
          <dl className="mt-8 divide-y divide-foreground/15">
            <Breakdown label={t("baselineAnnualCost")} value={money(results.baselineAnnualCost)} />
            <Breakdown label={t("annualGrossBenefit")} value={money(results.annualGrossBenefit)} />
            <Breakdown label={t("annualRecurringCost")} value={money(results.annualRecurringCost)} />
            <Breakdown label={t("totalInvestmentRequired")} value={money(results.implementationCost)} />
            <Breakdown label={t("value24")} value={money(results.value24Month)} strong />
          </dl>
        </div>
      </section>

      <section className="grid gap-8 border-y border-border py-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">{t("mainAssumptions")}</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>{t("assumptionHoursDay")}</li>
            <li>{t("assumptionReview", { review: inputs.reviewPercent })}</li>
            <li>{t("assumptionScenario", { scenario: inputs.scenario === "base" ? t("expectedScenario") : t(inputs.scenario) })}</li>
            <li>{t("assumptionRecurring")}</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{t("formulaExplanation")}</h2>
          <ol className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>1. {t("formulaBaseline")}</li>
            <li>2. {t("formulaBenefits")}</li>
            <li>3. {t("formulaCostsExpanded")}</li>
            <li>4. {t("formulaRoiExpanded")}</li>
          </ol>
        </div>
      </section>
    </div>
  );
}

function InputGroup({ title, description, wide, children }: { title: string; description: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <section className={`rounded-[28px] bg-secondary/55 p-6 md:p-8 ${wide ? "xl:col-span-2" : ""}`}>
      <h3 className="text-2xl font-semibold tracking-[-0.035em]">{title}</h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function InputField({ label, value, onChange, suffix, min, max, step = 1, slider = false }: { label: string; value: number; onChange: (value: number) => void; suffix?: string; min: number; max: number; step?: number; slider?: boolean }) {
  const update = (raw: number) => onChange(Math.min(max, Math.max(min, raw || 0)));
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex items-end gap-2">
        <Input type="number" value={value} min={min} max={max} step={step} onChange={(event) => update(Number(event.target.value))} />
        {suffix && <span className="pb-3 text-xs font-semibold text-muted-foreground">{suffix}</span>}
      </div>
      {slider && <input aria-label={label} className="mt-3 h-1.5 w-full cursor-pointer accent-[#6b4eff]" type="range" value={value} min={min} max={max} step={step} onChange={(event) => update(Number(event.target.value))} />}
    </label>
  );
}

function Result({ label, value, inverted = false }: { label: string; value: string; inverted?: boolean }) {
  return <div><p className={`mb-2 text-xs ${inverted ? "text-white/55" : "text-muted-foreground"}`}>{label}</p><p className="text-2xl font-semibold tracking-[-0.045em] md:text-3xl">{value}</p></div>;
}

function ChartPanel({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <div className="rounded-[30px] bg-[#f0edff] p-7 md:p-9"><h3 className="text-2xl font-semibold tracking-[-0.035em]">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{description}</p><div className="mt-7 h-64">{children}</div></div>;
}

function Breakdown({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return <div className="flex items-center justify-between gap-4 py-4"><dt className="text-sm text-foreground/65">{label}</dt><dd className={strong ? "text-2xl font-semibold tracking-[-0.04em]" : "font-semibold"}>{value}</dd></div>;
}

function confidenceLabel(score: number, t: (key: string, values?: Record<string, string | number>) => string) {
  if (score >= 80) return t("highConfidence");
  if (score >= 60) return t("mediumConfidence");
  return t("lowConfidence");
}
