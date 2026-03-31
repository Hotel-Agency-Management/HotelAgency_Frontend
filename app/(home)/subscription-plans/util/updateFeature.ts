import { PlanFeature } from "../types/plans";

export function updateFeature(
  features: PlanFeature[],
  id: string,
  patch: Partial<PlanFeature>,
): PlanFeature[] {
  return features.map(f => (f.id === id ? { ...f, ...patch } : f))
}
