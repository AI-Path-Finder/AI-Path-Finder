"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavProps {
  ctaHref?: string;
  ctaLabel?: string;
  showCta?: boolean;
}

export function Nav({
  ctaHref = "/onboarding",
  ctaLabel = "Start Assessment",
  showCta = true,
}: NavProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Orion<span className="text-muted-foreground"> AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#product"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Product
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </Link>
        </nav>

        {showCta && (
          <Button variant="gradient" size="sm" asChild>
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

export function StepIndicator({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <span className={cn("font-mono text-xs")}>
        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      {label && (
        <>
          <span className="text-white/20">·</span>
          <span>{label}</span>
        </>
      )}
    </div>
  );
}
