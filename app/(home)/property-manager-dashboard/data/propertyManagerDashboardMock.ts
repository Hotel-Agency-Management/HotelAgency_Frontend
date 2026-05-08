
import type { MultiSeriesItem, PieDataPoint } from '@/components/charts/types'

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// ADR = Average Daily Rate ($) — single-series line trend
export const ADR_SERIES: MultiSeriesItem[] = [
  { label: 'ADR ($)', data: [138, 142, 155, 162, 171, 178, 189, 195, 175, 163, 148, 158] },
]

// RevPAR = ADR × Occupancy Rate — standalone bar trend
export const REVPAR_DATA: number[] = [99, 105, 122, 133, 145, 157, 170, 177, 147, 129, 108, 122]

export const ROOM_STATUS_DISTRIBUTION: PieDataPoint[] = [
  { label: 'Occupied',     value: 94 },
  { label: 'Available',    value: 22 },
  { label: 'Housekeeping', value: 8  },
  { label: 'Maintenance',  value: 4  },
]

export const HOUSEKEEPING_LABELS = ['Completed', 'In Progress', 'Pending', 'Overdue']
export const HOUSEKEEPING_TASKS: number[] = [48, 12, 19, 7]

export const SERVICE_REQUESTS_DISTRIBUTION: PieDataPoint[] = [
  { label: 'Room Service',         value: 214 },
  { label: 'Extra Towels',         value: 178 },
  { label: 'Cleaning Request',     value: 156 },
  { label: 'Late Checkout',        value: 97  },
  { label: 'Maintenance Request',  value: 83  },
]

export const MAINTENANCE_LABELS = ['HVAC', 'Plumbing', 'Electrical', 'Furniture', 'Other']
export const MAINTENANCE_CATEGORIES: number[] = [3, 2, 1, 4, 2]
