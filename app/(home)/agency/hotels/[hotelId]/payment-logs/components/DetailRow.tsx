'use client'

import { Divider, Stack, Typography } from '@mui/material'
import Icon from '@/components/icon/Icon'

export interface DetailRowProps {
  icon: string
  label: string
  value: React.ReactNode
}

export function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Icon icon={icon} fontSize={16} />
      <Stack direction="row" justifyContent="space-between" alignItems="center" flex={1} gap={2}>
        <Typography variant="body2">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={500} textAlign="right">
          {value}
        </Typography>
      </Stack>
      <Divider/>
    </Stack>
  )
}
