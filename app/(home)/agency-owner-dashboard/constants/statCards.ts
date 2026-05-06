import type { StatCardProps } from '../../admin-dashboard/types/dashboardTypes'

export type StatCardConfig = Omit<StatCardProps, 'icon'> & { iconName: string }

export const STAT_CARDS_CONFIG: StatCardConfig[] = [
  {
    title: 'Total Revenue',
    value: '$284,500',
    subtitle: 'All hotels combined',
    trend: { value: '+$18,200 this month', direction: 'up' },
    color: 'success',
    iconName: 'tabler:currency-dollar',
  },
  {
    title: 'Occupancy Rate',
    value: '73%',
    subtitle: 'Avg across all hotels',
    trend: { value: '+4% vs last month', direction: 'up' },
    color: 'primary',
    iconName: 'tabler:bed',
  },
  {
    title: 'Total Bookings',
    value: '1,847',
    subtitle: 'All hotels YTD',
    trend: { value: '+123 this week', direction: 'up' },
    color: 'info',
    iconName: 'tabler:calendar-check',
  },
  {
    title: 'Active Hotels',
    value: '5',
    subtitle: 'Portfolio size',
    trend: { value: 'Unchanged', direction: 'neutral' },
    color: 'warning',
    iconName: 'tabler:building-estate',
  },
]
