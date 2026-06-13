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
    if (!onboarding.industry) {
      router.replace("/onboarding");
    }
  }, [onboarding.industry, router]);

  if (!onboarding.industry) return null;

  return (
    <PageTransition>
      <Nav ctaHref="/prioritize" ctaLabel="Prioritize" showCta={showResults} />

      {loading && !showResults ? (
        <AnalysisLoader
          onComplete={() => {
            setLoading(false);
            setShowResults(true);
          }}
        />
      ) : (
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
          <div className="mb-12">
            <p className="mb-2 text-sm text-muted-foreground">
              Analysis complete · {opportunities.length} opportunities identified
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">
              AI opportunities for your organization
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Based on your {onboarding.industry} profile across{" "}
              {(onboarding.departments ?? []).join(", ")}.
            </p>
          </div>

          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {opportunities.map((opp, i) => (
              <OpportunityCard key={opp.id} opportunity={opp} index={i} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/prioritize">
                Prioritize opportunities
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
