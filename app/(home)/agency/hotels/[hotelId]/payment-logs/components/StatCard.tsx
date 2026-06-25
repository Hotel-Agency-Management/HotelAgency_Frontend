'use client'

import { Skeleton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import { formatAmount } from '../utils/dateFormat'
import { PaymentSummaryCard, StatusDotBadge } from '../styles/StyledComponents'

export interface StatCardProps {
  label: string
  icon: string
  amount: number
  count: number
  color: 'success' | 'error'
  isLoading: boolean
}

export function StatCard({ label, icon, amount, count, color, isLoading }: StatCardProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const palette = theme.palette[color]

  return (
    <PaymentSummaryCard $active={false} $palette={palette}>
      <Stack gap={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack gap={0.5}>
            <Typography
              variant="caption"
              fontWeight={600}
            >
              {label}
            </Typography>
            {isLoading ? (
              <Skeleton variant="text" width={120} height={36} />
            ) : (
              <Typography variant="h5" fontWeight={800}>
                {formatAmount(amount)}
              </Typography>
            )}
          </Stack>
            <Icon icon={icon} fontSize={22} color={palette.main} />
        </Stack>

        {isLoading ? (
          <Skeleton variant="text" width={100} />
        ) : (
          <Stack direction="row" alignItems="center" gap={0.75}>
            <StatusDotBadge variant="dot" $color={palette.main} />
            <Typography variant="caption" color="text.secondary">
              {t('paymentLogs.stat.transactionCount', { count })}
            </Typography>
          </Stack>
        )}
      </Stack>
    </PaymentSummaryCard>
  )
}
