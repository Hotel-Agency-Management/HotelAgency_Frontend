import { ChipProps } from "@mui/material"

export const RESERVATION_STATUSES = ['Confirmed', 'Pending', 'Cancelled', 'Completed']
export const STATUS_COLOR: Record<string, ChipProps['color']> = {
  Confirmed: 'success',
  Pending: 'warning',
  Cancelled: 'error',
  Completed: 'default',
}