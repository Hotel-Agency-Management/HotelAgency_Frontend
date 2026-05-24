'use client'

import { alpha, useTheme } from '@mui/material'
import Chip from '@mui/material/Chip'
import { useTranslation } from 'react-i18next'
import { DAMAGE_STATUS_COLOR_KEY, getDamageStatusLabels } from '../constants/damageReport'
import type { DamageReportStatus } from '../types/damageReport'

interface DamageStatusChipProps {
  status: DamageReportStatus
}

export default function DamageStatusChip({ status }: DamageStatusChipProps) {
  const theme = useTheme()
  const { t } = useTranslation()
  const colorKey = DAMAGE_STATUS_COLOR_KEY[status]
  const color = theme.palette[colorKey].main
  const statusLabels = getDamageStatusLabels(t)

  return (
    <Chip
      size="small"
      label={statusLabels[status]}
      sx={{
        bgcolor: alpha(color, 0.14),
        color,
        fontWeight: 700,
      }}
    />
  )
}
