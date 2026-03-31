import { Grid } from '@mui/material'
import { SubscriptionPlan } from '../types/plans'
import PlanCard from './PlanCard'
import { LoadingState, ErrorState, EmptyState } from './StateViews'

interface PlansContentFactoryProps {
  pageStatus: 'idle' | 'loading' | 'error'
  plans: SubscriptionPlan[]
  onRetry: () => void
  onEdit: (plan: SubscriptionPlan) => void
  onDelete: (plan: SubscriptionPlan) => void
}

export function PlansContentFactory({
  pageStatus,
  plans,
  onRetry,
  onEdit,
  onDelete,
}: PlansContentFactoryProps) {
  switch (pageStatus) {
    case 'loading':
      return <LoadingState />

    case 'error':
      return <ErrorState onRetry={onRetry} />

    case 'idle':
      if (plans.length === 0) {
        return <EmptyState />
      }

      return (
        <Grid container spacing={2.5}>
          {plans.map(plan => (
            <Grid key={plan.id} size={{ xs: 12, sm: 6 }}>
              <PlanCard
                plan={plan}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </Grid>
          ))}
        </Grid>
      )

    default:
      return null
  }
}
