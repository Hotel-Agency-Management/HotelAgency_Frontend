import { ChipProps } from "@mui/material"

export const RESERVATION_STATUSES = ['Confirmed', 'Pending', 'Cancelled', 'CheckedIn', 'CheckedOut', 'Completed']
export const STATUS_COLOR: Record<string, ChipProps['color']> = {
  Confirmed: 'success',
  Pending: 'warning',
  Cancelled: 'error',
  CheckedIn: 'info',
  CheckedOut: 'default',
  Completed: 'default',
}

export const NEXT_STATUS_VALUE: Record<string, number> = {
  Confirmed: 2,
  CheckedIn: 3,
}

export const NEXT_STATUS_LABEL: Record<string, string> = {
  Confirmed: 'Check In',
  CheckedIn: 'Check Out',
}