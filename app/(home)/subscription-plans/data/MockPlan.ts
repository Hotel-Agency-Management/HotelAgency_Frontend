import { BILLING_CYCLE, SubscriptionPlan } from "@/app/(home)/subscription-plans/types/plans"

export const BILLING_CYCLE_LABELS: Record<SubscriptionPlan['billingCycle'], string> = {
  [BILLING_CYCLE.MONTHLY]: 'per month',
  [BILLING_CYCLE.YEARLY]: 'per year',
  [BILLING_CYCLE.CUSTOM]: 'custom',
}

export const MOCK_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-basic',
    name: 'Basic',
    description: 'Essential tools for small independent hotels getting started.',
    price: 29,
    billingCycle: BILLING_CYCLE.MONTHLY,
    isActive: true,
    createdAt: '2024-09-01T10:00:00Z',
    updatedAt: '2024-11-01T10:00:00Z',
    features: [
      { id: 'f1', name: 'Room Management',       enabled: true,  limit: '20 rooms' },
      { id: 'f2', name: 'Booking Engine',         enabled: true  },
      { id: 'f3', name: 'Analytics Dashboard',    enabled: false },
      { id: 'f4', name: 'Multi-Property Support', enabled: false },
      { id: 'f5', name: 'API Access',             enabled: false },
    ],
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    description: 'Advanced features for growing hotels and boutique chains.',
    price: 79,
    billingCycle: BILLING_CYCLE.MONTHLY,
    isActive: true,
    createdAt: '2024-09-01T10:00:00Z',
    updatedAt: '2024-11-15T10:00:00Z',
    features: [
      { id: 'f1', name: 'Room Management',       enabled: true, limit: '100 rooms' },
      { id: 'f2', name: 'Booking Engine',         enabled: true },
      { id: 'f3', name: 'Analytics Dashboard',    enabled: true },
      { id: 'f4', name: 'Multi-Property Support', enabled: true, limit: '3 properties' },
      { id: 'f5', name: 'API Access',             enabled: false },
    ],
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    description: 'Full-suite solution for large hotel groups and chains.',
    price: 0,
    billingCycle: BILLING_CYCLE.CUSTOM,
    customBillingLabel: 'Contact Sales',
    isActive: true,
    createdAt: '2024-09-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
    features: [
      { id: 'f1', name: 'Room Management',       enabled: true, limit: 'Unlimited' },
      { id: 'f2', name: 'Booking Engine',         enabled: true },
      { id: 'f3', name: 'Analytics Dashboard',    enabled: true },
      { id: 'f4', name: 'Multi-Property Support', enabled: true, limit: 'Unlimited' },
      { id: 'f5', name: 'API Access',             enabled: true, description: 'Full REST API access with webhooks' },
    ],
  },
]
