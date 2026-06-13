"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { PriorityMatrix } from "@/components/priority-matrix";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAssessment } from "@/context/assessment-provider";

const LEGEND = [
  { key: "quick-wins", label: "Quick Wins", variant: "success" as const },
  { key: "strategic", label: "Strategic Projects", variant: "default" as const },
  { key: "secondary", label: "Secondary", variant: "warning" as const },
  { key: "avoid", label: "Avoid", variant: "secondary" as const },
];

export default function PrioritizePage() {
  const router = useRouter();
  const { opportunities } = useAssessment();

  useEffect(() => {
    if (opportunities.length === 0) {
      router.replace("/onboarding");
    }
  }, [opportunities.length, router]);

  if (opportunities.length === 0) return null;

  return (
    <PageTransition>
      <Nav ctaHref="/roi" ctaLabel="Simulate ROI" />

      <div className="mx-auto max-w-5xl px-6 pb-24 pt-28">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">
            Prioritization matrix
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Opportunities positioned by implementation difficulty and business
            value. Click any project for details.
          </p>
        </div>

        <PriorityMatrix opportunities={opportunities} />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {LEGEND.map((item) => (
            <Badge key={item.key} variant={item.variant}>
              {item.label}
            </Badge>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="gradient" size="lg" asChild>
            <Link href="/roi">
              Simulate ROI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
