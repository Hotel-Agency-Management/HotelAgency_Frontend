'use client'

import { useTheme } from '@mui/material'
import Icon from '@/components/icon/Icon'
import { useTranslation } from 'react-i18next'
import { DEFAULT_PAYMENT_DIRECTION_CONFIG, PAYMENT_DIRECTION_CONFIG } from '../constants/paymentDirectionConfig'
import { PaymentDirection } from '../types/payment'
import { DirectionChip } from '../styles/StyledComponents'

interface PaymentDirectionChipProps {
  direction: PaymentDirection
  size?: 'small' | 'medium'
}

export function PaymentDirectionChip({ direction, size = 'small' }: PaymentDirectionChipProps) {
  const theme = useTheme()
  const { t } = useTranslation()
  const config = PAYMENT_DIRECTION_CONFIG[direction] ?? DEFAULT_PAYMENT_DIRECTION_CONFIG
  const palette = theme.palette[config.color]

  return (
    <DirectionChip
      size={size}
      $palette={palette}
      icon={<Icon icon={config.icon} fontSize={14} />}
      label={t(`hotelPaymentLogs.directions.${direction}`, config.label)}
    />
  )
}
