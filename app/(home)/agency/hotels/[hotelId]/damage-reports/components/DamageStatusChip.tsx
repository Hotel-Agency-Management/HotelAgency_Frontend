'use client'

import { alpha, useTheme } from '@mui/material'
import Chip from '@mui/material/Chip'
import { DAMAGE_STATUS_COLOR_KEY, DAMAGE_STATUS_LABELS } from '../constants/damageReport'
import type { DamageReportStatus } from '../types/damageReport'

interface DamageStatusChipProps {
  status: DamageReportStatus
}

export default function DamageStatusChip({ status }: DamageStatusChipProps) {
  const theme = useTheme()
  const colorKey = DAMAGE_STATUS_COLOR_KEY[status]
  const color = theme.palette[colorKey].main

  return (
    <Chip
      size="small"
      label={DAMAGE_STATUS_LABELS[status]}
      sx={{
        bgcolor: alpha(color, 0.14),
        color,
        fontWeight: 700,
      }}
    />
  )
}
