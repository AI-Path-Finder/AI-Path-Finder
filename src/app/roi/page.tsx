"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  const {
    opportunities,
    roiInputs,
    setROIInputs,
    generateRecommendation,
    onboarding,
    getSelectedOpportunity,
  } = useAssessment();

  const selected = getSelectedOpportunity() ?? opportunities[0];

  useEffect(() => {
    if (opportunities.length === 0) {
      router.replace("/onboarding");
    }
  }, [opportunities.length, router]);

  const inputs: ROIInputs = useMemo(() => {
    if (Object.keys(roiInputs).length >= 5) {
      return roiInputs as ROIInputs;
    }
    const employeeCount =
      onboarding.companySize === "1000+"
        ? 200
        : onboarding.companySize === "201-1000"
          ? 80
          : onboarding.companySize === "51-200"
            ? 25
            : 10;

    return defaultROIInputs(
      employeeCount,
      selected?.automationPercent ?? 50,
      implementationCostForComplexity(
        selected?.implementationComplexity ?? "Medium",
        onboarding.companySize ?? "51-200"
      )
    );
  }, [roiInputs, onboarding, selected]);

  if (opportunities.length === 0 || !selected) return null;

  const handleContinue = () => {
    setROIInputs(inputs);
    generateRecommendation();
    router.push("/recommendation");
  };

  return (
    <PageTransition>
      <Nav showCta={false} />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
        <div className="mb-12">
          <p className="mb-2 text-sm text-muted-foreground">
            ROI Simulator · {selected.title}
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Model your investment return
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Adjust inputs to see how automation impacts your bottom line before
            committing resources.
          </p>
        </div>

        <ROICalculator
          inputs={inputs}
          onChange={(partial) => setROIInputs({ ...inputs, ...partial })}
        />

        <div className="mt-12 flex justify-center">
          <Button variant="gradient" size="lg" onClick={handleContinue}>
            View final recommendation
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
