import type { ROIInputs, ROIResults } from "@/types/assessment";

export function calculateROI(inputs: ROIInputs): ROIResults {
  const laborCostPerHour = inputs.averageSalary / 2080;
  const hoursSavedPerYear =
    inputs.employeeCount *
    inputs.manualHoursPerWeek *
    52 *
    (inputs.automationPercent / 100);
  const annualSavings = Math.round(hoursSavedPerYear * laborCostPerHour);
  const implementationCost = inputs.implementationCost;
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
    paybackMonths,
    roi12Month,
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
    averageSalary: 75000,
    manualHoursPerWeek: 12,
    automationPercent,
    implementationCost,
  };
}
