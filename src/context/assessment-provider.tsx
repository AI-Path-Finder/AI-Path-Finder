"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AssessmentState,
  OnboardingData,
  Opportunity,
  Recommendation,
  ROIInputs,
} from "@/types/assessment";
import {
  buildRecommendationReasons,
  generateOpportunities,
  getTopRecommendation,
} from "@/lib/opportunities";
import { defaultROIInputs } from "@/lib/roi";
import { implementationCostForComplexity } from "@/lib/utils";

const STORAGE_KEY = "adopt-ai-assessment";
const LEGACY_STORAGE_KEY = "orion-ai-assessment";

const initialState: AssessmentState = {
  onboarding: {},
  opportunities: [],
  selectedOpportunityId: null,
  roiInputs: {},
  recommendation: null,
};

function normalizeStoredState(value: unknown): AssessmentState {
  if (!value || typeof value !== "object") return initialState;
  const stored = value as Partial<AssessmentState>;

  const roiInputs = stored.roiInputs && typeof stored.roiInputs === "object" ? stored.roiInputs : {};
  const normalizedROI =
    "softwareCost" in roiInputs
      ? roiInputs
      : {};
  return {
    onboarding:
      stored.onboarding && typeof stored.onboarding === "object"
        ? stored.onboarding
        : {},
    opportunities: Array.isArray(stored.opportunities)
      ? stored.opportunities
      : [],
    selectedOpportunityId:
      typeof stored.selectedOpportunityId === "string"
        ? stored.selectedOpportunityId
        : null,
    roiInputs: normalizedROI,
    recommendation:
      stored.recommendation && typeof stored.recommendation === "object"
        ? stored.recommendation
        : null,
  };
}

interface AssessmentContextValue extends AssessmentState {
  setOnboarding: (data: Partial<OnboardingData>) => void;
  completeOnboarding: (data: OnboardingData) => void;
  setSelectedOpportunity: (id: string) => void;
  setROIInputs: (inputs: Partial<ROIInputs>) => void;
  generateRecommendation: () => void;
  resetAssessment: () => void;
  getSelectedOpportunity: () => Opportunity | undefined;
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY) ??
        localStorage.getItem(LEGACY_STORAGE_KEY);
      if (stored) {
        setState(normalizeStoredState(JSON.parse(stored)));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const setOnboarding = useCallback((data: Partial<OnboardingData>) => {
    setState((prev) => ({
      ...prev,
      onboarding: { ...prev.onboarding, ...data },
    }));
  }, []);

  const completeOnboarding = useCallback((data: OnboardingData) => {
    const opportunities = generateOpportunities(data);
    setState((prev) => ({
      ...prev,
      onboarding: data,
      opportunities,
      selectedOpportunityId: opportunities[0]?.id ?? null,
    }));
  }, []);

  const setSelectedOpportunity = useCallback((id: string) => {
    setState((prev) => ({ ...prev, selectedOpportunityId: id }));
  }, []);

  const setROIInputs = useCallback((inputs: Partial<ROIInputs>) => {
    setState((prev) => ({
      ...prev,
      roiInputs: { ...prev.roiInputs, ...inputs },
    }));
  }, []);

  const generateRecommendation = useCallback(() => {
    setState((prev) => {
      if (prev.opportunities.length === 0) return prev;
      const top = getTopRecommendation(prev.opportunities);
      const recommendation: Recommendation = {
        opportunity: top,
        reasons: buildRecommendationReasons(top),
      };
      return {
        ...prev,
        selectedOpportunityId: top.id,
        recommendation,
        roiInputs:
          Object.keys(prev.roiInputs).length > 0
            ? prev.roiInputs
            : defaultROIInputs(
                prev.onboarding.companySize === "1000+"
                  ? 200
                  : prev.onboarding.companySize === "201-1000"
                    ? 80
                    : prev.onboarding.companySize === "51-200"
                      ? 25
                      : 10,
                top.automationPercent,
                implementationCostForComplexity(
                  top.implementationComplexity,
                  prev.onboarding.companySize ?? "51-200"
                )
              ),
      };
    });
  }, []);

  const resetAssessment = useCallback(() => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }, []);

  const getSelectedOpportunity = useCallback(() => {
    return state.opportunities.find(
      (o) => o.id === state.selectedOpportunityId
    );
  }, [state.opportunities, state.selectedOpportunityId]);

  const value = useMemo(
    () => ({
      ...state,
      setOnboarding,
      completeOnboarding,
      setSelectedOpportunity,
      setROIInputs,
      generateRecommendation,
      resetAssessment,
      getSelectedOpportunity,
    }),
    [
      state,
      setOnboarding,
      completeOnboarding,
      setSelectedOpportunity,
      setROIInputs,
      generateRecommendation,
      resetAssessment,
      getSelectedOpportunity,
    ]
  );

  if (!hydrated) return null;

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) {
    throw new Error("useAssessment must be used within AssessmentProvider");
  }
  return ctx;
}
