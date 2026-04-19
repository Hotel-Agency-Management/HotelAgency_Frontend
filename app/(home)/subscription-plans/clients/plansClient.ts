import apiClient from "@/core/clients/apiClient"
import {
  SubscriptionPlan,
  SubscriptionPlansResponse,
  CreatePlanRequest,
  UpdatePlanRequest,
} from "../configs/planConfig"

export interface GetSubscriptionPlansParams {
  includeInactive?: boolean
}

export const getSubscriptionPlans = async ({
  includeInactive = false,
}: GetSubscriptionPlansParams = {}): Promise<SubscriptionPlansResponse> => {
  const response = await apiClient.get<SubscriptionPlansResponse>('/public/plans', {
    params: { includeInactive },
  })
  return response.data
}

export const getSubscriptionPlanById = async (
  id: number
): Promise<SubscriptionPlan> => {
  const response = await apiClient.get<SubscriptionPlan>(`/public/plans/${id}`)
  return response.data
}

export const createSubscriptionPlan = async (
  data: CreatePlanRequest
): Promise<SubscriptionPlan> => {
  const response = await apiClient.post<SubscriptionPlan>('/plans', data)
  return response.data
}

export const updateSubscriptionPlan = async (
  id: number,
  data: UpdatePlanRequest
): Promise<SubscriptionPlan> => {
  const response = await apiClient.put<SubscriptionPlan>(`/plans/${id}`, data)
  return response.data
}

export const deleteSubscriptionPlan = async (id: number): Promise<void> => {
  await apiClient.delete(`/plans/${id}`)
}
