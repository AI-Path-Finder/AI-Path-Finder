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
  manualHoursPerDay: number;
  tasksPerMonth: number;
  currentOperationalCost: number;
  developmentCost: number;
  consultingCost: number;
  infrastructureCost: number;
  automationPercent: number;
  productivityIncreasePercent: number;
  manualWorkReductionPercent: number;
  errorReductionPercent: number;
  processAccelerationPercent: number;
  softwareCost: number;
  integrationCost: number;
  trainingCost: number;
  monthlyApiCost: number;
  monthlyLicensingCost: number;
  monthlyMaintenanceCost: number;
  monthlyMonitoringCost: number;
  annualRetrainingCost: number;
  monthlySupportCost: number;
  monthlyOperationalMaintenanceCost: number;
  reviewPercent: number;
  dataQuality: number;
  processMaturity: number;
  adoptionReadiness: number;
  infrastructureReadiness: number;
  currency: Currency;
  scenario: ROIScenario;
}

export interface ROIResults {
  scenario: ROIScenario;
  baselineAnnualCost: number;
  annualGrossBenefit: number;
  annualSavings: number;
  implementationCost: number;
  annualRecurringCost: number;
  netFirstYearSavings: number;
  firstYearProfit: number;
  paybackMonths: number;
  breakEvenMonth: number | null;
  roi12Month: number;
  value24Month: number;
  effectiveAutomationPercent: number;
  operationalEfficiencyGain: number;
  costReductionPercent: number;
  confidenceScore: number;
  costBeforeAI: number;
  costAfterAI: number;
  monthlyData: { month: string; cumulativeBenefit: number; cumulativeCost: number; net: number }[];
}

export interface Recommendation {
  opportunity: Opportunity;
  reasons: string[];
  roiSnapshot?: ROIResults;
  currency?: Currency;
}

export interface AssessmentState {
  onboarding: Partial<OnboardingData>;
  opportunities: Opportunity[];
  selectedOpportunityId: string | null;
  roiInputs: Partial<ROIInputs>;
  recommendation: Recommendation | null;
}
