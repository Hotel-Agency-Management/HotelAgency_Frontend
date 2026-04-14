import { BILLING_CYCLE, BillingCycle } from "../types/plans"

export const BILLING_OPTIONS: { value: BillingCycle; label: string }[] = [
  { value: BILLING_CYCLE.MONTHLY, label: 'Monthly' },
  { value: BILLING_CYCLE.YEARLY,  label: 'Yearly'  },
  { value: BILLING_CYCLE.CUSTOM,  label: 'Custom'  },
]
