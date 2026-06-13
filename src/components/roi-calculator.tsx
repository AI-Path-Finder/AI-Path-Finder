"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/glass-card";
import { AnimatedCounter } from "@/components/animated-counter";
import { calculateROI } from "@/lib/roi";
import { formatCurrency } from "@/lib/utils";
import type { ROIInputs } from "@/types/assessment";

interface ROICalculatorProps {
  inputs: ROIInputs;
  onChange: (inputs: Partial<ROIInputs>) => void;
}

export function ROICalculator({ inputs, onChange }: ROICalculatorProps) {
  const results = useMemo(() => calculateROI(inputs), [inputs]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <GlassCard className="space-y-8">
        <div>
          <h3 className="mb-6 text-lg font-semibold">Simulation inputs</h3>

          <div className="space-y-8">
            <InputField
              label="Employee count"
              value={inputs.employeeCount}
              onChange={(v) => onChange({ employeeCount: v })}
              min={1}
              max={5000}
            />

            <InputField
              label="Average salary"
              value={inputs.averageSalary}
              onChange={(v) => onChange({ averageSalary: v })}
              prefix="$"
              min={30000}
              max={250000}
              step={5000}
            />

            <SliderField
              label="Manual hours per week"
              value={inputs.manualHoursPerWeek}
              onChange={(v) => onChange({ manualHoursPerWeek: v })}
              min={1}
              max={40}
              suffix=" hrs"
            />

            <SliderField
              label="Expected automation"
              value={inputs.automationPercent}
              onChange={(v) => onChange({ automationPercent: v })}
              min={10}
              max={95}
              suffix="%"
            />

            <InputField
              label="Implementation cost"
              value={inputs.implementationCost}
              onChange={(v) => onChange({ implementationCost: v })}
              prefix="$"
              min={50000}
              max={500000}
              step={10000}
            />
          </div>
        </div>
      </GlassCard>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="Annual savings"
            value={results.annualSavings}
            format="currency"
            accent="emerald"
          />
          <StatCard
            label="Implementation"
            value={results.implementationCost}
            format="currency"
          />
          <StatCard
            label="Payback period"
            value={results.paybackMonths}
            format="months"
            accent="cyan"
          />
          <StatCard
            label="12-month ROI"
            value={results.roi12Month}
            format="percent"
            accent="indigo"
          />
        </div>

        <GlassCard className="p-4">
          <h3 className="mb-4 px-2 text-sm font-medium text-muted-foreground">
            Cumulative value over 24 months
          </h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.monthlyData}>
                <defs>
                  <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#71717a", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  interval={3}
                />
                <YAxis
                  tick={{ fill: "#71717a", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(9,9,11,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    backdropFilter: "blur(12px)",
                  }}
                  formatter={(value: number) => [formatCurrency(value), ""]}
                />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stroke="#34d399"
                  strokeWidth={2}
                  fill="url(#savingsGrad)"
                  name="Cumulative savings"
                />
                <Area
                  type="monotone"
                  dataKey="net"
                  stroke="#818cf8"
                  strokeWidth={2}
                  fill="url(#netGrad)"
                  name="Net value"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  format,
  accent,
}: {
  label: string;
  value: number;
  format: "currency" | "percent" | "months";
  accent?: "emerald" | "cyan" | "indigo";
}) {
  const accentClass =
    accent === "emerald"
      ? "text-emerald-400"
      : accent === "cyan"
        ? "text-cyan-400"
        : accent === "indigo"
          ? "text-indigo-400"
          : "text-foreground";

  return (
    <motion.div
      layout
      className="glass rounded-2xl p-5"
    >
      <p className="mb-2 text-xs text-muted-foreground">{label}</p>
      <p className={`font-mono text-2xl font-bold ${accentClass}`}>
        {format === "currency" && (
          <AnimatedCounter value={value} prefix="$" decimals={0} />
        )}
        {format === "percent" && (
          <AnimatedCounter value={value} suffix="%" decimals={0} />
        )}
        {format === "months" && (
          <>
            <AnimatedCounter value={value} decimals={1} />
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              mo
            </span>
          </>
        )}
      </p>
    </motion.div>
  );
}

function InputField({
  label,
  value,
  onChange,
  prefix,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="font-mono text-sm text-muted-foreground">
          {prefix}
          {value.toLocaleString()}
        </span>
      </div>
      <Input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) =>
          onChange(Math.min(max, Math.max(min, Number(e.target.value) || min)))
        }
      />
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  suffix = "",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  suffix?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="font-mono text-sm">
          {value}
          {suffix}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
}
