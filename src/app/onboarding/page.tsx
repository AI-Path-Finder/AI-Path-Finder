"use client";

import { Nav } from "@/components/nav";
import { OnboardingWizard } from "@/components/onboarding-wizard";
import { PageTransition } from "@/components/page-transition";

export default function OnboardingPage() {
  return (
    <PageTransition className="min-h-screen bg-[#f8f5ff]">
      <Nav showCta={false} />
      <OnboardingWizard />
    </PageTransition>
  );
}
