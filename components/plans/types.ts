
export interface PlanFeature {
  id: string
  name: string
  enabled: boolean
  limit?: string
  description?: string
}


export type BillingCycle = 'monthly' | 'yearly' | 'custom'

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


export type PageStatus = 'idle' | 'loading' | 'error'

export interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
}
