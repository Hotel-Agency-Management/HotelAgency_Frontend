import type { StatCardConfig } from '../types/accountantDashboardTypes'

export const STAT_CARDS_CONFIG: StatCardConfig[] = [
  {
    title: 'Total Revenue',
    value: '$84,200',
    subtitle: 'This fiscal year',
    trend: { value: '+12.4% vs last year', direction: 'up' },
    iconName: 'lucide:trending-up',
    color: 'primary',
  },
  {
    title: 'Total Expenses',
    value: '$52,800',
    subtitle: 'This fiscal year',
    trend: { value: '+6.2% vs last year', direction: 'neutral' },
    iconName: 'lucide:receipt',
    color: 'error',
  },
  {
    title: 'Net Profit',
    value: '$31,400',
    subtitle: 'This fiscal year',
    trend: { value: '+18.7% vs last year', direction: 'up' },
    iconName: 'lucide:piggy-bank',
    color: 'success',
  },
  {
    title: 'Outstanding Payments',
    value: '$12,300',
    subtitle: '3 invoices overdue',
    trend: { value: 'Action required', direction: 'neutral' },
    iconName: 'lucide:clock',
    color: 'warning',
  },
  {
    title: 'Refunds',
    value: '$3,200',
    subtitle: 'This month',
    trend: { value: '-8.3% vs last month', direction: 'down' },
    iconName: 'lucide:rotate-ccw',
    color: 'info',
  },
  {
    title: 'Cash Balance',
    value: '$28,100',
    subtitle: 'Current balance',
    trend: { value: '+$7,200 this month', direction: 'up' },
    iconName: 'lucide:wallet',
    color: 'success',
  },
]

export const CARD_TRANSLATION_KEYS = [
  'totalRevenue',
  'totalExpenses',
  'netProfit',
  'outstandingPayments',
  'refunds',
  'cashBalance',
] as const
