import { useQuery } from '@tanstack/react-query'
import {
  getAdminRevenue,
  getAdminOverviewStats,
  getAdminAgencyStatusBreakdown,
  getAdminPlanDistribution,
  getAdminGrowthData,
  getAdminRecentAgencies,
} from '../../client/adminStatisticClient'

export const adminStatisticQueryKeys = {
  all: ['admin-statistics'] as const,

  revenue: () =>
    [...adminStatisticQueryKeys.all, 'revenue'] as const,

  overviewStats: () =>
    [...adminStatisticQueryKeys.all, 'overview-stats'] as const,

  agencyStatusBreakdown: () =>
    [...adminStatisticQueryKeys.all, 'agency-status-breakdown'] as const,

  planDistribution: () =>
    [...adminStatisticQueryKeys.all, 'plan-distribution'] as const,

  growthData: () =>
    [...adminStatisticQueryKeys.all, 'growth-data'] as const,

  recentAgencies: () =>
    [...adminStatisticQueryKeys.all, 'recent-agencies'] as const,
}

export function useAdminRevenue() {
  return useQuery({
    queryKey: adminStatisticQueryKeys.revenue(),
    queryFn: getAdminRevenue,
  })
}

export function useAdminOverviewStats() {
  return useQuery({
    queryKey: adminStatisticQueryKeys.overviewStats(),
    queryFn: getAdminOverviewStats,
  })
}

export function useAdminAgencyStatusBreakdown() {
  return useQuery({
    queryKey: adminStatisticQueryKeys.agencyStatusBreakdown(),
    queryFn: getAdminAgencyStatusBreakdown,
  })
}

export function useAdminPlanDistribution() {
  return useQuery({
    queryKey: adminStatisticQueryKeys.planDistribution(),
    queryFn: getAdminPlanDistribution,
  })
}

export function useAdminGrowthData() {
  return useQuery({
    queryKey: adminStatisticQueryKeys.growthData(),
    queryFn: getAdminGrowthData,
  })
}

export function useAdminRecentAgencies() {
  return useQuery({
    queryKey: adminStatisticQueryKeys.recentAgencies(),
    queryFn: getAdminRecentAgencies,
  })
}

