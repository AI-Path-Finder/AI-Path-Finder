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
import { useLanguage } from "@/context/language-provider";

export default function PrioritizePage() {
  const router = useRouter();
  const { opportunities } = useAssessment();
  const { t } = useLanguage();

  useEffect(() => {
    if (opportunities.length === 0) router.replace("/onboarding");
  }, [opportunities.length, router]);

  if (opportunities.length === 0) return null;

  return (
    <PageTransition>
      <Nav ctaHref="/roi" ctaLabel={t("simulateRoi")} />
      <main className="mx-auto max-w-[1500px] px-5 pb-24 pt-32 md:px-8">
        <header className="mb-12 rounded-[38px] bg-[#ffdd8d] p-8 md:p-14">
          <p className="eyebrow mb-6">{t("portfolioView")}</p>
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.06em] md:text-7xl">
            {t("priorityTitle")}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/65">
            {t("priorityText")}
          </p>
        </header>
        <PriorityMatrix opportunities={opportunities} />
        <div className="mt-16 flex justify-end border-t border-border pt-8">
          <Button size="lg" asChild>
            <Link href="/roi">{t("simulateRoi")} <ArrowRight /></Link>
          </Button>
        </div>
      </main>
    </PageTransition>
  );
}
