import type { StatCardProps } from '../../admin-dashboard/types/dashboardTypes'

export type StatCardConfig = Pick<StatCardProps, 'color'> & {
  title: string
  iconName: string
  key: 'totalRevenue' | 'totalBookings' | 'pendingReservations' | 'averageBookingValue'
}

export const STAT_CARDS_CONFIG: StatCardConfig[] = [
  {
    key: 'totalRevenue',
    title: 'Total Revenue',
    color: 'success',
    iconName: 'tabler:currency-dollar',
  },
  {
    key: 'totalBookings',
    title: 'Total Bookings',
    color: 'info',
    iconName: 'tabler:calendar-check',
  },
  {
    key: 'pendingReservations',
    title: 'Pending Reservations',
    color: 'warning',
    iconName: 'tabler:calendar-time',
  },
  {
    key: 'averageBookingValue',
    title: 'Average Booking Value',
    color: 'primary',
    iconName: 'tabler:receipt',
  },
]
