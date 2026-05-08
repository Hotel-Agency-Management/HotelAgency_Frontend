import type { StatCardProps } from '../../admin-dashboard/types/dashboardTypes'

export type StatCardConfig = Omit<StatCardProps, 'icon'> & { iconName: string }

export const STAT_CARDS_CONFIG: StatCardConfig[] = [
  {
    title: 'Occupancy Rate',
    value: '78%',
    subtitle: "Tonight's occupancy",
    trend: { value: '+6% vs last week', direction: 'up' },
    color: 'primary',
    iconName: 'tabler:bed',
  },
  {
    title: "Today's Check-ins",
    value: '34',
    subtitle: 'Arrivals today',
    trend: { value: '+8 since yesterday', direction: 'up' },
    color: 'success',
    iconName: 'tabler:login',
  },
  {
    title: "Today's Check-outs",
    value: '29',
    subtitle: 'Departures today',
    trend: { value: 'On schedule', direction: 'neutral' },
    color: 'info',
    iconName: 'tabler:logout',
  },
  {
    title: 'Pending Maintenance',
    value: '7',
    subtitle: 'Open work orders',
    trend: { value: '-3 resolved today', direction: 'down' },
    color: 'warning',
    iconName: 'tabler:tool',
  },
]
