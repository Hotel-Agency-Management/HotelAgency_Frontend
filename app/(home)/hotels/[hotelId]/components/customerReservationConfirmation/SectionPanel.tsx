import type { ReactNode } from 'react'
import { Paper, Stack, Typography } from '@mui/material'

interface SectionPanelProps {
  title: string
  children: ReactNode
}

export function SectionPanel({ title, children }: SectionPanelProps) {
  return (
    <Paper variant="customerReservationConfirmationPanel">
      <Stack spacing={1.25}>
        <Typography variant="subtitle2" fontWeight={700}>
          {title}
        </Typography>
        {children}
      </Stack>
    </Paper>
  )
}
