"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-xl",
        glow && "shadow-indigo-500/10 ring-1 ring-indigo-500/20",
        hover && "cursor-pointer transition-shadow hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
