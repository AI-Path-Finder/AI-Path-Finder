"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { ROICalculator } from "@/components/roi-calculator";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/assessment-provider";
import { defaultROIInputs } from "@/lib/roi";
import { implementationCostForComplexity } from "@/lib/utils";
import type { ROIInputs } from "@/types/assessment";

export default function ROIPage() {
  const router = useRouter();
  const { opportunities, roiInputs, setROIInputs, generateRecommendation, onboarding, getSelectedOpportunity } = useAssessment();
  const selected = getSelectedOpportunity() ?? opportunities[0];
  useEffect(() => { if (opportunities.length === 0) router.replace("/onboarding"); }, [opportunities.length, router]);
  const inputs: ROIInputs = useMemo(() => {
    if (Object.keys(roiInputs).length >= 5) return roiInputs as ROIInputs;
    const employeeCount = onboarding.companySize === "1000+" ? 200 : onboarding.companySize === "201-1000" ? 80 : onboarding.companySize === "51-200" ? 25 : 10;
    return defaultROIInputs(employeeCount, selected?.automationPercent ?? 50, implementationCostForComplexity(selected?.implementationComplexity ?? "Medium", onboarding.companySize ?? "51-200"));
  }, [roiInputs, onboarding, selected]);
  if (opportunities.length === 0 || !selected) return null;
  const handleContinue = () => { setROIInputs(inputs); generateRecommendation(); router.push("/recommendation"); };

  return (
    <PageTransition>
      <Nav showCta={false} />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <header className="mb-16 max-w-4xl">
          <p className="eyebrow mb-6">ROI simulation · {selected.title}</p>
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.06em] md:text-7xl">Understand the return before you invest.</h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">Adjust the assumptions and see how the financial case changes in real time.</p>
        </header>
        <ROICalculator inputs={inputs} onChange={(partial) => setROIInputs({ ...inputs, ...partial })} />
        <div className="mt-10 flex justify-end"><Button size="lg" onClick={handleContinue}>View recommendation <ArrowRight /></Button></div>
      </main>
    </PageTransition>
  );
}
