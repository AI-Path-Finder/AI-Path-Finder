"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavProps {
  ctaHref?: string;
  ctaLabel?: string;
  showCta?: boolean;
  inverted?: boolean;
}

export function Nav({
  ctaHref = "/onboarding",
  ctaLabel = "Start assessment",
  showCta = true,
  inverted = false,
}: NavProps) {
  return (
    <header className={`absolute top-0 z-50 w-full ${inverted ? "text-white" : ""}`}>
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <Link href="/" className="text-base font-bold tracking-[-0.03em]">
          AdoptAI
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link href="/#platform" className={inverted ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}>Platform</Link>
          <Link href="/#how-it-works" className={inverted ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}>How it works</Link>
          <Link href="/#outcomes" className={inverted ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}>Outcomes</Link>
        </nav>
        <div className="flex items-center gap-3">
          {showCta && (
            <Button size="sm" variant={inverted ? "secondary" : "default"} asChild>
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          )}
        </div>
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
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span>{label}</span>
      <span aria-hidden="true">·</span>
      <span>
        {current} of {total}
      </span>
    </div>
  );
}
