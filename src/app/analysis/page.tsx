"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { AnalysisLoader } from "@/components/analysis-loader";
import { OpportunityCard } from "@/components/opportunity-card";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/assessment-provider";

export default function AnalysisPage() {
  const router = useRouter();
  const { opportunities, onboarding } = useAssessment();
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!onboarding.industry) router.replace("/onboarding");
  }, [onboarding.industry, router]);

  if (!onboarding.industry) return null;

  return (
    <PageTransition>
      <Nav ctaHref="/prioritize" ctaLabel="Prioritize" showCta={showResults} />
      {loading && !showResults ? (
        <AnalysisLoader onComplete={() => { setLoading(false); setShowResults(true); }} />
      ) : (
        <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
          <header className="mb-12 rounded-[38px] bg-[#2f1c4d] p-8 text-white md:p-14">
            <p className="eyebrow mb-6 text-white/60">
              Analysis complete · {opportunities.length} opportunities identified
            </p>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.06em] md:text-7xl">
              Where AI can create meaningful value.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
              Based on your {onboarding.industry} profile across{" "}
              {(onboarding.departments ?? []).join(", ")}.
            </p>
          </header>
          <div className="mb-16">
            {opportunities.map((opp, i) => (
              <OpportunityCard key={opp.id} opportunity={opp} index={i} />
            ))}
          </div>
          <div className="flex justify-end">
            <Button size="lg" asChild>
              <Link href="/prioritize">Prioritize opportunities <ArrowRight /></Link>
            </Button>
          </div>
        </main>
      )}
    </PageTransition>
  );
}
