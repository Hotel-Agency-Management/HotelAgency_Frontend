import { BILLING_CYCLE, BillingCycle, PlanFeature, PlanFormValues } from "../types/plans"

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function makeEmptyFeature(): PlanFeature {
  return { id: generateId(), name: '', enabled: true }
}

export function makeEmptyForm(): PlanFormValues {
  return {
    name: '',
    description: '',
    price: 0,
    billingCycle: BILLING_CYCLE.MONTHLY,
    customBillingLabel: '',
    isActive: true,
    features: [makeEmptyFeature()],
  }
}

export function formatPrice(price: number, billingCycle: BillingCycle, customLabel?: string): string {
  if (billingCycle === BILLING_CYCLE.CUSTOM) return customLabel ?? 'Contact Sales'
  return `$${price} / ${billingCycle === BILLING_CYCLE.MONTHLY ? 'mo' : 'yr'}`
}

// ─── Validation ───────────────────────────────────────────────────────────────

export interface FormErrors {
  name?: string
  description?: string
  price?: string
  customBillingLabel?: string
  features?: Record<string, string>
}

export function validatePlanForm(values: PlanFormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Plan name is required'
  }
  if (!values.description.trim()) {
    errors.description = 'Description is required'
  }
  if (values.billingCycle !== BILLING_CYCLE.CUSTOM && values.price < 0) {
    errors.price = 'Price must be 0 or greater'
  }
  if (values.billingCycle === BILLING_CYCLE.CUSTOM && !values.customBillingLabel?.trim()) {
    errors.customBillingLabel = 'Billing label is required for custom plans'
  }

  const featureErrors: Record<string, string> = {}
  values.features.forEach(f => {
    if (!f.name.trim()) featureErrors[f.id] = 'Feature name is required'
  })
  if (Object.keys(featureErrors).length) errors.features = featureErrors

  return errors
}

export function hasErrors(errors: FormErrors): boolean {
  if (errors.name || errors.description || errors.price || errors.customBillingLabel) return true
  if (errors.features && Object.keys(errors.features).length) return true
  return false
}
