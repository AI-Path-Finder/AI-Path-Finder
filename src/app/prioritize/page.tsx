"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { PriorityMatrix } from "@/components/priority-matrix";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/assessment-provider";

export default function PrioritizePage() {
  const router = useRouter();
  const { opportunities } = useAssessment();

  useEffect(() => {
    if (opportunities.length === 0) router.replace("/onboarding");
  }, [opportunities.length, router]);

  if (opportunities.length === 0) return null;

  return (
    <PageTransition>
      <Nav ctaHref="/roi" ctaLabel="Simulate ROI" />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <header className="mb-12 rounded-[38px] bg-[#ffdd8d] p-8 md:p-14">
          <p className="eyebrow mb-6">Portfolio view</p>
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.06em] md:text-7xl">
            Decide what deserves attention first.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/65">
            Compare business value with implementation difficulty. Select any
            initiative to review the reasoning behind its position.
          </p>
        </header>
        <PriorityMatrix opportunities={opportunities} />
        <div className="mt-16 flex justify-end border-t border-border pt-8">
          <Button size="lg" asChild>
            <Link href="/roi">Simulate ROI <ArrowRight /></Link>
          </Button>
        </div>
      </main>
    </PageTransition>
  );
}
