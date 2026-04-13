export interface FeatureLimit {
  id: number
  limitValue: number
}

export interface PlanFeature {
  id: number
  featureName: string
  isEnabled: boolean
  featureLimits: FeatureLimit[]
}

export type PlanStatus = 'Active' | 'Inactive'

export interface SubscriptionPlan {
  id: number
  name: string
  description: string
  price: number
  status: PlanStatus
  createdAt: string
  updatedAt: string
  planFeatures: PlanFeature[]
}

export type SubscriptionPlansResponse = SubscriptionPlan[]
export type GetSubscriptionPlanByIdResponse = SubscriptionPlan
export type CreateSubscriptionPlanResponse = SubscriptionPlan
export type UpdateSubscriptionPlanResponse = SubscriptionPlan

export type CreatePlanRequest = Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>
export type UpdatePlanRequest = Partial<CreatePlanRequest>
