import type { SubscriptionPlan } from "@/app/(home)/subscription-plans/types/plans"

export const BILLING_CYCLE_LABELS: Record<string, string> = {
  monthly: 'per month',
  yearly: 'per year',
  custom: 'custom',
}

export const MOCK_PLANS: SubscriptionPlan[] = [
  {
    id: 1,
    name: 'Basic',
    description: 'Essential tools for small independent hotels getting started.',
    price: 29,
    status: 'Active',
    createdAt: '2024-09-01T10:00:00Z',
    updatedAt: '2024-11-01T10:00:00Z',
    planFeatures: [
      { id: 1, featureName: 'Room Management', isEnabled: true, featureLimits: [{ id: 1, limitValue: 20 }] },
      { id: 2, featureName: 'Booking Engine', isEnabled: true, featureLimits: [] },
      { id: 3, featureName: 'Analytics Dashboard', isEnabled: false, featureLimits: [] },
      { id: 4, featureName: 'Multi-Property Support', isEnabled: false, featureLimits: [] },
      { id: 5, featureName: 'API Access', isEnabled: false, featureLimits: [] },
    ],
  },
  {
    id: 2,
    name: 'Pro',
    description: 'Advanced features for growing hotels and boutique chains.',
    price: 79,
    status: 'Active',
    createdAt: '2024-09-01T10:00:00Z',
    updatedAt: '2024-11-15T10:00:00Z',
    planFeatures: [
      { id: 1, featureName: 'Room Management', isEnabled: true, featureLimits: [{ id: 2, limitValue: 100 }] },
      { id: 2, featureName: 'Booking Engine', isEnabled: true, featureLimits: [] },
      { id: 3, featureName: 'Analytics Dashboard', isEnabled: true, featureLimits: [] },
      { id: 4, featureName: 'Multi-Property Support', isEnabled: true, featureLimits: [{ id: 3, limitValue: 3 }] },
      { id: 5, featureName: 'API Access', isEnabled: false, featureLimits: [] },
    ],
  },
  {
    id: 3,
    name: 'Enterprise',
    description: 'Full-suite solution for large hotel groups and chains.',
    price: 0,
    status: 'Active',
    createdAt: '2024-09-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
    planFeatures: [
      { id: 1, featureName: 'Room Management', isEnabled: true, featureLimits: [] },
      { id: 2, featureName: 'Booking Engine', isEnabled: true, featureLimits: [] },
      { id: 3, featureName: 'Analytics Dashboard', isEnabled: true, featureLimits: [] },
      { id: 4, featureName: 'Multi-Property Support', isEnabled: true, featureLimits: [] },
      { id: 5, featureName: 'API Access', isEnabled: true, featureLimits: [] },
    ],
  },
]
