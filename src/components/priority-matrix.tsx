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
import { useLanguage } from "@/context/language-provider";

const QUADRANT_LABELS = {
  "quick-wins": { key: "quickWins", bg: "bg-secondary" },
  strategic: { key: "strategicProjects", bg: "bg-secondary" },
  secondary: { key: "secondary", bg: "bg-secondary" },
  avoid: { key: "avoid", bg: "bg-secondary" },
};

interface PriorityMatrixProps {
  opportunities: Opportunity[];
}

export function PriorityMatrix({ opportunities }: PriorityMatrixProps) {
  const { t, td } = useLanguage();
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
      <div className="relative w-full overflow-hidden rounded-[32px] bg-[#f0edff] p-4 py-8 md:p-8">
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
            fill="rgba(29, 26, 23, 0.025)"
          />
          <rect
            x={padding + plotW / 2}
            y={padding}
            width={plotW / 2}
            height={plotH / 2}
            fill="rgba(29, 26, 23, 0.045)"
          />
          <rect
            x={padding}
            y={padding + plotH / 2}
            width={plotW / 2}
            height={plotH / 2}
            fill="transparent"
          />
          <rect
            x={padding + plotW / 2}
            y={padding + plotH / 2}
            width={plotW / 2}
            height={plotH / 2}
            fill="rgba(29, 26, 23, 0.02)"
          />

          {/* Grid lines */}
          {[2, 4, 6, 8].map((n) => (
            <g key={n}>
              <line
                x1={toX(n)}
                y1={padding}
                x2={toX(n)}
                y2={padding + plotH}
                stroke="rgba(29,26,23,0.10)"
                strokeDasharray="4 4"
              />
              <line
                x1={padding}
                y1={toY(n)}
                x2={padding + plotW}
                y2={toY(n)}
                stroke="rgba(29,26,23,0.10)"
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
            stroke="rgba(29,26,23,0.35)"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={padding + plotH}
            stroke="rgba(29,26,23,0.35)"
          />

          {/* Midlines */}
          <line
            x1={toX(5.5)}
            y1={padding}
            x2={toX(5.5)}
            y2={padding + plotH}
            stroke="rgba(29,26,23,0.18)"
          />
          <line
            x1={padding}
            y1={toY(5.5)}
            x2={padding + plotW}
            y2={toY(5.5)}
            stroke="rgba(29,26,23,0.18)"
          />

          {/* Labels */}
          <text
            x={padding + plotW / 2}
            y={height - 8}
            textAnchor="middle"
            className="fill-muted-foreground text-[11px]"
          >
            {t("implementationDifficulty")} →
          </text>
          <text
            x={14}
            y={padding + plotH / 2}
            textAnchor="middle"
            transform={`rotate(-90, 14, ${padding + plotH / 2})`}
            className="fill-muted-foreground text-[11px]"
          >
            {t("businessValue")} →
          </text>

          {/* Quadrant labels */}
          <text x={padding + 12} y={padding + 20} className="fill-foreground text-[10px] font-medium">
            {t("quickWins")}
          </text>
          <text x={padding + plotW / 2 + 12} y={padding + 20} className="fill-foreground text-[10px] font-medium">
            {t("strategic")}
          </text>
          <text x={padding + 12} y={padding + plotH / 2 + 20} className="fill-muted-foreground text-[10px] font-medium">
            {t("secondary")}
          </text>
          <text x={padding + plotW / 2 + 12} y={padding + plotH / 2 + 20} className="fill-muted-foreground text-[10px] font-medium">
            {t("avoid")}
          </text>

          {/* Data points */}
          {opportunities.map((opp) => {
            const cx = toX(opp.difficultyScore);
            const cy = toY(opp.valueScore);
            const isHovered = hoveredId === opp.id;
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
                    fill="rgba(29,26,23,0.08)"
                  />
                )}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 12 : 9}
                  fill="url(#dotGradient)"
                  stroke="#1d1a17"
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
                      fill="#f7f3eb"
                      stroke="rgba(29,26,23,0.2)"
                    />
                    <text
                      x={cx}
                      y={cy - 36}
                      textAnchor="middle"
                      className="fill-foreground text-[10px] font-medium"
                    >
                      {td(opp.title).length > 22
                        ? td(opp.title).slice(0, 22) + "…"
                        : td(opp.title)}
                    </text>
                    <text
                      x={cx}
                      y={cy - 22}
                      textAnchor="middle"
                      className="fill-muted-foreground text-[10px]"
                    >
                      {formatCurrency(opp.annualSavings)}{t("perYear")}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          <defs>
            <radialGradient id="dotGradient">
              <stop offset="0%" stopColor="#1d1a17" />
              <stop offset="100%" stopColor="#6f6962" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{td(selected.title)}</DialogTitle>
                <DialogDescription>{td(selected.description)}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={QUADRANT_LABELS[selected.quadrant].bg}>
                    {t(QUADRANT_LABELS[selected.quadrant].key)}
                  </Badge>
                  <Badge variant="secondary">
                    {t(selected.implementationComplexity.toLowerCase())} {t("complexity").toLowerCase()}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t("annualSavings")}</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(selected.annualSavings)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t("confidence")}</p>
                    <p className="font-mono text-lg">{selected.confidenceScore}%</p>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/roi">{t("simulateRoi")}</Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
