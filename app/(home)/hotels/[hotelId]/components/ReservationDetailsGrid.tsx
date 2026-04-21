'use client'

import { Stack, Typography } from '@mui/material'
import type { ReservationDetailsItem } from '../constants/reservationDetails'

interface ReservationDetailsGridProps {
  items: ReservationDetailsItem[]
}

export function ReservationDetailsGrid({ items }: ReservationDetailsGridProps) {
  return (
    <Stack gap={1.25}>
      <Typography variant="subtitle1" fontWeight={700}>
        Reservation details
      </Typography>

      {items.map(item => (
        <Stack key={item.label} direction="row" justifyContent="space-between" gap={2}>
          <Typography variant="body2" color="text.secondary">
            {item.label}
          </Typography>
          <Typography variant="body2" fontWeight={item.emphasized ? 700 : 600}>
            {item.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}
