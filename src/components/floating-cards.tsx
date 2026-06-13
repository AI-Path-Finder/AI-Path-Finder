"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Bot, FileText, Headphones, MessageSquare } from "lucide-react";

const cards = [
  {
    title: "Customer Support Automation",
    savings: 420000,
    complexity: "Medium",
    automation: 65,
    icon: Headphones,
    x: "8%",
    y: "18%",
    delay: 0,
  },
  {
    title: "Document Processing",
    savings: 280000,
    complexity: "Low",
    automation: 78,
    icon: FileText,
    x: "62%",
    y: "12%",
    delay: 0.2,
  },
  {
    title: "AI Sales Assistant",
    savings: 350000,
    complexity: "Medium",
    automation: 45,
    icon: MessageSquare,
    x: "72%",
    y: "52%",
    delay: 0.4,
  },
  {
    title: "Internal Knowledge Assistant",
    savings: 195000,
    complexity: "Low",
    automation: 55,
    icon: Bot,
    x: "12%",
    y: "58%",
    delay: 0.6,
  },
];

export function FloatingCards() {
  return (
    <div className="relative mx-auto h-[480px] w-full max-w-4xl md:h-[520px]">
      {cards.map((card) => (
        <motion.div
          key={card.title}
          className="absolute w-[260px] md:w-[280px]"
          style={{ left: card.x, top: card.y }}
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: card.delay },
            scale: { duration: 0.6, delay: card.delay },
            y: {
              duration: 4 + card.delay * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: card.delay,
            },
          }}
        >
          <div className="glass-strong rounded-2xl p-5 shadow-2xl shadow-indigo-500/5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20">
                <card.icon className="h-5 w-5 text-indigo-400" />
              </div>
              <Badge variant="success" className="font-mono">
                {card.automation}% auto
              </Badge>
            </div>
            <h3 className="mb-2 text-sm font-semibold leading-snug">
              {card.title}
            </h3>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-lg font-semibold text-emerald-400">
                {formatCurrency(card.savings)}
              </span>
              <span className="text-xs text-muted-foreground">/ year</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Complexity: {card.complexity}
            </p>
          </div>
        </motion.div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>
    </div>
  );
}
