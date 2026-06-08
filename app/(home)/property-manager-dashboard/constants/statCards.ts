import type { StatCardProps } from '../../admin-dashboard/types/dashboardTypes'

type StatCardPresentation = Pick<StatCardProps, 'color'> & { iconName: string }

export const STAT_CARD_PRESENTATION = {
  totalReservations: {
    color: 'primary',
    iconName: 'tabler:calendar-stats',
  },
  todayCheckIns: {
    color: 'success',
    iconName: 'tabler:login',
  },
  todayCheckOuts: {
    color: 'info',
    iconName: 'tabler:logout',
  },
  pendingReservations: {
    color: 'warning',
    iconName: 'tabler:clock-hour-4',
  },
} satisfies Record<string, StatCardPresentation>
