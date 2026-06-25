'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import DirectionalIcon from '@/components/common/DirectionalIcon'
import { DEFAULT_PAYMENT_TYPE_CONFIG, PAYMENT_TYPE_CONFIG } from '../constants/paymentTypeConfig'
import { formatAmount, formatPaymentDateTime } from '../utils/dateFormat'
import type { PaymentLogItem } from '../config/paymentLogsConfig'
import { DataColumn } from './DataColumn'
import { PaymentDirectionChip } from './PaymentDirectionChip'
import { PaymentLogCard, PaymentTypeAvatar } from '../styles/StyledComponents'

interface PaymentCardProps {
  payment: PaymentLogItem
  selected: boolean
  onClick: (payment: PaymentLogItem) => void
}

export function PaymentCard({ payment, selected, onClick }: PaymentCardProps) {
  const theme = useTheme()
  const { t } = useTranslation()
  const isIncoming = payment.transactionType === 'Incoming'
  const amountColor = isIncoming ? theme.palette.success.main : theme.palette.error.main
  const typeConfig = PAYMENT_TYPE_CONFIG[payment.paymentType] ?? DEFAULT_PAYMENT_TYPE_CONFIG
  const typePalette = theme.palette[typeConfig.color]



  return (
    <PaymentLogCard variant="outlined" selected={selected} onClick={() => onClick(payment)}>

      {/* Mobile layout (xs → sm) */}
      <Stack display={{ xs: 'flex', md: 'none' }} gap={1.5}>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <PaymentTypeAvatar $color={typePalette.main}>
            <Icon icon={typeConfig.icon} fontSize={18} color={typePalette.main} />
          </PaymentTypeAvatar>
          <Stack flex={1} gap={0.25}>
            <Typography variant="caption" color="text.disabled" fontWeight={500}>
              {t("hotelPaymentLogs.card.paymentType", "Payment Type")}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {typeConfig.label}
            </Typography>
          </Stack>
          <DataColumn
            label={t("hotelPaymentLogs.card.amount", "Amount")}
            value={formatAmount(payment.amount, isIncoming)}
            align="right"
            valueColor={amountColor}
            valueWeight={700}
          />
        </Stack>

        <Stack direction="row" alignItems="center" gap={1} sx={{ pl: 7 }}>
          <PaymentDirectionChip direction={payment.transactionType} />
          <Typography variant="body2" fontWeight={500} noWrap flex={1} minWidth={0}>
            {payment.fromName}
          </Typography>
          <DirectionalIcon icon="lucide:arrow-right" fontSize={12} />
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
        <PaymentTypeAvatar $color={typePalette.main}>
          <Icon icon={typeConfig.icon} fontSize={20} color={typePalette.main} />
        </PaymentTypeAvatar>

        <Box width={110}>
          <PaymentDirectionChip direction={payment.transactionType} />
        </Box>

        <DataColumn label={t("hotelPaymentLogs.card.paymentType", "Payment Type")} value={typeConfig.label} valueWeight={600} width={140} />

        <Stack flex={1} rowGap={0.5}>
          <Stack direction="row" alignItems="center" columnGap={1}>
            <Typography variant="caption" color="text.disabled" fontWeight={500} width={120}>
              {t("hotelPaymentLogs.card.from", "From")}
            </Typography>
            <Box sx={{ width: 22 }} />
            <Typography variant="caption" color="text.disabled" fontWeight={500}>
              {t("hotelPaymentLogs.card.to", "To")}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" columnGap={1}>
            <Typography variant="body2" fontWeight={500} width={120} noWrap>
              {payment.fromName}
            </Typography>
            <DirectionalIcon icon="lucide:arrow-right" fontSize={14} />
            <Typography variant="body2" fontWeight={500} noWrap>
              {payment.toName}
            </Typography>
          </Stack>
        </Stack>

        <Box display={{ md: 'none', lg: 'block' }}>
          <DataColumn
            label={t("hotelPaymentLogs.card.reference", "Reference")}
            value={payment.reservationReference || '—'}
            muted={!payment.reservationReference}
            width={96}
          />
        </Box>

        <DataColumn
          label={t("hotelPaymentLogs.card.amount", "Amount")}
          value={formatAmount(payment.amount, isIncoming)}
          align="right"
          valueColor={amountColor}
          valueWeight={700}
          width={100}
        />

        <DataColumn
          label={t("hotelPaymentLogs.card.date", "Date")}
          value={formatPaymentDateTime(payment.createdAt)}
          align="center"
          width={150}
        />

        <DirectionalIcon icon="lucide:chevron-right" fontSize={16} />
      </Stack>

    </PaymentLogCard>
  )
}
