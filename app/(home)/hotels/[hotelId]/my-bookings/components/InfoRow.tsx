'use client'

import { Stack, Typography } from '@mui/material'
import { BookingInfoValue } from '../styles/StyledComponents'

interface InfoRowProps {
  label: string
  value: React.ReactNode
  emphasized?: boolean
}

export function InfoRow({ label, value, emphasized }: InfoRowProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
      <Typography component="span" variant="body2" sx={{ minWidth: 140, flexShrink: 0 }}>
        {label}
      </Typography>
      <BookingInfoValue emphasized={emphasized}>
        {value ?? '—'}
      </BookingInfoValue>
    </Stack>
  )
}
