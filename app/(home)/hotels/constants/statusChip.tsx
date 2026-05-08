import type { ChipProps } from '@mui/material'

export const STATUS_COLOR: Record<string, ChipProps['color']> = {
  Confirmed: 'success',
  Pending: 'warning',
  Cancelled: 'error',
}
