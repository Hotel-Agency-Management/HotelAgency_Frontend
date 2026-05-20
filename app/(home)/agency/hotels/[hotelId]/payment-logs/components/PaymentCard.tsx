'use client'

import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { hexToRGBA } from '@/core/utils/hex-to-rgba'
import Icon from '@/components/icon/Icon'
import { PAYMENT_TYPE_CONFIG } from '../constants/paymentTypeConfig'
import { formatAmount, formatPaymentDateTime } from '../utils/dateFormat'
import type { PaymentLog } from '../types'
import { DataColumn } from './DataColumn'
import { PaymentLogCard } from '../styles/StyledComponents'

interface PaymentCardProps {
  payment: PaymentLog
  selected: boolean
  isIncoming: boolean
  onClick: (payment: PaymentLog) => void
}

export function PaymentCard({ payment, selected, isIncoming, onClick }: PaymentCardProps) {
  const theme = useTheme()
  const amountColor = isIncoming ? theme.palette.success.main : theme.palette.error.main
  const typeConfig = PAYMENT_TYPE_CONFIG[payment.type]
  const typePalette = theme.palette[typeConfig.color]

  const avatarSx = {
    backgroundColor: hexToRGBA(typePalette.main, 0.1),
    flexShrink: 0,
  }

  return (
    <PaymentLogCard variant="outlined" selected={selected} onClick={() => onClick(payment)}>

      {/* Mobile layout (xs → sm) */}
      <Stack display={{ xs: 'flex', md: 'none' }} gap={1.5}>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Avatar sx={{ ...avatarSx, width: 40, height: 40 }}>
            <Icon icon={typeConfig.icon} fontSize={18} color={typePalette.main} />
          </Avatar>
          <Stack flex={1} gap={0.25}>
            <Typography variant="caption" color="text.disabled" fontWeight={500}>
              Payment Type
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {typeConfig.label}
            </Typography>
          </Stack>
          <DataColumn
            label="Amount"
            value={formatAmount(payment.amount, isIncoming)}
            align="right"
            valueColor={amountColor}
            valueWeight={700}
          />
        </Stack>

        <Stack direction="row" alignItems="center" gap={1} sx={{ pl: 7 }}>
          <Typography variant="body2" fontWeight={500} noWrap flex={1} minWidth={0}>
            {payment.fromName}
          </Typography>
          <Icon icon="lucide:arrow-right" fontSize={12} />
          <Typography variant="body2" fontWeight={500} noWrap flex={1} minWidth={0}>
            {payment.toName}
          </Typography>
          <Typography variant="caption" color="text.disabled" flexShrink={0}>
            {formatPaymentDateTime(payment.createdAt)}
          </Typography>
        </Stack>
      </Stack>

      {/* Desktop layout (md+) */}
      <Stack display={{ xs: 'none', md: 'flex' }} direction="row" alignItems="center" gap={2.5}>
        <Avatar sx={{ ...avatarSx, width: 44, height: 44 }}>
          <Icon icon={typeConfig.icon} fontSize={20} color={typePalette.main} />
        </Avatar>

        <DataColumn label="Payment Type" value={typeConfig.label} valueWeight={600} width={140} />

        <Stack flex={1} rowGap={0.5}>
          <Stack direction="row" alignItems="center" columnGap={1}>
            <Typography variant="caption" color="text.disabled" fontWeight={500} width={120}>
              From
            </Typography>
            <Box sx={{ width: 22 }} />
            <Typography variant="caption" color="text.disabled" fontWeight={500}>
              To
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" columnGap={1}>
            <Typography variant="body2" fontWeight={500} width={120} noWrap>
              {payment.fromName}
            </Typography>
            <Icon icon="lucide:arrow-right" fontSize={14} />
            <Typography variant="body2" fontWeight={500} noWrap>
              {payment.toName}
            </Typography>
          </Stack>
        </Stack>

        <Box display={{ md: 'none', lg: 'block' }}>
          <DataColumn
            label="Reference"
            value={payment.reservationId ? `#${payment.reservationId}` : '—'}
            muted={!payment.reservationId}
            width={96}
          />
        </Box>

        <DataColumn
          label="Amount"
          value={formatAmount(payment.amount, isIncoming)}
          align="right"
          valueColor={amountColor}
          valueWeight={700}
          width={100}
        />

        <DataColumn
          label="Date"
          value={formatPaymentDateTime(payment.createdAt)}
          align="center"
          width={150}
        />

        <Icon icon="lucide:chevron-right" fontSize={16} />
      </Stack>

    </PaymentLogCard>
  )
}
