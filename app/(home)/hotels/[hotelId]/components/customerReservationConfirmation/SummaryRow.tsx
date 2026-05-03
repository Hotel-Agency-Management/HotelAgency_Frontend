import type { ReactNode } from 'react'
import { Stack, Typography } from '@mui/material'

interface SummaryRowProps {
  label: ReactNode
  value: ReactNode
  emphasis?: boolean
}

export function SummaryRow({ label, value, emphasis = false }: SummaryRowProps) {
  return (
    <Stack direction="row" justifyContent="space-between" gap={2}>
      <Typography variant={emphasis ? 'subtitle2' : 'body2'} color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant={emphasis ? 'subtitle2' : 'body2'}
        fontWeight={emphasis ? 700 : 600}
        textAlign="right"
      >
        {value}
      </Typography>
    </Stack>
  )
}
