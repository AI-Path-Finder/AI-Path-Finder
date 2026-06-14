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
import { calculateROI, estimateOpportunityAnnualSavings, opportunityROIInputs } from "@/lib/roi";

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
  const onboarding =
      stored.onboarding && typeof stored.onboarding === "object"
        ? stored.onboarding
        : {};
  const opportunities = Array.isArray(stored.opportunities)
    ? stored.opportunities.map((opportunity) => ({
        ...opportunity,
        annualSavings: estimateOpportunityAnnualSavings(opportunity, onboarding),
      }))
    : [];
  return {
    onboarding,
    opportunities,
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
  generateRecommendation: (inputs?: ROIInputs) => void;
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
    setState((prev) => ({
      ...prev,
      selectedOpportunityId: id,
      roiInputs: prev.selectedOpportunityId === id ? prev.roiInputs : {},
    }));
  }, []);

  const setROIInputs = useCallback((inputs: Partial<ROIInputs>) => {
    setState((prev) => ({
      ...prev,
      roiInputs: { ...prev.roiInputs, ...inputs },
    }));
  }, []);

  const generateRecommendation = useCallback((inputs?: ROIInputs) => {
    setState((prev) => {
      if (prev.opportunities.length === 0) return prev;
      const top =
        prev.opportunities.find((opportunity) => opportunity.id === prev.selectedOpportunityId) ??
        getTopRecommendation(prev.opportunities);
      const financialInputs = inputs ?? prev.roiInputs;
      const roiSnapshot = Object.keys(financialInputs).length > 0
        ? calculateROI(financialInputs as ROIInputs)
        : undefined;
      const recommendation: Recommendation = {
        opportunity: top,
        reasons: buildRecommendationReasons(top, roiSnapshot),
        roiSnapshot,
        currency: (financialInputs as Partial<ROIInputs>).currency,
      };
      return {
        ...prev,
        selectedOpportunityId: top.id,
        recommendation,
        roiInputs:
          Object.keys(financialInputs).length > 0
            ? financialInputs
            : opportunityROIInputs(top, prev.onboarding),
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
