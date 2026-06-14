import type { ROIInputs, ROIResults, ROIScenario } from "@/types/assessment";

const SCENARIO_FACTORS: Record<ROIScenario, number> = {
  conservative: 0.72,
  base: 1,
  optimistic: 1.18,
};

export function calculateROI(inputs: ROIInputs, scenario: ROIScenario = inputs.scenario): ROIResults {
  const scenarioFactor = SCENARIO_FACTORS[scenario];
  const laborProcessShare = Math.min(1, inputs.manualHoursPerDay / 8);
  const annualLaborCost = inputs.employeeCount * inputs.averageSalary * laborProcessShare;
  const baselineAnnualCost = annualLaborCost + inputs.currentOperationalCost;
  const combinedEfficiency =
    inputs.automationPercent * 0.5 +
    inputs.manualWorkReductionPercent * 0.25 +
    inputs.productivityIncreasePercent * 0.15 +
    inputs.processAccelerationPercent * 0.1;
  const effectiveAutomationPercent = Math.min(
    92,
    combinedEfficiency * scenarioFactor * (1 - inputs.reviewPercent / 100)
  );
  const laborSavings = annualLaborCost * (effectiveAutomationPercent / 100);
  const operationalReductionRate = Math.min(
    0.65,
    ((inputs.errorReductionPercent * 0.65 + inputs.processAccelerationPercent * 0.35) / 100) *
      scenarioFactor
  );
  const operationalSavings = inputs.currentOperationalCost * operationalReductionRate;
  const annualGrossBenefit = laborSavings + operationalSavings;
  const annualRecurringCost =
    (inputs.monthlyApiCost +
      inputs.monthlyLicensingCost +
      inputs.monthlyMaintenanceCost +
      inputs.monthlyMonitoringCost +
      inputs.monthlySupportCost +
      inputs.monthlyOperationalMaintenanceCost) *
      12 +
    inputs.annualRetrainingCost;
  const annualSavings = Math.max(0, Math.round(annualGrossBenefit - annualRecurringCost));
  const implementationCost =
    inputs.developmentCost +
    inputs.consultingCost +
    inputs.infrastructureCost +
    inputs.softwareCost +
    inputs.integrationCost +
    inputs.trainingCost;
  const readinessAverage =
    inputs.dataQuality * 0.3 +
    inputs.processMaturity * 0.25 +
    inputs.adoptionReadiness * 0.25 +
    inputs.infrastructureReadiness * 0.2 +
    (inputs.tasksPerMonth >= 1000 ? 3 : inputs.tasksPerMonth >= 250 ? 1 : -3);
  const confidenceScore = Math.round(Math.min(96, Math.max(25, readinessAverage)));
  const operationalEfficiencyGain = Math.round(
    Math.min(95, (effectiveAutomationPercent + inputs.processAccelerationPercent * scenarioFactor) / 2)
  );
  const costReductionPercent =
    baselineAnnualCost > 0 ? Math.round((annualSavings / baselineAnnualCost) * 1000) / 10 : 0;
  const costAfterAI = Math.max(0, Math.round(baselineAnnualCost - annualGrossBenefit + annualRecurringCost));
  const monthlyBenefit = annualGrossBenefit / 12;
  const monthlyRecurringCost = annualRecurringCost / 12;
  const monthlyData = Array.from({ length: 24 }, (_, i) => {
    const month = i + 1;
    const cumulativeBenefit = Array.from({ length: month }, (_, rampIndex) =>
      monthlyBenefit * Math.min(1, 0.18 + (rampIndex + 1) * 0.14)
    ).reduce((total, benefit) => total + benefit, 0);
    return {
      month: `M${month}`,
      cumulativeBenefit: Math.round(cumulativeBenefit),
      cumulativeCost: Math.round(implementationCost + monthlyRecurringCost * month),
      net: Math.round(cumulativeBenefit - monthlyRecurringCost * month - implementationCost),
    };
  });
  const firstYearProfit = monthlyData[11].net;
  const breakEvenIndex = monthlyData.findIndex((month) => month.net >= 0);
  const paybackMonths = breakEvenIndex >= 0 ? breakEvenIndex + 1 : 0;
  const roi12Month =
    implementationCost > 0 ? Math.round((firstYearProfit / implementationCost) * 100) : 0;

  return {
    scenario,
    baselineAnnualCost: Math.round(baselineAnnualCost),
    annualGrossBenefit: Math.round(annualGrossBenefit),
    annualSavings,
    implementationCost,
    annualRecurringCost: Math.round(annualRecurringCost),
    netFirstYearSavings: firstYearProfit,
    firstYearProfit,
    paybackMonths,
    breakEvenMonth: breakEvenIndex >= 0 ? breakEvenIndex + 1 : null,
    roi12Month,
    value24Month: monthlyData[23].net,
    effectiveAutomationPercent: Math.round(effectiveAutomationPercent * 10) / 10,
    operationalEfficiencyGain,
    costReductionPercent,
    confidenceScore,
    costBeforeAI: Math.round(baselineAnnualCost),
    costAfterAI,
    monthlyData,
  };
}

export function calculateROIScenarios(inputs: ROIInputs): ROIResults[] {
  return (["conservative", "base", "optimistic"] as ROIScenario[]).map((scenario) =>
    calculateROI(inputs, scenario)
  );
}

export function defaultROIInputs(
  employeeCount: number,
  automationPercent: number,
  implementationCost: number
): ROIInputs {
  return {
    employeeCount,
    averageSalary: 48000,
    manualHoursPerDay: 2.5,
    tasksPerMonth: employeeCount * 180,
    currentOperationalCost: employeeCount * 3500,
    developmentCost: Math.round(implementationCost * 0.3),
    consultingCost: Math.round(implementationCost * 0.15),
    infrastructureCost: Math.round(implementationCost * 0.1),
    automationPercent,
    productivityIncreasePercent: Math.round(automationPercent * 0.55),
    manualWorkReductionPercent: Math.round(automationPercent * 0.8),
    errorReductionPercent: 40,
    processAccelerationPercent: 45,
    softwareCost: Math.round(implementationCost * 0.3),
    integrationCost: Math.round(implementationCost * 0.1),
    trainingCost: Math.round(implementationCost * 0.05),
    monthlyApiCost: Math.round(implementationCost * 0.012),
    monthlyLicensingCost: Math.round(implementationCost * 0.01),
    monthlyMaintenanceCost: Math.round(implementationCost * 0.008),
    monthlyMonitoringCost: Math.round(implementationCost * 0.004),
    annualRetrainingCost: Math.round(implementationCost * 0.08),
    monthlySupportCost: Math.round(implementationCost * 0.005),
    monthlyOperationalMaintenanceCost: Math.round(implementationCost * 0.004),
    reviewPercent: 15,
    dataQuality: 72,
    processMaturity: 70,
    adoptionReadiness: 65,
    infrastructureReadiness: 68,
    currency: "EUR",
    scenario: "base",
  };
}
