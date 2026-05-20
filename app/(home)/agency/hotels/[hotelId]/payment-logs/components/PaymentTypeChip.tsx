'use client'

import { Chip, useTheme } from '@mui/material'
import Icon from '@/components/icon/Icon'
import { PAYMENT_TYPE_CONFIG } from '../constants/paymentTypeConfig'
import type { PaymentType } from '../types'

interface PaymentTypeChipProps {
  type: PaymentType
  size?: 'small' | 'medium'
}

export function PaymentTypeChip({ type, size = 'small' }: PaymentTypeChipProps) {
  const theme = useTheme()
  const config = PAYMENT_TYPE_CONFIG[type]
  const palette = theme.palette[config.color]

  return (
    <Chip
      size={size}
      icon={<Icon icon={config.icon} fontSize={14} />}
      label={config.label}
      sx={{
        backgroundColor: `${palette.main}1A`,
        color: palette.main,
        fontWeight: 600,
        '& .MuiChip-icon': { color: palette.main },
      }}
    />
  )
}
