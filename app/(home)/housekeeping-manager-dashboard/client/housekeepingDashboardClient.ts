import apiClient from '@/core/clients/apiClient'
import type {
  KpiResponse,
  OpenTicketsOverTimeResponse,
  TicketCompletionRateResponse,
  TicketPrioritiesResponse,
  TicketStatusDistributionResponse,
  TicketTypesResponse,
} from '../types/housekeepingDashboardTypes'

export async function getHousekeepingKpi(hotelId: number): Promise<KpiResponse> {
  const response = await apiClient.get<KpiResponse>(`/hotels/${hotelId}/housekeeping/dashboard/kpi`)
  return response.data
}

export async function getTicketStatusDistribution(hotelId: number): Promise<TicketStatusDistributionResponse> {
  const response = await apiClient.get<TicketStatusDistributionResponse>(
    `/hotels/${hotelId}/housekeeping/dashboard/ticket-status-distribution`
  )
  return response.data
}

export async function getTicketCompletionRate(hotelId: number): Promise<TicketCompletionRateResponse> {
  const response = await apiClient.get<TicketCompletionRateResponse>(
    `/hotels/${hotelId}/housekeeping/dashboard/ticket-completion-rate`
  )
  return response.data
}

export async function getOpenTicketsOverTime(hotelId: number): Promise<OpenTicketsOverTimeResponse> {
  const response = await apiClient.get<OpenTicketsOverTimeResponse>(
    `/hotels/${hotelId}/housekeeping/dashboard/open-tickets-over-time`
  )
  return response.data
}

export async function getTicketTypes(hotelId: number): Promise<TicketTypesResponse> {
  const response = await apiClient.get<TicketTypesResponse>(
    `/hotels/${hotelId}/housekeeping/dashboard/ticket-types`
  )
  return response.data
}

export async function getTicketPriorities(hotelId: number): Promise<TicketPrioritiesResponse> {
  const response = await apiClient.get<TicketPrioritiesResponse>(
    `/hotels/${hotelId}/housekeeping/dashboard/ticket-priorities`
  )
  return response.data
}
