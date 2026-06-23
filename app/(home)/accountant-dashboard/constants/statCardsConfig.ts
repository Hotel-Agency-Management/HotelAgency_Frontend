import type { FinancialSummaryResponse } from '../types/accountantDashboardTypes'

export interface StatCardConfig {
  key: keyof FinancialSummaryResponse
  translationKey: string
  defaultTitle: string
  iconName: string
  color: 'primary' | 'success' | 'warning' | 'error' | 'info'
}

export const STAT_CARDS_CONFIG: StatCardConfig[] = [
  {
    key: 'totalRevenue',
    translationKey: 'dashboard.accountant.stats.totalRevenue.title',
    defaultTitle: 'Total Revenue',
    iconName: 'lucide:trending-up',
    color: 'primary',
  },
  {
    key: 'totalExpenses',
    translationKey: 'dashboard.accountant.stats.totalExpenses.title',
    defaultTitle: 'Total Expenses',
    iconName: 'lucide:receipt',
    color: 'error',
  },
  {
    key: 'netProfit',
    translationKey: 'dashboard.accountant.stats.netProfit.title',
    defaultTitle: 'Net Profit',
    iconName: 'lucide:piggy-bank',
    color: 'success',
  },
  {
    key: 'outstandingPayments',
    translationKey: 'dashboard.accountant.stats.outstandingPayments.title',
    defaultTitle: 'Outstanding Payments',
    iconName: 'lucide:clock',
    color: 'warning',
  },
  {
    key: 'refunds',
    translationKey: 'dashboard.accountant.stats.refunds.title',
    defaultTitle: 'Refunds',
    iconName: 'lucide:rotate-ccw',
    color: 'info',
  },
  {
    key: 'cashBalance',
    translationKey: 'dashboard.accountant.stats.cashBalance.title',
    defaultTitle: 'Cash Balance',
    iconName: 'lucide:wallet',
    color: 'success',
  },
]
