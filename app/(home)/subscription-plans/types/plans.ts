import type { SubscriptionPlan as ConfigSubscriptionPlan } from '../configs/planConfig'

export const BILLING_CYCLE = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  CUSTOM: 'custom',
} as const

export type BillingCycle = (typeof BILLING_CYCLE)[keyof typeof BILLING_CYCLE]

export type {
  FeatureLimit,
  PlanFeature,
  PlanStatus,
  SubscriptionPlan,
} from '../configs/planConfig'

export type PlanFormValues = Omit<ConfigSubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>

export type { PageStatus } from '@/core/types/pageStatus'

export interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
}

export type PlanFormState = Omit<PlanFormValues, 'price'> & {
  price: number | ''
}
