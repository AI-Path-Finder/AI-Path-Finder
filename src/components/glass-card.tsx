"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
      className={cn(
        "border-y border-border bg-transparent py-6",
        glow && "border-foreground/30",
        hover && "cursor-pointer hover:border-foreground",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
