import type { MultiSeriesItem } from '@/components/charts/types'
import type { View } from '../types/accountantDashboardTypes'
import {
  MONTHS,
  NET_PROFIT_DAILY_LABELS,
  NET_PROFIT_DAILY_SERIES,
  NET_PROFIT_MONTHLY_SERIES,
  NET_PROFIT_WEEKLY_LABELS,
  NET_PROFIT_WEEKLY_SERIES,
} from '../data/accountantDashboardMock'

export const NET_PROFIT_CHART_DATA: Record<View, { series: MultiSeriesItem[]; labels: string[] }> = {
  daily: { series: NET_PROFIT_DAILY_SERIES, labels: NET_PROFIT_DAILY_LABELS },
  weekly: { series: NET_PROFIT_WEEKLY_SERIES, labels: NET_PROFIT_WEEKLY_LABELS },
  monthly: { series: NET_PROFIT_MONTHLY_SERIES, labels: MONTHS },
}
