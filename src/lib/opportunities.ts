import type { OnboardingData, Opportunity, ROIResults } from "@/types/assessment";
import { complexityToScore } from "@/lib/utils";
import { estimateOpportunityAnnualSavings } from "@/lib/roi";

const DEPARTMENT_OPPORTUNITIES: Record<
  string,
  Partial<Opportunity>[]
> = {
  "Customer Support": [
    {
      id: "customer-support",
      title: "Customer Support Automation",
      description:
        "AI-powered ticket routing, response drafting, and sentiment analysis to reduce handle time.",
      implementationComplexity: "Medium",
      deploymentTime: "8-12 weeks",
      confidenceScore: 92,
      automationPercent: 65,
      dataAvailability: 88,
      complianceRisk: "Low",
    },
  ],
  Sales: [
    {
      id: "sales-assistant",
      title: "AI Sales Assistant",
      description:
        "Automated lead scoring, personalized outreach, and CRM enrichment for your sales team.",
      implementationComplexity: "Medium",
      deploymentTime: "10-14 weeks",
      confidenceScore: 85,
      automationPercent: 45,
      dataAvailability: 82,
      complianceRisk: "Low",
    },
  ],
  Operations: [
    {
      id: "document-processing",
      title: "Document Processing Automation",
      description:
        "Extract, classify, and route documents automatically with intelligent OCR and NLP.",
      implementationComplexity: "Low",
      deploymentTime: "6-8 weeks",
      confidenceScore: 94,
      automationPercent: 78,
      dataAvailability: 90,
      complianceRisk: "Medium",
    },
  ],
  HR: [
    {
      id: "knowledge-assistant",
      title: "Internal Knowledge Assistant",
      description:
        "Enterprise search and Q&A across policies, docs, and tribal knowledge.",
      implementationComplexity: "Low",
      deploymentTime: "4-6 weeks",
      confidenceScore: 88,
      automationPercent: 55,
      dataAvailability: 75,
      complianceRisk: "Low",
    },
  ],
  Finance: [
    {
      id: "invoice-automation",
      title: "Invoice & Expense Automation",
      description:
        "Automated invoice matching, expense categorization, and anomaly detection.",
      implementationComplexity: "High",
      deploymentTime: "14-18 weeks",
      confidenceScore: 78,
      automationPercent: 70,
      dataAvailability: 85,
      complianceRisk: "High",
    },
  ],
  IT: [
    {
      id: "it-helpdesk",
      title: "IT Helpdesk Automation",
      description:
        "Self-service resolution, ticket triage, and automated runbook execution.",
      implementationComplexity: "Medium",
      deploymentTime: "8-10 weeks",
      confidenceScore: 86,
      automationPercent: 60,
      dataAvailability: 80,
      complianceRisk: "Low",
    },
  ],
  Marketing: [
    {
      id: "marketing-content",
      title: "Marketing Content Operations",
      description: "AI-assisted campaign production, localization, and performance optimization.",
      implementationComplexity: "Low",
      deploymentTime: "4-8 weeks",
      confidenceScore: 81,
      automationPercent: 42,
      dataAvailability: 72,
      complianceRisk: "Medium",
    },
  ],
  Legal: [
    {
      id: "contract-review",
      title: "Contract Review Copilot",
      description: "Clause extraction, risk flagging, and first-pass contract review with human oversight.",
      implementationComplexity: "High",
      deploymentTime: "16-22 weeks",
      confidenceScore: 73,
      automationPercent: 35,
      dataAvailability: 66,
      complianceRisk: "High",
    },
  ],
};

const BASE_OPPORTUNITIES: Partial<Opportunity>[] = [
  {
    id: "customer-support",
    title: "Customer Support Automation",
    description:
      "AI-powered ticket routing, response drafting, and sentiment analysis.",
    implementationComplexity: "Medium",
    deploymentTime: "8-12 weeks",
    confidenceScore: 90,
    automationPercent: 65,
    dataAvailability: 88,
    complianceRisk: "Low",
  },
  {
    id: "document-processing",
    title: "Document Processing Automation",
    description: "Intelligent document extraction, classification, and routing.",
    implementationComplexity: "Low",
    deploymentTime: "6-8 weeks",
    confidenceScore: 93,
    automationPercent: 78,
    dataAvailability: 90,
    complianceRisk: "Medium",
  },
  {
    id: "sales-assistant",
    title: "AI Sales Assistant",
    description: "Lead scoring, outreach personalization, and pipeline insights.",
    implementationComplexity: "Medium",
    deploymentTime: "10-14 weeks",
    confidenceScore: 84,
    automationPercent: 45,
    dataAvailability: 82,
    complianceRisk: "Low",
  },
  {
    id: "knowledge-assistant",
    title: "Internal Knowledge Assistant",
    description: "Enterprise Q&A across policies, docs, and internal knowledge.",
    implementationComplexity: "Low",
    deploymentTime: "4-6 weeks",
    confidenceScore: 87,
    automationPercent: 55,
    dataAvailability: 75,
    complianceRisk: "Low",
  },
];

function assignQuadrant(
  difficultyScore: number,
  valueScore: number
): Opportunity["quadrant"] {
  if (valueScore >= 6 && difficultyScore <= 5) return "quick-wins";
  if (valueScore >= 6 && difficultyScore > 5) return "strategic";
  if (valueScore < 6 && difficultyScore <= 5) return "secondary";
  return "avoid";
}

function buildOpportunity(
  partial: Partial<Opportunity>,
  data: OnboardingData
): Opportunity {
  const complexity = partial.implementationComplexity ?? "Medium";
  const automationPercent = partial.automationPercent ?? 50;
  const annualSavings = estimateOpportunityAnnualSavings(
    {
      automationPercent,
      implementationComplexity: complexity,
      dataAvailability: partial.dataAvailability ?? 80,
      confidenceScore: partial.confidenceScore ?? 80,
    },
    data
  );
  const baseDifficulty = complexityToScore(complexity);
  const riskAdjustment = partial.complianceRisk === "High" ? 1.4 : partial.complianceRisk === "Medium" ? 0.7 : 0;
  const dataAdjustment = (100 - (partial.dataAvailability ?? 80)) / 35;
  const difficultyScore = Math.min(9.4, Math.max(1.4, baseDifficulty + riskAdjustment + dataAdjustment));
  const savingsScore = Math.min(10, Math.log10(Math.max(annualSavings, 10000) / 10000) * 3.2);
  const confidenceScore = ((partial.confidenceScore ?? 80) / 100) * 2.2;
  const automationScore = (automationPercent / 100) * 2;
  const valueScore = Math.min(9.4, Math.max(2.2, savingsScore + confidenceScore + automationScore - 1.5));

  return {
    id: partial.id!,
    title: partial.title!,
    description: partial.description!,
    annualSavings,
    implementationComplexity: complexity,
    deploymentTime: partial.deploymentTime ?? "8-12 weeks",
    confidenceScore: partial.confidenceScore ?? 80,
    automationPercent,
    difficultyScore,
    valueScore,
    quadrant: assignQuadrant(difficultyScore, valueScore),
    dataAvailability: partial.dataAvailability ?? 80,
    complianceRisk: partial.complianceRisk ?? "Low",
  };
}

export function generateOpportunities(data: OnboardingData): Opportunity[] {
  const seen = new Set<string>();
  const partials: Partial<Opportunity>[] = [];

  for (const dept of data.departments) {
    const deptOpps = DEPARTMENT_OPPORTUNITIES[dept];
    if (deptOpps) {
      for (const opp of deptOpps) {
        if (!seen.has(opp.id!)) {
          seen.add(opp.id!);
          partials.push(opp);
        }
      }
    }
  }

  for (const base of BASE_OPPORTUNITIES) {
    if (!seen.has(base.id!)) {
      seen.add(base.id!);
      partials.push(base);
    }
  }

  return partials
    .map((partial) => buildOpportunity(partial, data))
    .sort((a, b) => b.annualSavings - a.annualSavings)
    ;
}

export function getTopRecommendation(
  opportunities: Opportunity[]
): Opportunity {
  const scored = [...opportunities].sort((a, b) => {
    const scoreA =
      a.valueScore * 0.4 +
      (10 - a.difficultyScore) * 0.3 +
      a.confidenceScore * 0.002 +
      a.dataAvailability * 0.001;
    const scoreB =
      b.valueScore * 0.4 +
      (10 - b.difficultyScore) * 0.3 +
      b.confidenceScore * 0.002 +
      b.dataAvailability * 0.001;
    return scoreB - scoreA;
  });
  return scored[0];
}

export function buildRecommendationReasons(
  opportunity: Opportunity,
  roi?: ROIResults
): string[] {
  const reasons: string[] = [];

  if (roi && roi.roi12Month >= 0) {
    reasons.push("Financial model confirms a positive first-year return");
  } else if (roi) {
    reasons.push("The investment case requires further cost or benefit validation");
  } else if (opportunity.annualSavings >= 200000) {
    reasons.push("Strong projected financial impact among evaluated initiatives");
  } else {
    reasons.push("Strong return on investment relative to implementation cost");
  }

  if (opportunity.implementationComplexity === "Low") {
    reasons.push("Low implementation complexity enables fast time-to-value");
  } else if (opportunity.implementationComplexity === "Medium") {
    reasons.push("Balanced implementation complexity with manageable risk");
  }

  if (opportunity.dataAvailability >= 80) {
    reasons.push("Strong data availability supports reliable AI performance");
  }

  if (opportunity.complianceRisk === "Low") {
    reasons.push("Low compliance risk simplifies deployment and governance");
  }

  return reasons.slice(0, 4);
}
