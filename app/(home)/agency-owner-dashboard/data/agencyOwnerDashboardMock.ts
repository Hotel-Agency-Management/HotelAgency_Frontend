import type { MultiSeriesItem } from '@/components/charts/types'
import type { PieDataPoint } from '@/components/charts/types'

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const HOTEL_NAMES_SHORT = ['Grand Palais', 'Seabreeze', 'Urban Luxe', 'Mountainview', 'Harborlight']

export const HOTEL_NAMES_FULL = [
  'Grand Palais Hotel',
  'Seabreeze Resort',
  'Urban Luxe Suites',
  'The Mountainview Inn',
  'Harborlight Boutique',
]

export const REVENUE_SERIES: MultiSeriesItem[] = [
  { label: 'Revenue', data: [18200, 19400, 21000, 22800, 24500, 26100, 27800, 29200, 26400, 24100, 21700, 23300] },
  { label: 'Target',  data: [20000, 20000, 22000, 22000, 24000, 24000, 26000, 26000, 26000, 24000, 22000, 22000] },
]

export const PROFIT_EXPENSES_SERIES: MultiSeriesItem[] = [
  { label: 'Profit',   data: [7200, 7800, 8600, 9400, 10200, 11000, 11800, 12400, 10900, 9600, 8400, 9100] },
  { label: 'Expenses', data: [11000, 11600, 12400, 13400, 14300, 15100, 16000, 16800, 15500, 14500, 13300, 14200] },
]

export const OCCUPANCY_BY_HOTEL: number[] = [81, 74, 69, 58, 72]

export const BOOKING_TRENDS_SERIES: MultiSeriesItem[] = [
  { label: 'Online Bookings', data: [98, 112, 134, 148, 163, 177, 195, 208, 182, 161, 143, 156] },
  { label: 'Direct Bookings', data: [42, 45, 51, 58, 63, 68, 74, 79, 71, 62, 55, 59] },
]

// Values in $K for readable axis labels
export const REVENUE_BY_HOTEL: number[] = [89.4, 72.1, 58.3, 41.2, 23.5]

export const CHECKINS_CHECKOUTS_SERIES: MultiSeriesItem[] = [
  { label: 'Check-ins',  data: [124, 138, 157, 172, 189, 204, 221, 238, 211, 186, 163, 178] },
  { label: 'Check-outs', data: [118, 131, 149, 165, 182, 196, 214, 229, 204, 179, 157, 171] },
]

export const BOOKING_TYPE_DISTRIBUTION: PieDataPoint[] = [
  { label: 'Online', value: 748 },
  { label: 'OTA',    value: 531 },
  { label: 'Phone',  value: 312 },
  { label: 'Walk-in', value: 256 },
]
