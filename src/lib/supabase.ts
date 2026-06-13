import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export async function saveAssessment(data: {
  onboarding: unknown;
  opportunities: unknown;
  topRecommendationId: string;
}) {
  if (!supabase) return null;

  const { data: result, error } = await supabase
    .from("assessments")
    .insert({
      onboarding: data.onboarding,
      opportunities: data.opportunities,
      top_recommendation_id: data.topRecommendationId,
    })
    .select()
    .single();

  if (error) {
    console.warn("Supabase save failed:", error.message);
    return null;
  }

  return result;
}
