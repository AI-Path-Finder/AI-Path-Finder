"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Check, MoveUpRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/page-transition";
import { useAssessment } from "@/context/assessment-provider";

const opportunities = [
  ["Customer support automation", "€42k annual savings"],
  ["Internal knowledge assistant", "6 week deployment"],
  ["Invoice processing", "87 priority score"],
];

export default function LandingPage() {
  return (
    <PageTransition>
      <div className="overflow-hidden rounded-b-[42px] bg-[#2f1c4d] text-white md:rounded-b-[72px]">
        <Nav inverted />
        <section className="px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
          <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[1fr_.85fr] lg:items-center">
            <div>
              <p className="mb-6 text-sm font-semibold text-[#d7c8ff]">AI transformation, with a plan</p>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl text-[clamp(3.7rem,7vw,7.2rem)] font-semibold leading-[.92] tracking-[-.075em]">
                Find the AI ideas worth building.
              </motion.h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/68 md:text-xl">
                Turn how your business works into a prioritized AI roadmap, with
                clear opportunities and ROI before you invest.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button size="lg" className="bg-white text-[#2f1c4d] hover:bg-[#f2ecff]" asChild>
                  <Link href="/onboarding">Start assessment <ArrowRight /></Link>
                </Button>
                <span className="text-sm text-white/55">Takes about 5 minutes</span>
              </div>
            </div>
            <AssessmentPreview />
          </div>
        </section>
      </div>

      <main>
        <section id="platform" className="px-6 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-5 text-sm font-semibold text-[#6b4eff]">ASK. ANALYZE. ACT.</p>
              <h2 className="text-5xl font-semibold leading-[1] tracking-[-.065em] md:text-7xl">
                From business context to a confident first move.
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                AdoptAI asks the right questions, evaluates every opportunity,
                and makes the business case easy to understand.
              </p>
            </div>
            <div className="mt-20 grid gap-5 lg:grid-cols-3">
              <ColorPanel graphic="discover" color="bg-[#e8ddff]" label="DISCOVER" title="Describe your company naturally" text="A conversational assessment learns how teams work, where time is lost, and what slows people down." />
              <ColorPanel graphic="prioritize" color="bg-[#ffdd8d]" label="PRIORITIZE" title="Know what should happen first" text="Every initiative is scored for value, feasibility, speed, risk, and data readiness." />
              <ColorPanel graphic="prove" color="bg-[#ff9d86]" label="PROVE" title="Make the financial case" text="Model savings, implementation cost, payback period, and twelve-month return." />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-4 md:px-6">
          <div className="mx-auto max-w-[1480px] rounded-[40px] bg-[#f0edff] px-6 py-20 md:rounded-[68px] md:px-16 md:py-28">
            <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <p className="mb-5 text-sm font-semibold text-[#6b4eff]">INTELLIGENT DISCOVERY</p>
                <h2 className="text-5xl font-semibold leading-[1] tracking-[-.06em] md:text-7xl">Questions that lead somewhere.</h2>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
                  One focused question at a time. Every answer shapes a more
                  relevant set of recommendations for your organization.
                </p>
                <Button className="mt-8 bg-[#6b4eff] text-white hover:bg-[#5438de]" asChild>
                  <Link href="/onboarding">Try the assessment <ArrowRight /></Link>
                </Button>
              </div>
              <div className="rounded-[32px] bg-white p-5 shadow-[0_24px_70px_rgba(47,28,77,.14)] md:p-9">
                <div className="mb-12 flex items-center justify-between text-xs text-muted-foreground"><span>AdoptAI discovery</span><span>3 of 7</span></div>
                <p className="mb-3 text-sm text-[#6b4eff]">03 →</p>
                <h3 className="max-w-2xl text-3xl font-semibold tracking-[-.045em] md:text-5xl">Which departments should we focus on?</h3>
                <p className="mt-4 text-muted-foreground">Select all areas where AI could create impact.</p>
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {["Customer Support", "Operations", "Finance", "Sales"].map((item, i) => <div key={item} className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 ${i < 2 ? "border-[#6b4eff] bg-[#f0edff]" : "border-border"}`}><span className="flex h-6 w-6 items-center justify-center rounded border border-current text-xs">{i < 2 ? <Check className="h-3 w-3" /> : i + 1}</span>{item}</div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="outcomes" className="px-6 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="mb-5 text-sm font-semibold text-[#ff6c4c]">DECISION INTELLIGENCE</p>
                <h2 className="text-5xl font-semibold leading-[1] tracking-[-.06em] md:text-7xl">Ideas become an actionable roadmap.</h2>
              </div>
              <div className="divide-y divide-border border-y border-border">
                {opportunities.map(([title, value], i) => (
                  <div key={title} className="grid grid-cols-[42px_1fr_auto] items-center gap-4 py-7">
                    <span className="text-sm text-muted-foreground">0{i + 1}</span>
                    <span className="text-xl font-semibold tracking-[-.025em]">{title}</span>
                    <span className="hidden text-sm text-muted-foreground sm:block">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-5 md:px-6">
          <div className="mx-auto max-w-[1480px] rounded-[40px] bg-[#ffdd8d] px-6 py-20 text-center md:rounded-[68px] md:px-16 md:py-28">
            <h2 className="mx-auto max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.065em] md:text-8xl">Make your next AI investment the right one.</h2>
            <Button size="lg" className="mt-9" asChild><Link href="/onboarding">Start assessment <MoveUpRight /></Link></Button>
          </div>
        </section>
      </main>
      <footer className="px-6 py-10 md:px-10"><div className="mx-auto flex max-w-[1440px] justify-between text-sm"><strong>AdoptAI</strong><span className="text-muted-foreground">AI opportunity intelligence</span></div></footer>
    </PageTransition>
  );
}

function AssessmentPreview() {
  const router = useRouter();
  const { onboarding, setOnboarding } = useAssessment();
  const industries = ["Technology", "Financial Services", "Healthcare"];
  const [selected, setSelected] = useState(onboarding.industry ?? "Technology");

  const continueAssessment = () => {
    setOnboarding({ industry: selected });
    router.push("/onboarding?continue=industry");
  };

  return (
    <motion.div initial={{ opacity: 0, rotate: 2, y: 20 }} animate={{ opacity: 1, rotate: -2, y: 0 }} transition={{ delay: .15, duration: .5 }} className="relative mx-auto w-full max-w-xl">
      <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-[#ffdd8d]" />
      <div className="absolute -bottom-10 -right-8 h-36 w-36 rounded-[35%] bg-[#ff9d86]" />
      <div className="relative rounded-[28px] bg-[#f8f5ff] p-6 text-[#2f1c4d] shadow-[0_28px_80px_rgba(0,0,0,.28)] md:p-9">
        <div className="mb-16 flex justify-between text-xs text-[#2f1c4d]/55"><span>AdoptAI</span><span>1 of 7</span></div>
        <p className="mb-3 text-sm text-[#6b4eff]">01 →</p>
        <h2 className="text-3xl font-semibold leading-tight tracking-[-.05em] md:text-5xl">What industry is your company in?</h2>
        <p className="mt-4 text-sm text-[#2f1c4d]/60">This helps tailor opportunities to your sector.</p>
        <div className="mt-8 space-y-2">
          {industries.map((label, i) => (
            <button
              type="button"
              key={label}
              onClick={() => setSelected(label)}
              className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-colors ${selected === label ? "border-[#6b4eff] bg-[#e8ddff]" : "border-[#2f1c4d]/15 hover:border-[#6b4eff]/50"}`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded border border-current text-xs">{selected === label ? <Check className="h-3 w-3" /> : i + 1}</span>
              {label}
            </button>
          ))}
        </div>
        <Button onClick={continueAssessment} className="mt-7 bg-[#6b4eff] text-white hover:bg-[#5438de]">Continue <ArrowRight /></Button>
      </div>
    </motion.div>
  );
}

function ColorPanel({ color, label, title, text, graphic }: { color: string; label: string; title: string; text: string; graphic: "discover" | "prioritize" | "prove" }) {
  return <article className={`${color} flex min-h-[520px] flex-col rounded-[34px] p-8 md:p-10`}><span className="text-sm font-semibold">{label}</span><PanelGraphic type={graphic} /><div className="mt-auto"><h3 className="text-4xl font-semibold leading-[1.04] tracking-[-.055em]">{title}</h3><p className="mt-5 leading-relaxed text-foreground/65">{text}</p></div></article>;
}

function PanelGraphic({ type }: { type: "discover" | "prioritize" | "prove" }) {
  if (type === "discover") {
    return <div className="my-10 flex h-32 items-center justify-center gap-3"><span className="h-14 w-14 rounded-full bg-white/70" /><span className="h-px w-8 bg-foreground/25" /><span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#6b4eff] text-xs font-semibold text-white">Workflows</span><span className="h-px w-8 bg-foreground/25" /><span className="grid gap-2"><i className="h-7 w-16 rounded-full bg-white/70" /><i className="h-7 w-20 rounded-full bg-white/70" /><i className="h-7 w-12 rounded-full bg-white/70" /></span></div>;
  }
  if (type === "prioritize") {
    return <div className="my-10 space-y-3 rounded-2xl bg-white/45 p-5">{[["Support automation", "92", "w-[92%]"], ["Invoice processing", "87", "w-[87%]"], ["Sales assistant", "74", "w-[74%]"]].map(([name, score, width]) => <div key={name}><div className="mb-1 flex justify-between text-xs font-semibold"><span>{name}</span><span>{score}</span></div><div className="h-2 rounded-full bg-white/70"><div className={`${width} h-2 rounded-full bg-[#2f1c4d]`} /></div></div>)}</div>;
  }
  return <div className="relative my-10 h-36 overflow-hidden rounded-2xl bg-white/45 p-5"><div className="absolute bottom-5 left-5 right-5 top-5 border-b border-l border-foreground/20" /><svg className="absolute inset-5" style={{ width: "calc(100% - 40px)", height: "calc(100% - 40px)" }} viewBox="0 0 240 100" preserveAspectRatio="none"><path d="M0 92 C45 88 62 72 92 70 C132 68 145 38 176 35 C205 32 216 10 240 8" fill="none" stroke="#2f1c4d" strokeWidth="4" /><circle cx="176" cy="35" r="5" fill="#6b4eff" /></svg><span className="absolute right-7 top-5 text-xs font-semibold">+380% ROI</span></div>;
}
