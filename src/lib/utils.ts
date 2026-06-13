import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function complexityToScore(complexity: "Low" | "Medium" | "High"): number {
  switch (complexity) {
    case "Low":
      return 3;
    case "Medium":
      return 6;
    case "High":
      return 9;
  }
}

export function implementationCostForComplexity(
  complexity: "Low" | "Medium" | "High",
  companySize: string
): number {
  const sizeMultiplier =
    companySize === "1000+" ? 1.5 : companySize === "201-1000" ? 1.25 : 1;
  const base =
    complexity === "Low" ? 80000 : complexity === "Medium" ? 150000 : 280000;
  return Math.round(base * sizeMultiplier);
}
