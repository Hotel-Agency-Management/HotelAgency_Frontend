import { PlanFeature } from "../configs/planConfig"
import { PlanFormValues } from "../types/plans"

let temporaryId = 0

export function generateId(): number {
  temporaryId -= 1
  return temporaryId
}

export function makeEmptyFeature(): PlanFeature {
  return {
    id: generateId(),
    featureName: '',
    isEnabled: true,
    featureLimits: [],
  }
}

export function makeEmptyForm(): PlanFormValues {
  return {
    name: '',
    description: '',
    price: 0,
    status: 'Active',
    planFeatures: [makeEmptyFeature()],
  }
}

export function formatPrice(price: number): string {
  return `$${price}`
}

// ─── Validation ───────────────────────────────────────────────────────────────

export interface FormErrors {
  name?: string
  description?: string
  price?: string
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
  if (values.price < 0) {
    errors.price = 'Price must be 0 or greater'
  }

  const featureErrors: Record<string, string> = {}
  values.planFeatures.forEach(feature => {
    if (!feature.featureName.trim()) {
      featureErrors[feature.id] = 'Feature name is required'
      return
    }

    const hasInvalidLimit = feature.featureLimits.some(
      limit => !Number.isFinite(limit.limitValue) || limit.limitValue < 0
    )

    if (hasInvalidLimit) {
      featureErrors[feature.id] = 'Limit must be a valid number'
    }
  })
  if (Object.keys(featureErrors).length) errors.features = featureErrors

  return errors
}

export function hasErrors(errors: FormErrors): boolean {
  if (errors.name || errors.description || errors.price) return true
  if (errors.features && Object.keys(errors.features).length) return true
  return false
}
