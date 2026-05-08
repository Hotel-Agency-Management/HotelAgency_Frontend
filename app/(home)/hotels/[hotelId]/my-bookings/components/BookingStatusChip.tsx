'use client'

import { Chip } from '@mui/material'
import { STATUS_COLOR } from '../../../constants/statusChip'

interface BookingStatusChipProps {
  status: string
}

export function BookingStatusChip({ status }: BookingStatusChipProps) {
  return (
    <Chip
      label={status}
      color={STATUS_COLOR[status] ?? 'default'}
      size="small"
      variant="outlined"
    />
  )
}
