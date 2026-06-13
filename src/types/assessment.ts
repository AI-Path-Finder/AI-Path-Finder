export type CompanySize = "1-50" | "51-200" | "201-1000" | "1000+";

export type Complexity = "Low" | "Medium" | "High";

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
  implementationCost: number;
}

export interface ROIResults {
  annualSavings: number;
  implementationCost: number;
  paybackMonths: number;
  roi12Month: number;
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
