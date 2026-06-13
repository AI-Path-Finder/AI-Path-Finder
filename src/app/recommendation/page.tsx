"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Nav } from "@/components/nav";
import { ExecutiveSummary } from "@/components/executive-summary";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/assessment-provider";
import { saveAssessment } from "@/lib/supabase";

export default function RecommendationPage() {
  const router = useRouter();
  const { recommendation, opportunities, onboarding, resetAssessment } =
    useAssessment();

  useEffect(() => {
    if (!recommendation && opportunities.length === 0) {
      router.replace("/onboarding");
    }
  }, [recommendation, opportunities.length, router]);

  useEffect(() => {
    if (recommendation) {
      saveAssessment({
        onboarding,
        opportunities,
        topRecommendationId: recommendation.opportunity.id,
      });
    }
  }, [recommendation, opportunities, onboarding]);

  if (!recommendation) return null;

  return (
    <PageTransition>
      <Nav showCta={false} />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        <ExecutiveSummary recommendation={recommendation} />

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button variant="gradient" size="lg" asChild>
            <Link href="/prioritize">Review all opportunities</Link>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              resetAssessment();
              router.push("/onboarding");
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Start new assessment
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
