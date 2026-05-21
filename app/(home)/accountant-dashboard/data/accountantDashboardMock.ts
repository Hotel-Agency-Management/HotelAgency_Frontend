import type { MultiSeriesItem, PieDataPoint } from '@/components/charts/types'
import type { FinancialAlert } from '../types/accountantDashboardTypes'

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const REVENUE_VS_EXPENSES_SERIES: MultiSeriesItem[] = [
  {
    label: 'Revenue',
    data: [12400, 14200, 16800, 15200, 18400, 21300, 24500, 22800, 19600, 17400, 14900, 16200],
  },
  {
    label: 'Expenses',
    data: [8200, 9400, 10800, 9600, 11200, 13100, 15200, 14300, 12400, 11100, 9600, 10500],
  },
]

export const REVENUE_BY_PAYMENT_TYPE: PieDataPoint[] = [
  { label: 'Booking', value: 45200 },
  { label: 'Cancellation', value: 8400 },
  { label: 'Reservation Insurance', value: 6800 },
  { label: 'Yearly Insurance', value: 5200 },
  { label: 'Extend', value: 9600 },
  { label: 'Damage', value: 4800 },
  { label: 'Refund', value: 3200 },
]

export const REFUND_IMPACT_DATA: PieDataPoint[] = [
  { label: 'Paid Revenue', value: 71600 },
  { label: 'Refund', value: 3200 },
  { label: 'Cancellation Loss', value: 8400 },
]

export const MONTHLY_REVENUE_TREND: number[] = [
  12400, 14200, 16800, 15200, 18400, 21300, 24500, 22800, 19600, 17400, 14900, 16200,
]

export const CASH_FLOW_SERIES: MultiSeriesItem[] = [
  {
    label: 'Incoming',
    data: [14200, 16400, 19200, 17400, 21000, 24200, 27800, 25900, 22300, 19800, 16900, 18400],
  },
  {
    label: 'Outgoing',
    data: [8200, 9400, 10800, 9600, 11200, 13100, 15200, 14300, 12400, 11100, 9600, 10500],
  },
]

export const BALANCE_TREND_SERIES: MultiSeriesItem[] = [
  {
    label: 'Balance',
    data: [18000, 25000, 33400, 41200, 51000, 62100, 74700, 86300, 96200, 104900, 112200, 120100],
  },
]

export const NET_PROFIT_MONTHLY_SERIES: MultiSeriesItem[] = [
  { label: 'Net Profit', data: [4200, 4800, 6000, 5600, 7200, 8200, 9300, 8500, 7200, 6300, 5300, 5700] },
]

export const NET_PROFIT_WEEKLY_LABELS: string[] = [
  'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12',
]

export const NET_PROFIT_WEEKLY_SERIES: MultiSeriesItem[] = [
  { label: 'Net Profit', data: [1850, 2100, 1620, 2380, 1940, 2540, 2210, 1760, 2450, 2090, 1880, 2320] },
]

export const NET_PROFIT_DAILY_LABELS: string[] = Array.from({ length: 30 }, (_, i) => String(i + 1))

export const NET_PROFIT_DAILY_SERIES: MultiSeriesItem[] = [
  {
    label: 'Net Profit',
    data: [
      280, 340, 195, 420, 310, 265, 385, 450, 290, 360,
      230, 415, 375, 320, 180, 440, 295, 350, 410, 275,
      330, 395, 245, 460, 315, 280, 425, 370, 305, 385,
    ],
  },
]

export const REVENUE_GROWTH_VALUE = 67
export const REVENUE_GROWTH_THRESHOLDS = { low: 20, high: 50 }

export const FINANCIAL_ALERTS: FinancialAlert[] = [
  {
    id: '1',
    severity: 'error',
    title: 'High Refund Rate',
    description: 'Refunds have surpassed 8% of total revenue this month, above the 5% threshold.',
    amount: 3200,
    timestamp: '2 hours ago',
    icon: 'lucide:trending-down',
  },
  {
    id: '2',
    severity: 'warning',
    title: 'Overdue Invoices',
    description: 'Three guest invoices totaling $4,800 have been unpaid for more than 30 days.',
    amount: 4800,
    timestamp: '1 day ago',
    icon: 'lucide:file-warning',
  },
  {
    id: '3',
    severity: 'warning',
    title: 'Revenue Drop Detected',
    description: 'November revenue was 14.4% lower than October. Review recent booking trends.',
    timestamp: '3 days ago',
    icon: 'lucide:bar-chart-2',
  },
  {
    id: '4',
    severity: 'error',
    title: 'Expenses Spike',
    description: 'Maintenance costs rose 22% above the monthly budget. Review expense reports.',
    amount: 15200,
    timestamp: '5 days ago',
    icon: 'lucide:receipt',
  },
  {
    id: '5',
    severity: 'info',
    title: 'Unusual Transaction',
    description: 'A single transaction of $8,400 was recorded — significantly above the daily average.',
    amount: 8400,
    timestamp: '1 week ago',
    icon: 'lucide:alert-circle',
  },
  {
    id: '6',
    severity: 'warning',
    title: 'Budget Variance',
    description: 'Total expenses this month exceeded the planned budget by $2,800. Review cost centers.',
    amount: 2800,
    timestamp: '1 week ago',
    icon: 'lucide:calculator',
  },
]
