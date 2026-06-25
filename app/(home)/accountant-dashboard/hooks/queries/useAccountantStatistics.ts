import { useQuery } from '@tanstack/react-query'
import {
  getBalanceTrend,
  getCashFlow,
  getFinancialSummary,
  getRefundImpact,
  getRevenueByType,
  getRevenueExpenses,
  getRevenueGrowth,
} from '../../api/accountantClient'

export const accountantStatisticsQueryKeys = {
  all: ['accountant-statistics'] as const,

  financialSummary: (hotelId?: number) =>
    [...accountantStatisticsQueryKeys.all, hotelId, 'financial-summary'] as const,

  revenueExpenses: (hotelId?: number) =>
    [...accountantStatisticsQueryKeys.all, hotelId, 'revenue-expenses'] as const,

  revenueByType: (hotelId?: number) =>
    [...accountantStatisticsQueryKeys.all, hotelId, 'revenue-by-type'] as const,

  refundImpact: (hotelId?: number) =>
    [...accountantStatisticsQueryKeys.all, hotelId, 'refund-impact'] as const,

  revenueGrowth: (hotelId?: number) =>
    [...accountantStatisticsQueryKeys.all, hotelId, 'revenue-growth'] as const,

  cashFlow: (hotelId?: number) =>
    [...accountantStatisticsQueryKeys.all, hotelId, 'cash-flow'] as const,

  balanceTrend: (hotelId?: number) =>
    [...accountantStatisticsQueryKeys.all, hotelId, 'balance-trend'] as const,
}

const hasHotelId = (hotelId?: number) => Number.isFinite(hotelId)

export function useFinancialSummary(hotelId?: number) {
  return useQuery({
    queryKey: accountantStatisticsQueryKeys.financialSummary(hotelId),
    queryFn: () => getFinancialSummary(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useRevenueExpenses(hotelId?: number) {
  return useQuery({
    queryKey: accountantStatisticsQueryKeys.revenueExpenses(hotelId),
    queryFn: () => getRevenueExpenses(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useRevenueByType(hotelId?: number) {
  return useQuery({
    queryKey: accountantStatisticsQueryKeys.revenueByType(hotelId),
    queryFn: () => getRevenueByType(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useRefundImpact(hotelId?: number) {
  return useQuery({
    queryKey: accountantStatisticsQueryKeys.refundImpact(hotelId),
    queryFn: () => getRefundImpact(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useRevenueGrowth(hotelId?: number) {
  return useQuery({
    queryKey: accountantStatisticsQueryKeys.revenueGrowth(hotelId),
    queryFn: () => getRevenueGrowth(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useCashFlow(hotelId?: number) {
  return useQuery({
    queryKey: accountantStatisticsQueryKeys.cashFlow(hotelId),
    queryFn: () => getCashFlow(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}

export function useBalanceTrend(hotelId?: number) {
  return useQuery({
    queryKey: accountantStatisticsQueryKeys.balanceTrend(hotelId),
    queryFn: () => getBalanceTrend(hotelId as number),
    enabled: hasHotelId(hotelId),
  })
}
