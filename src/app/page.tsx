"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/page-transition";

const phases = [
  ["01", "Discover", "Describe how your company works and where time is lost."],
  ["02", "Prioritize", "Compare opportunities by value, effort, speed, and risk."],
  ["03", "Decide", "Model the return before committing budget or resources."],
];

export default function LandingPage() {
  return (
    <PageTransition>
      <Nav />
      <main>
        <section className="flex min-h-screen items-center px-6 pb-20 pt-28 md:px-10">
          <div className="mx-auto w-full max-w-[1440px]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="eyebrow mb-8"
            >
              A clearer path to AI adoption
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-5xl text-[clamp(3.5rem,8.5vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.075em]"
            >
              Discover where AI can transform your business.
            </motion.h1>
            <div className="mt-12 grid gap-10 border-t border-border pt-8 md:grid-cols-2">
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Identify high-value AI opportunities, prioritize implementation,
                and estimate ROI before investing resources.
              </p>
              <div className="flex items-start md:justify-end">
                <Button size="lg" asChild>
                  <Link href="/onboarding">
                    Start assessment <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-foreground px-6 py-28 text-background md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <p className="mb-14 text-xs font-semibold uppercase tracking-[0.18em] text-background/55">
              From uncertainty to a confident first move
            </p>
            <div className="divide-y divide-background/20 border-y border-background/20">
              {phases.map(([number, title, description]) => (
                <div
                  key={number}
                  className="grid gap-5 py-10 md:grid-cols-[100px_1fr_1fr] md:items-baseline"
                >
                  <span className="text-sm text-background/50">{number}</span>
                  <h2 className="text-4xl font-medium tracking-[-0.04em] md:text-5xl">
                    {title}
                  </h2>
                  <p className="max-w-md text-base leading-relaxed text-background/60">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-28 md:px-10 md:py-40">
          <div className="mx-auto max-w-[1440px]">
            <h2 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.06em] md:text-7xl">
              Make the first AI investment the right one.
            </h2>
            <Button className="mt-10" size="lg" asChild>
              <Link href="/onboarding">Begin discovery <ArrowRight /></Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t border-border px-6 py-8 text-xs text-muted-foreground md:px-10">
        <div className="mx-auto flex max-w-[1440px] justify-between">
          <span>ProcessMind</span>
          <span>Decision intelligence for AI transformation</span>
        </div>
      </footer>
    </PageTransition>
  );
}
