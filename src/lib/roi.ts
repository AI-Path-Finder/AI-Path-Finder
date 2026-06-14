import type { ROIInputs, ROIResults } from "@/types/assessment";

export function calculateROI(inputs: ROIInputs): ROIResults {
  const scenarioFactor =
    inputs.scenario === "conservative" ? 0.8 : inputs.scenario === "optimistic" ? 1.15 : 1;
  const laborCostPerHour = inputs.averageSalary / (40 * 52);
  const effectiveAutomationPercent =
    inputs.automationPercent * scenarioFactor * (1 - inputs.reviewPercent / 100);
  const hoursSavedPerYear =
    inputs.employeeCount *
    inputs.manualHoursPerWeek *
    52 *
    (effectiveAutomationPercent / 100);
  const grossSavings = hoursSavedPerYear * laborCostPerHour;
  const annualSavings = Math.max(0, Math.round(grossSavings - inputs.annualMaintenanceCost));
  const implementationCost = inputs.softwareCost + inputs.integrationCost + inputs.trainingCost;
  const paybackMonths =
    annualSavings > 0
      ? Math.round((implementationCost / annualSavings) * 12 * 10) / 10
      : 0;
  const roi12Month =
    implementationCost > 0
      ? Math.round(
          ((annualSavings - implementationCost) / implementationCost) * 100
        )
      : 0;

  let cumulativeSavings = 0;
  const monthlyData = Array.from({ length: 24 }, (_, i) => {
    const month = i + 1;
    const monthlySavings = annualSavings / 12;
    cumulativeSavings += monthlySavings;
    const cost = month === 1 ? implementationCost : 0;
    return {
      month: `M${month}`,
      savings: Math.round(cumulativeSavings),
      cost: month === 1 ? implementationCost : 0,
      net: Math.round(cumulativeSavings - (month >= 1 ? implementationCost : 0)),
    };
  });

  return {
    annualSavings,
    implementationCost,
    annualMaintenanceCost: inputs.annualMaintenanceCost,
    paybackMonths,
    roi12Month,
    value24Month: Math.round(annualSavings * 2 - implementationCost),
    effectiveAutomationPercent: Math.round(effectiveAutomationPercent * 10) / 10,
    monthlyData,
  };
}

export function defaultROIInputs(
  employeeCount: number,
  automationPercent: number,
  implementationCost: number
): ROIInputs {
  return {
    employeeCount,
    averageSalary: 48000,
    manualHoursPerWeek: 12,
    automationPercent,
    softwareCost: Math.round(implementationCost * 0.3),
    integrationCost: Math.round(implementationCost * 0.5),
    trainingCost: Math.round(implementationCost * 0.2),
    annualMaintenanceCost: Math.round(implementationCost * 0.18),
    reviewPercent: 15,
    currency: "EUR",
    scenario: "base",
  };
}
