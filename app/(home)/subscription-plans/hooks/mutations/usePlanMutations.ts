import { getErrorMessage } from '@/core/utils/apiError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
} from '../../clients/plansClient'
import { CreatePlanRequest, UpdatePlanRequest } from '../../configs/planConfig'
import { PLANS_KEY, PLAN_KEY } from '../../constants/planKeys'

export const useCreateSubscriptionPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePlanRequest) => createSubscriptionPlan(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANS_KEY] })
    },

    onError: (error) => {
      getErrorMessage(error)
    },
  })
}

export const useUpdateSubscriptionPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePlanRequest }) =>
      updateSubscriptionPlan(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [PLANS_KEY] })
      queryClient.invalidateQueries({
        queryKey: [PLAN_KEY, variables.id],
      })
    },

    onError: (error) => {
      getErrorMessage(error)
    },
  })
}

export const useDeleteSubscriptionPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteSubscriptionPlan(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANS_KEY] })
    },

    onError: (error) => {
      getErrorMessage(error)
    },
  })
}
