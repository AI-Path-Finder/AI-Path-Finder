"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { ExecutiveSummary } from "@/components/executive-summary";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/assessment-provider";
import { saveAssessment } from "@/lib/supabase";

export default function RecommendationPage() {
  const router = useRouter();
  const { recommendation, opportunities, onboarding, resetAssessment } = useAssessment();
  useEffect(() => { if (!recommendation && opportunities.length === 0) router.replace("/onboarding"); }, [recommendation, opportunities.length, router]);
  useEffect(() => { if (recommendation) saveAssessment({ onboarding, opportunities, topRecommendationId: recommendation.opportunity.id }); }, [recommendation, opportunities, onboarding]);
  if (!recommendation) return null;
  return (
    <PageTransition>
      <Nav showCta={false} />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <div className="rounded-[38px] bg-[#ffe0d8] p-8 md:p-14">
          <ExecutiveSummary recommendation={recommendation} />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild><Link href="/prioritize">Review all opportunities</Link></Button>
          <Button variant="outline" onClick={() => { resetAssessment(); router.push("/onboarding"); }}>Start new assessment</Button>
        </div>
      </main>
    </PageTransition>
  );
}
