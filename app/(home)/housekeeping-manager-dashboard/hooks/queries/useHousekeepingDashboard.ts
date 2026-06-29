import { useQuery } from '@tanstack/react-query'
import {
  getHousekeepingKpi,
  getOpenTicketsOverTime,
  getTicketCompletionRate,
  getTicketPriorities,
  getTicketStatusDistribution,
  getTicketTypes,
} from '../../client/housekeepingDashboardClient'

export const housekeepingDashboardQueryKeys = {
  all: ['housekeeping-dashboard'] as const,
  kpi: (hotelId?: number) => [...housekeepingDashboardQueryKeys.all, hotelId, 'kpi'] as const,
  ticketStatusDistribution: (hotelId?: number) =>
    [...housekeepingDashboardQueryKeys.all, hotelId, 'ticket-status-distribution'] as const,
  ticketCompletionRate: (hotelId?: number) =>
    [...housekeepingDashboardQueryKeys.all, hotelId, 'ticket-completion-rate'] as const,
  openTicketsOverTime: (hotelId?: number) =>
    [...housekeepingDashboardQueryKeys.all, hotelId, 'open-tickets-over-time'] as const,
  ticketTypes: (hotelId?: number) =>
    [...housekeepingDashboardQueryKeys.all, hotelId, 'ticket-types'] as const,
  ticketPriorities: (hotelId?: number) =>
    [...housekeepingDashboardQueryKeys.all, hotelId, 'ticket-priorities'] as const,
}

const hasHotelId = (hotelId?: number) => Number.isFinite(hotelId)

export function useHousekeepingKpi(hotelId?: number) {
  return useQuery({
    queryKey: housekeepingDashboardQueryKeys.kpi(hotelId),
    queryFn: () => getHousekeepingKpi(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useTicketStatusDistribution(hotelId?: number) {
  return useQuery({
    queryKey: housekeepingDashboardQueryKeys.ticketStatusDistribution(hotelId),
    queryFn: () => getTicketStatusDistribution(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useTicketCompletionRate(hotelId?: number) {
  return useQuery({
    queryKey: housekeepingDashboardQueryKeys.ticketCompletionRate(hotelId),
    queryFn: () => getTicketCompletionRate(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useOpenTicketsOverTime(hotelId?: number) {
  return useQuery({
    queryKey: housekeepingDashboardQueryKeys.openTicketsOverTime(hotelId),
    queryFn: () => getOpenTicketsOverTime(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useTicketTypes(hotelId?: number) {
  return useQuery({
    queryKey: housekeepingDashboardQueryKeys.ticketTypes(hotelId),
    queryFn: () => getTicketTypes(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useTicketPriorities(hotelId?: number) {
  return useQuery({
    queryKey: housekeepingDashboardQueryKeys.ticketPriorities(hotelId),
    queryFn: () => getTicketPriorities(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}
