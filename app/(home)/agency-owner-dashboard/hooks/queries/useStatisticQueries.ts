import { useQuery } from '@tanstack/react-query'
import {
  getBookingDistribution,
  getOverviewStats,
  getProfitAndExpenseTrends,
  getReservationByRoomType,
  getRevenuePerHotel,
  getRevenueTrends,
  getStatusDistribution,
} from '../../client/statisticClient'

export const agencyOwnerStatisticQueryKeys = {
  all: ['agency-owner-statistics'] as const,
  overviewStats: (agencyId?: number) => [...agencyOwnerStatisticQueryKeys.all, agencyId, 'overview'] as const,
  revenueTrends: (agencyId?: number) => [...agencyOwnerStatisticQueryKeys.all, agencyId, 'revenue-trends'] as const,
  profitAndExpenseTrends: (agencyId?: number) =>
    [...agencyOwnerStatisticQueryKeys.all, agencyId, 'profit-expense'] as const,
  bookingDistribution: (agencyId?: number) =>
    [...agencyOwnerStatisticQueryKeys.all, agencyId, 'booking-distribution'] as const,
  revenuePerHotel: (agencyId?: number) => [...agencyOwnerStatisticQueryKeys.all, agencyId, 'revenue-per-hotel'] as const,
  statusDistribution: (agencyId?: number) =>
    [...agencyOwnerStatisticQueryKeys.all, agencyId, 'status-distribution'] as const,
  reservationByRoomType: (agencyId?: number) =>
    [...agencyOwnerStatisticQueryKeys.all, agencyId, 'reservation-by-room-type'] as const,
}

const hasAgencyId = (agencyId?: number) => Number.isFinite(agencyId)

export function useOverviewStats(agencyId?: number) {
  return useQuery({
    queryKey: agencyOwnerStatisticQueryKeys.overviewStats(agencyId),
    queryFn: () => getOverviewStats(agencyId as number),
    enabled: hasAgencyId(agencyId),
  })
}

export function useRevenueTrends(agencyId?: number) {
  return useQuery({
    queryKey: agencyOwnerStatisticQueryKeys.revenueTrends(agencyId),
    queryFn: () => getRevenueTrends(agencyId as number),
    enabled: hasAgencyId(agencyId),
  })
}

export function useProfitAndExpenseTrends(agencyId?: number) {
  return useQuery({
    queryKey: agencyOwnerStatisticQueryKeys.profitAndExpenseTrends(agencyId),
    queryFn: () => getProfitAndExpenseTrends(agencyId as number),
    enabled: hasAgencyId(agencyId),
  })
}

export function useBookingDistribution(agencyId?: number) {
  return useQuery({
    queryKey: agencyOwnerStatisticQueryKeys.bookingDistribution(agencyId),
    queryFn: () => getBookingDistribution(agencyId as number),
    enabled: hasAgencyId(agencyId),
  })
}

export function useRevenuePerHotel(agencyId?: number) {
  return useQuery({
    queryKey: agencyOwnerStatisticQueryKeys.revenuePerHotel(agencyId),
    queryFn: () => getRevenuePerHotel(agencyId as number),
    enabled: hasAgencyId(agencyId),
  })
}

export function useStatusDistribution(agencyId?: number) {
  return useQuery({
    queryKey: agencyOwnerStatisticQueryKeys.statusDistribution(agencyId),
    queryFn: () => getStatusDistribution(agencyId as number),
    enabled: hasAgencyId(agencyId),
  })
}

export function useReservationByRoomType(agencyId?: number) {
  return useQuery({
    queryKey: agencyOwnerStatisticQueryKeys.reservationByRoomType(agencyId),
    queryFn: () => getReservationByRoomType(agencyId as number),
    enabled: hasAgencyId(agencyId),
  })
}
