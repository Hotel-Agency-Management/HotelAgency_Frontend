import { useQuery } from '@tanstack/react-query'
import {
  getInsuranceIncomeTrend,
  getReservationStatusDistribution,
  getReservationTypeDistribution,
  getRevenueTrend,
  getRoomStatusDistribution,
  getStatCard,
  getTicketCompletionRate,
} from '../../client/statisticClient'

export const hotelStatisticQueryKeys = {
  all: ['hotel-statistics'] as const,

  statCard: (hotelId?: number) =>
    [...hotelStatisticQueryKeys.all, hotelId, 'stat-card'] as const,

  roomStatusDistribution: (hotelId?: number) =>
    [...hotelStatisticQueryKeys.all, hotelId, 'room-status-distribution'] as const,

  reservationStatusDistribution: (hotelId?: number) =>
    [...hotelStatisticQueryKeys.all, hotelId, 'reservation-status-distribution'] as const,

  reservationTypeDistribution: (hotelId?: number) =>
    [...hotelStatisticQueryKeys.all, hotelId, 'reservation-type-distribution'] as const,

  revenueTrend: (hotelId?: number, groupBy?: string) =>
    [...hotelStatisticQueryKeys.all, hotelId, 'revenue-trend', groupBy] as const,

  insuranceIncomeTrend: (hotelId?: number) =>
    [...hotelStatisticQueryKeys.all, hotelId, 'insurance-income-trend'] as const,

  ticketCompletionRate: (hotelId?: number) =>
    [...hotelStatisticQueryKeys.all, hotelId, 'ticket-completion-rate'] as const,
}

const hasHotelId = (hotelId?: number) => Number.isFinite(hotelId)

export function useStatCard(hotelId?: number) {
  return useQuery({
    queryKey: hotelStatisticQueryKeys.statCard(hotelId),
    queryFn: () => getStatCard(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useRoomStatusDistribution(hotelId?: number) {
  return useQuery({
    queryKey: hotelStatisticQueryKeys.roomStatusDistribution(hotelId),
    queryFn: () => getRoomStatusDistribution(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useReservationStatusDistribution(hotelId?: number) {
  return useQuery({
    queryKey: hotelStatisticQueryKeys.reservationStatusDistribution(hotelId),
    queryFn: () => getReservationStatusDistribution(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useReservationTypeDistribution(hotelId?: number) {
  return useQuery({
    queryKey: hotelStatisticQueryKeys.reservationTypeDistribution(hotelId),
    queryFn: () => getReservationTypeDistribution(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useRevenueTrend(
  hotelId?: number,
  groupBy: string = 'monthly'
) {
  return useQuery({
    queryKey: hotelStatisticQueryKeys.revenueTrend(hotelId, groupBy),
    queryFn: () => getRevenueTrend(hotelId as number, groupBy),
    enabled: hasHotelId(hotelId),
  })
}

export function useInsuranceIncomeTrend(hotelId?: number) {
  return useQuery({
    queryKey: hotelStatisticQueryKeys.insuranceIncomeTrend(hotelId),
    queryFn: () => getInsuranceIncomeTrend(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useTicketCompletionRate(hotelId?: number) {
  return useQuery({
    queryKey: hotelStatisticQueryKeys.ticketCompletionRate(hotelId),
    queryFn: () => getTicketCompletionRate(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}
