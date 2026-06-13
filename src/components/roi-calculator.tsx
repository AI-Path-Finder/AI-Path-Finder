"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { AnimatedCounter } from "@/components/animated-counter";
import { calculateROI } from "@/lib/roi";
import { formatCurrency } from "@/lib/utils";
import type { ROIInputs } from "@/types/assessment";

export function ROICalculator({
  inputs,
  onChange,
}: {
  inputs: ROIInputs;
  onChange: (inputs: Partial<ROIInputs>) => void;
}) {
  const results = useMemo(() => calculateROI(inputs), [inputs]);

  return (
    <div>
      <section className="grid gap-12 border-y border-border py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <p className="eyebrow mb-8">Assumptions</p>
          <div className="space-y-8">
            <InputField label="Employee count" value={inputs.employeeCount} min={1} max={5000} onChange={(v) => onChange({ employeeCount: v })} />
            <InputField label="Average salary" value={inputs.averageSalary} min={30000} max={250000} step={5000} prefix="$" onChange={(v) => onChange({ averageSalary: v })} />
            <SliderField label="Manual hours per week" value={inputs.manualHoursPerWeek} min={1} max={40} suffix=" hrs" onChange={(v) => onChange({ manualHoursPerWeek: v })} />
            <SliderField label="Expected automation" value={inputs.automationPercent} min={10} max={95} suffix="%" onChange={(v) => onChange({ automationPercent: v })} />
            <InputField label="Implementation cost" value={inputs.implementationCost} min={50000} max={500000} step={10000} prefix="$" onChange={(v) => onChange({ implementationCost: v })} />
          </div>
        </div>

        <div>
          <p className="eyebrow mb-8">Projected return</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-border pb-10">
            <Result label="Annual savings"><AnimatedCounter value={results.annualSavings} prefix="$" /></Result>
            <Result label="Implementation"><AnimatedCounter value={results.implementationCost} prefix="$" /></Result>
            <Result label="Payback period"><AnimatedCounter value={results.paybackMonths} decimals={1} suffix=" months" /></Result>
            <Result label="12-month ROI"><AnimatedCounter value={results.roi12Month} suffix="%" /></Result>
          </div>
          <p className="mb-5 mt-10 text-xs text-muted-foreground">Cumulative value over 24 months</p>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.monthlyData}>
                <XAxis dataKey="month" tick={{ fill: "#746e67", fontSize: 11 }} axisLine={false} tickLine={false} interval={3} />
                <YAxis tick={{ fill: "#746e67", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "#f7f3eb", border: "1px solid #d7d0c7", borderRadius: "2px" }} formatter={(value: number) => [formatCurrency(value), ""]} />
                <Area type="monotone" dataKey="savings" stroke="#a7a097" strokeWidth={1.5} fill="transparent" name="Cumulative savings" />
                <Area type="monotone" dataKey="net" stroke="#1d1a17" strokeWidth={2} fill="rgba(29,26,23,.05)" name="Net value" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}

function Result({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="mb-2 text-xs text-muted-foreground">{label}</p><p className="text-2xl font-semibold tracking-[-0.04em] md:text-3xl">{children}</p></div>;
}

function InputField({ label, value, onChange, prefix, min, max, step = 1 }: { label: string; value: number; onChange: (v: number) => void; prefix?: string; min: number; max: number; step?: number }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-5">
        <label className="text-sm text-muted-foreground">{label}</label>
        <span className="text-sm font-semibold">{prefix}{value.toLocaleString()}</span>
      </div>
      <Input type="number" value={value} min={min} max={max} step={step} onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || min)))} />
    </div>
  );
}

function SliderField({ label, value, onChange, min, max, suffix = "" }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; suffix?: string }) {
  return (
    <div>
      <div className="mb-5 flex items-end justify-between"><label className="text-sm text-muted-foreground">{label}</label><span className="text-sm font-semibold">{value}{suffix}</span></div>
      <Slider value={[value]} min={min} max={max} step={1} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}
