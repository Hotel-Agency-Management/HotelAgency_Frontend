
import type { PageStatus } from "@/core/types/pageStatus"

export interface PlanFeature {
  id: string
  name: string
  enabled: boolean
  limit?: string
  description?: string
}


export const BILLING_CYCLE = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  CUSTOM: 'custom',
} as const

export type BillingCycle = (typeof BILLING_CYCLE)[keyof typeof BILLING_CYCLE]

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  billingCycle: BillingCycle
  customBillingLabel?: string
  isActive: boolean
  features: PlanFeature[]
  createdAt: string
  updatedAt: string
}


export type PlanFormValues = Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>


export type { PageStatus }

export interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
}
