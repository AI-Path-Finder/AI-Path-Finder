"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useAssessment } from "@/context/assessment-provider";
import { StepIndicator } from "@/components/nav";
import type { CompanySize, OnboardingData } from "@/types/assessment";
import { cn } from "@/lib/utils";

const INDUSTRIES = [
  "Technology",
  "Financial Services",
  "Healthcare",
  "Retail",
  "Manufacturing",
  "Professional Services",
  "Other",
];

const COMPANY_SIZES: { value: CompanySize; label: string }[] = [
  { value: "1-50", label: "1–50" },
  { value: "51-200", label: "51–200" },
  { value: "201-1000", label: "201–1,000" },
  { value: "1000+", label: "1,000+" },
];

const DEPARTMENTS = [
  "Customer Support",
  "Sales",
  "Operations",
  "HR",
  "Finance",
  "IT",
  "Marketing",
  "Legal",
];

const WORKFLOW_SUGGESTIONS = [
  "Invoice processing",
  "Customer ticket routing",
  "Document review",
  "Lead qualification",
  "Employee onboarding",
  "Report generation",
  "Data entry",
  "Compliance checks",
];

const stepSchemas = [
  z.object({ industry: z.string().min(1) }),
  z.object({ companySize: z.enum(["1-50", "51-200", "201-1000", "1000+"]) }),
  z.object({ departments: z.array(z.string()).min(1) }),
  z.object({ businessProcesses: z.string().min(10) }),
  z.object({ repetitiveWorkflows: z.array(z.string()).min(1) }),
  z.object({ manualOperationsHours: z.number().min(1).max(168) }),
];

const STEP_TITLES = [
  "What industry is your company in?",
  "How large is your organization?",
  "Which departments should we focus on?",
  "Describe your core business processes",
  "What repetitive workflows slow your team down?",
  "How much time goes into manual operations?",
];

const STEP_SUBTITLES = [
  "This helps us tailor AI opportunities to your sector.",
  "Company size affects implementation scope and ROI.",
  "Select all departments where AI could create impact.",
  "Tell us about the workflows that drive your business.",
  "Pick common workflows or add your own.",
  "Estimate weekly hours spent on manual, repetitive tasks.",
];

export function OnboardingWizard() {
  const router = useRouter();
  const { onboarding, setOnboarding, completeOnboarding } = useAssessment();
  const [step, setStep] = useState(0);
  const [customWorkflow, setCustomWorkflow] = useState("");
  const totalSteps = stepSchemas.length + 1;

  useEffect(() => {
    const shouldContinue = new URLSearchParams(window.location.search).get("continue");
    if (shouldContinue === "industry" && onboarding.industry) {
      setStep(1);
    }
  }, [onboarding.industry]);

  const data: Partial<OnboardingData> = {
    industry: onboarding.industry ?? "",
    companySize: onboarding.companySize,
    departments: onboarding.departments ?? [],
    businessProcesses: onboarding.businessProcesses ?? "",
    repetitiveWorkflows: onboarding.repetitiveWorkflows ?? [],
    manualOperationsHours: onboarding.manualOperationsHours ?? 20,
  };

  const progress = ((step + 1) / totalSteps) * 100;

  const canContinue = () => {
    if (step >= stepSchemas.length) return true;
    return stepSchemas[step].safeParse(data).success;
  };

  const goNext = () => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      completeOnboarding(data as OnboardingData);
      router.push("/analysis");
    }
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        document.activeElement?.tagName !== "TEXTAREA" &&
        canContinue()
      ) {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const toggleDepartment = (dept: string) => {
    const current = data.departments ?? [];
    setOnboarding({
      departments: current.includes(dept)
        ? current.filter((d) => d !== dept)
        : [...current, dept],
    });
  };

  const toggleWorkflow = (wf: string) => {
    const current = data.repetitiveWorkflows ?? [];
    setOnboarding({
      repetitiveWorkflows: current.includes(wf)
        ? current.filter((w) => w !== wf)
        : [...current, wf],
    });
  };

  const addCustomWorkflow = () => {
    if (!customWorkflow.trim()) return;
    const current = data.repetitiveWorkflows ?? [];
    if (!current.includes(customWorkflow.trim())) {
      setOnboarding({
        repetitiveWorkflows: [...current, customWorkflow.trim()],
      });
    }
    setCustomWorkflow("");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 pb-10 pt-24 md:px-10 md:pt-28">
      <div className="mb-8">
        <Progress value={progress} className="mb-5 h-1 rounded-full" />
        <StepIndicator
          current={step + 1}
          total={totalSteps}
          label="Discovery"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-1 flex-col justify-center pb-10"
        >
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#6b4eff]">
            <span>{String(step + 1).padStart(2, "0")}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
          <h1 className="mb-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.055em] md:text-6xl">
            {step < STEP_TITLES.length
              ? STEP_TITLES[step]
              : "Ready to analyze your organization?"}
          </h1>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {step < STEP_SUBTITLES.length
              ? STEP_SUBTITLES[step]
              : "Review your inputs and launch the AI opportunity analysis."}
          </p>

          {step === 0 && (
            <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
              {INDUSTRIES.map((ind) => (
                <OptionButton
                  key={ind}
                  selected={data.industry === ind}
                  onClick={() => setOnboarding({ industry: ind })}
                >
                  {ind}
                </OptionButton>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid max-w-2xl grid-cols-2 gap-3">
              {COMPANY_SIZES.map((size) => (
                <OptionButton
                  key={size.value}
                  selected={data.companySize === size.value}
                  onClick={() => setOnboarding({ companySize: size.value })}
                >
                  <span className="text-lg">{size.label} employees</span>
                </OptionButton>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
              {DEPARTMENTS.map((dept) => (
                <OptionChip
                  key={dept}
                  selected={(data.departments ?? []).includes(dept)}
                  onClick={() => toggleDepartment(dept)}
                >
                  {dept}
                </OptionChip>
              ))}
            </div>
          )}

          {step === 3 && (
            <Textarea
              placeholder="e.g. We process 500+ customer support tickets daily, manually route invoices through three approval stages, and generate weekly reports from multiple data sources..."
              value={data.businessProcesses}
              onChange={(e) =>
                setOnboarding({ businessProcesses: e.target.value })
              }
              className="min-h-[220px] text-2xl"
            />
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
                {WORKFLOW_SUGGESTIONS.map((wf) => (
                  <OptionChip
                    key={wf}
                    selected={(data.repetitiveWorkflows ?? []).includes(wf)}
                    onClick={() => toggleWorkflow(wf)}
                  >
                    {wf}
                  </OptionChip>
                ))}
              </div>
              <div className="flex max-w-2xl gap-4">
                <Input
                  placeholder="Add custom workflow..."
                  value={customWorkflow}
                  onChange={(e) => setCustomWorkflow(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCustomWorkflow()}
                />
                <Button variant="secondary" onClick={addCustomWorkflow}>
                  Add
                </Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-7xl font-semibold tracking-[-0.06em]">
                  {data.manualOperationsHours}
                </span>
                <span className="ml-2 text-xl text-muted-foreground">
                  hours / week
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={80}
                value={data.manualOperationsHours}
                onChange={(e) =>
                  setOnboarding({
                    manualOperationsHours: Number(e.target.value),
                  })
                }
                className="w-full accent-foreground"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Minimal</span>
                <span>Significant manual load</span>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="max-w-2xl divide-y divide-border border-y border-border">
              <ReviewRow label="Industry" value={data.industry} />
              <ReviewRow label="Company size" value={data.companySize} />
              <ReviewRow
                label="Departments"
                value={(data.departments ?? []).join(", ")}
              />
              <ReviewRow
                label="Workflows"
                value={(data.repetitiveWorkflows ?? []).join(", ")}
              />
              <ReviewRow
                label="Manual hours/week"
                value={String(data.manualOperationsHours)}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between pt-5">
        <Button
          variant="ghost"
          onClick={goBack}
          disabled={step === 0}
          className={cn(step === 0 && "invisible")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          variant="gradient"
          onClick={goNext}
          disabled={!canContinue()}
          size="lg"
        >
          {step === totalSteps - 1 ? (
            <>
              Launch Analysis
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
        <span className="hidden text-xs text-muted-foreground sm:block">
          Press Enter ↵
        </span>
      </div>
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-16 items-center rounded-lg border-2 px-4 py-3 text-left transition-all",
        selected
          ? "border-[#6b4eff] bg-[#e8ddff] text-foreground"
          : "border-border bg-white/60 text-foreground hover:border-[#6b4eff]/50"
      )}
    >
      {children}
    </button>
  );
}

function OptionChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-14 items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-base transition-all",
        selected
          ? "border-[#6b4eff] bg-[#e8ddff] text-foreground"
          : "border-border bg-white/60 text-foreground hover:border-[#6b4eff]/50"
      )}
    >
      <span className="flex h-5 w-5 items-center justify-center border border-current text-[10px]">
        {selected && <Check className="h-3 w-3" />}
      </span>
      {children}
    </button>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[180px_1fr]">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right">
        {value ?? "Not provided"}
      </span>
    </div>
  );
}

