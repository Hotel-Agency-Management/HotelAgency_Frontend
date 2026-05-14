import type { ElementType } from 'react'
import { Box, Stack, Typography } from '@mui/material'

interface SummaryRowProps {
  icon: ElementType
  label: string
  value: string
}

export function SummaryRow({ icon: Icon, label, value }: SummaryRowProps) {
  return (
    <Stack direction='row' spacing={1.5} alignItems='flex-start'>
      <Box >
        <Icon size={16} />
      </Box>
      <Stack spacing={0}>
        <Typography variant='caption'>{label}</Typography>
        <Typography variant='body2'>
          {value || '—'}
        </Typography>
      </Stack>
    </Stack>
  )
}
