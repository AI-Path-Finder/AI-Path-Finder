"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavProps {
  ctaHref?: string;
  ctaLabel?: string;
  showCta?: boolean;
}

export function Nav({
  ctaHref = "/onboarding",
  ctaLabel = "Start assessment",
  showCta = true,
}: NavProps) {
  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <Link href="/" className="text-base font-bold tracking-[-0.03em]">
          ProcessMind
        </Link>
        <div className="flex items-center gap-6">
          <span className="hidden text-xs text-muted-foreground md:block">
            AI opportunity intelligence
          </span>
          {showCta && (
            <Button size="sm" asChild>
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
