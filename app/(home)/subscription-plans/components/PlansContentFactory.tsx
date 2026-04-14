import { Grid } from '@mui/material'
import { PageStatus, SubscriptionPlan } from '../types/plans'
import PlanCard from './PlanCard'
import { LoadingState, ErrorState, EmptyState } from './StateViews'
import { PAGE_STATUS } from '@/core/types/pageStatus'

interface PlansContentFactoryProps {
  pageStatus: PageStatus
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
    case PAGE_STATUS.LOADING:
      return <LoadingState />

    case PAGE_STATUS.ERROR:
      return <ErrorState onRetry={onRetry} />

    case PAGE_STATUS.IDLE:
      if (plans.length === 0) {
        return <EmptyState />
      }

      return (
        <Grid container spacing={2.5}>
          {plans.map(plan => (
            <Grid key={plan.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
