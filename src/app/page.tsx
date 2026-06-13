"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Layers, Target, Zap } from "lucide-react";
import { Nav } from "@/components/nav";
import { FloatingCards } from "@/components/floating-cards";
import { GradientText } from "@/components/gradient-text";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/glass-card";
import { PageTransition, staggerContainer, staggerItem } from "@/components/page-transition";

const steps = [
  {
    icon: Layers,
    title: "Discover",
    description:
      "Map your organization’s processes, departments, and manual workflows in a guided assessment.",
  },
  {
    icon: Target,
    title: "Prioritize",
    description:
      "AI-generated opportunities ranked by business value and implementation feasibility.",
  },
  {
    icon: BarChart3,
    title: "Simulate ROI",
    description:
      "Interactive financial modeling before you commit budget or engineering resources.",
  },
];

export default function LandingPage() {
  return (
    <PageTransition>
      <Nav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-24 pt-32 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
                  <Zap className="h-3.5 w-3.5 text-indigo-400" />
                  AI-native opportunity intelligence
                </div>

                <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-[3.5rem]">
                  Transform your company with AI,{" "}
                  <GradientText as="span">
                    backed by real business impact.
                  </GradientText>
                </h1>

                <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                  Discover where AI creates value, prioritize initiatives and
                  simulate ROI before investing.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="gradient" size="lg" asChild>
                    <Link href="/onboarding">
                      Start Assessment
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="#how-it-works">See how it works</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <FloatingCards />
              </motion.div>
            </div>

            <div className="mt-16 lg:hidden">
              <FloatingCards />
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="border-y border-white/5 px-6 py-12">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-muted-foreground">
            <span>Trusted by forward-thinking teams at</span>
            {["Acme Corp", "NovaTech", "ScalePoint", "Vertex AI"].map((name) => (
              <span key={name} className="font-medium text-foreground/40">
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2
                id="product"
                className="mb-4 text-3xl font-bold md:text-4xl"
              >
                From discovery to decision in minutes
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                A structured workflow that replaces guesswork with data-driven
                AI investment decisions.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-3"
            >
              {steps.map((step, i) => (
                <motion.div key={step.title} variants={staggerItem}>
                  <GlassCard hover className="h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20">
                      <step.icon className="h-6 w-6 text-indigo-400" />
                    </div>
                    <span className="mb-2 block font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </span>
                    <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl">
            <GlassCard glow className="relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />
              <div className="relative py-8">
                <h2 className="mb-4 text-3xl font-bold">
                  Ready to find your AI quick wins?
                </h2>
                <p className="mb-8 text-muted-foreground">
                  Complete a 5-minute assessment and get a prioritized roadmap
                  with ROI projections.
                </p>
                <Button variant="gradient" size="lg" asChild>
                  <Link href="/onboarding">
                    Start Assessment
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-sm text-muted-foreground">
          <span>© 2026 Orion AI</span>
          <span>Built for AI product leaders</span>
        </div>
      </footer>
    </PageTransition>
  );
}
