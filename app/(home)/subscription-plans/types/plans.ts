import type { PageStatus } from '@/core/types/pageStatus'
import type { SubscriptionPlan as ConfigSubscriptionPlan } from '../configs/planConfig'

export type {
  FeatureLimit,
  PlanFeature,
  PlanStatus,
  SubscriptionPlan,
} from '../configs/planConfig'

export type PlanFormValues = Omit<ConfigSubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>


export type { PageStatus }

export interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
}

export type PlanFormState = Omit<PlanFormValues, 'price'> & {
  price: number | ''
}
