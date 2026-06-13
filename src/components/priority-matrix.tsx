"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Opportunity } from "@/types/assessment";
import Link from "next/link";

const QUADRANT_LABELS = {
  "quick-wins": { label: "Quick Wins", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  strategic: { label: "Strategic Projects", color: "text-indigo-400", bg: "bg-indigo-500/10" },
  secondary: { label: "Secondary", color: "text-amber-400", bg: "bg-amber-500/10" },
  avoid: { label: "Avoid", color: "text-red-400", bg: "bg-red-500/10" },
};

interface PriorityMatrixProps {
  opportunities: Opportunity[];
}

export function PriorityMatrix({ opportunities }: PriorityMatrixProps) {
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const padding = 48;
  const width = 600;
  const height = 480;
  const plotW = width - padding * 2;
  const plotH = height - padding * 2;

  const toX = (difficulty: number) =>
    padding + ((difficulty - 1) / 9) * plotW;
  const toY = (value: number) =>
    padding + plotH - ((value - 1) / 9) * plotH;

  return (
    <>
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-xl">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          role="img"
          aria-label="Priority matrix"
        >
          {/* Quadrant backgrounds */}
          <rect
            x={padding}
            y={padding}
            width={plotW / 2}
            height={plotH / 2}
            fill="rgba(16, 185, 129, 0.04)"
          />
          <rect
            x={padding + plotW / 2}
            y={padding}
            width={plotW / 2}
            height={plotH / 2}
            fill="rgba(99, 102, 241, 0.04)"
          />
          <rect
            x={padding}
            y={padding + plotH / 2}
            width={plotW / 2}
            height={plotH / 2}
            fill="rgba(245, 158, 11, 0.04)"
          />
          <rect
            x={padding + plotW / 2}
            y={padding + plotH / 2}
            width={plotW / 2}
            height={plotH / 2}
            fill="rgba(239, 68, 68, 0.04)"
          />

          {/* Grid lines */}
          {[2, 4, 6, 8].map((n) => (
            <g key={n}>
              <line
                x1={toX(n)}
                y1={padding}
                x2={toX(n)}
                y2={padding + plotH}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
              />
              <line
                x1={padding}
                y1={toY(n)}
                x2={padding + plotW}
                y2={toY(n)}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
              />
            </g>
          ))}

          {/* Axes */}
          <line
            x1={padding}
            y1={padding + plotH}
            x2={padding + plotW}
            y2={padding + plotH}
            stroke="rgba(255,255,255,0.2)"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + plotH}
            stroke="rgba(255,255,255,0.2)"
          />

          {/* Midlines */}
          <line
            x1={toX(5.5)}
            y1={padding}
            x2={toX(5.5)}
            y2={padding + plotH}
            stroke="rgba(255,255,255,0.1)"
          />
          <line
            x1={padding}
            y1={toY(5.5)}
            x2={padding + plotW}
            y2={toY(5.5)}
            stroke="rgba(255,255,255,0.1)"
          />

          {/* Labels */}
          <text
            x={padding + plotW / 2}
            y={height - 8}
            textAnchor="middle"
            className="fill-muted-foreground text-[11px]"
          >
            Implementation Difficulty →
          </text>
          <text
            x={14}
            y={padding + plotH / 2}
            textAnchor="middle"
            transform={`rotate(-90, 14, ${padding + plotH / 2})`}
            className="fill-muted-foreground text-[11px]"
          >
            Business Value →
          </text>

          {/* Quadrant labels */}
          <text x={padding + 12} y={padding + 20} className="fill-emerald-400/70 text-[10px] font-medium">
            Quick Wins
          </text>
          <text x={padding + plotW / 2 + 12} y={padding + 20} className="fill-indigo-400/70 text-[10px] font-medium">
            Strategic
          </text>
          <text x={padding + 12} y={padding + plotH / 2 + 20} className="fill-amber-400/70 text-[10px] font-medium">
            Secondary
          </text>
          <text x={padding + plotW / 2 + 12} y={padding + plotH / 2 + 20} className="fill-red-400/70 text-[10px] font-medium">
            Avoid
          </text>

          {/* Data points */}
          {opportunities.map((opp) => {
            const cx = toX(opp.difficultyScore);
            const cy = toY(opp.valueScore);
            const isHovered = hoveredId === opp.id;
            const q = QUADRANT_LABELS[opp.quadrant];

            return (
              <g
                key={opp.id}
                onMouseEnter={() => setHoveredId(opp.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelected(opp)}
                className="cursor-pointer"
              >
                {isHovered && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={24}
                    fill="rgba(99, 102, 241, 0.15)"
                    className="animate-pulse"
                  />
                )}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 12 : 9}
                  fill="url(#dotGradient)"
                  stroke={isHovered ? "#818cf8" : "rgba(255,255,255,0.3)"}
                  strokeWidth={2}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                />
                {isHovered && (
                  <g>
                    <rect
                      x={cx - 80}
                      y={cy - 52}
                      width={160}
                      height={40}
                      rx={8}
                      fill="rgba(9,9,11,0.95)"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <text
                      x={cx}
                      y={cy - 36}
                      textAnchor="middle"
                      className="fill-foreground text-[10px] font-medium"
                    >
                      {opp.title.length > 22
                        ? opp.title.slice(0, 22) + "…"
                        : opp.title}
                    </text>
                    <text
                      x={cx}
                      y={cy - 22}
                      textAnchor="middle"
                      className="fill-emerald-400 text-[10px] font-mono"
                    >
                      {formatCurrency(opp.annualSavings)}/yr
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          <defs>
            <radialGradient id="dotGradient">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#22d3ee" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>{selected.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={QUADRANT_LABELS[selected.quadrant].bg}>
                    {QUADRANT_LABELS[selected.quadrant].label}
                  </Badge>
                  <Badge variant="secondary">
                    {selected.implementationComplexity} complexity
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Annual savings</p>
                    <p className="font-mono text-lg text-emerald-400">
                      {formatCurrency(selected.annualSavings)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Confidence</p>
                    <p className="font-mono text-lg">{selected.confidenceScore}%</p>
                  </div>
                </div>
                <Button variant="gradient" className="w-full" asChild>
                  <Link href="/roi">Simulate ROI</Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
