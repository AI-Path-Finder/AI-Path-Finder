export type CompanySize = "1-50" | "51-200" | "201-1000" | "1000+";

export type Complexity = "Low" | "Medium" | "High";
export type Currency = "EUR" | "GBP" | "USD" | "CHF";
export type ROIScenario = "conservative" | "base" | "optimistic";

export interface OnboardingData {
  industry: string;
  companySize: CompanySize;
  departments: string[];
  businessProcesses: string;
  repetitiveWorkflows: string[];
  manualOperationsHours: number;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  annualSavings: number;
  implementationComplexity: Complexity;
  deploymentTime: string;
  confidenceScore: number;
  automationPercent: number;
  difficultyScore: number;
  valueScore: number;
  quadrant: "quick-wins" | "strategic" | "secondary" | "avoid";
  dataAvailability: number;
  complianceRisk: "Low" | "Medium" | "High";
}

export interface ROIInputs {
  employeeCount: number;
  averageSalary: number;
  manualHoursPerWeek: number;
  automationPercent: number;
  softwareCost: number;
  integrationCost: number;
  trainingCost: number;
  annualMaintenanceCost: number;
  reviewPercent: number;
  currency: Currency;
  scenario: ROIScenario;
}

export interface ROIResults {
  annualSavings: number;
  implementationCost: number;
  annualMaintenanceCost: number;
  paybackMonths: number;
  roi12Month: number;
  value24Month: number;
  effectiveAutomationPercent: number;
  monthlyData: { month: string; savings: number; cost: number; net: number }[];
}

export interface Recommendation {
  opportunity: Opportunity;
  reasons: string[];
}

export interface AssessmentState {
  onboarding: Partial<OnboardingData>;
  opportunities: Opportunity[];
  selectedOpportunityId: string | null;
  roiInputs: Partial<ROIInputs>;
  recommendation: Recommendation | null;
}
