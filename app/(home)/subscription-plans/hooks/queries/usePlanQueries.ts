import { useQuery } from '@tanstack/react-query'
import {
  getSubscriptionPlans,
  getSubscriptionPlanById,
  GetSubscriptionPlansParams,
} from '../../clients/plansClient'
import { PLANS_KEY, PLAN_KEY } from '../../constants/planKeys'

export const useGetSubscriptionPlans = ({
  includeInactive = false,
}: GetSubscriptionPlansParams = {}) => {
  return useQuery({
    queryKey: [PLANS_KEY, { includeInactive }],
    queryFn: () => getSubscriptionPlans({ includeInactive }),
  })
}

export const useGetSubscriptionPlanById = (id: number) => {
  return useQuery({
    queryKey: [PLAN_KEY, id],
    queryFn: () => getSubscriptionPlanById(id),
    enabled: !!id,
  })
}
