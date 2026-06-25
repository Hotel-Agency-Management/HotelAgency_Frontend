'use client'

import { Avatar, Box, CircularProgress, Divider, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import DirectionalIcon from '@/components/common/DirectionalIcon'
import { PaymentTypeChip } from './PaymentTypeChip'
import { PaymentDirectionChip } from './PaymentDirectionChip'
import { DetailRow } from './DetailRow'
import {
  PaymentDrawerPaper,
  TimelineDot,
  TimelineConnector,
} from '../styles/StyledComponents'
import { formatAmount, formatPaymentDateTime } from '../utils/dateFormat'
import { getInitials } from '../utils/getInitials'
import type { PaymentLogDetails } from '../config/paymentLogsConfig'

interface PaymentDetailsDrawerProps {
  payment: PaymentLogDetails | null
  isLoading?: boolean
  open: boolean
  onClose: () => void
}

export function PaymentDetailsDrawer({ payment, isLoading, open, onClose }: PaymentDetailsDrawerProps) {
  const theme = useTheme()
  const { t } = useTranslation()
  const isIncoming = payment?.transactionType === 'Incoming'
  const amountColor = isIncoming ? theme.palette.success.main : theme.palette.error.main

  return (
    <PaymentDrawerPaper anchor="right" open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={700}>
          {t("hotelPaymentLogs.drawer.title", "Payment Details")}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Icon icon="lucide:x" fontSize={18} />
        </IconButton>
      </Stack>

      <Divider />

      {isLoading && !payment && (
        <Stack flex={1} alignItems="center" justifyContent="center">
          <CircularProgress size={32} />
        </Stack>
      )}

      {payment && (
        <Box flex={1} overflow="auto">
          <Stack gap={3}>
            <Stack gap={1.5}>
              <Stack direction="row" gap={1}>
                <PaymentDirectionChip direction={payment.transactionType} size="medium" />
                <PaymentTypeChip type={payment.paymentType} size="medium" />
              </Stack>
              <Typography variant="h5" fontWeight={800} sx={{ color: amountColor }}>
                {formatAmount(payment.amount, isIncoming)}
              </Typography>

              <Stack direction="row" alignItems="center" gap={2}>
                <Stack alignItems="center" gap={0.5}>
                  <Avatar sx={{ width: 40, height: 40 }}>{getInitials(payment.fromName)}</Avatar>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {payment.fromName}
                  </Typography>
                </Stack>

                <DirectionalIcon icon="lucide:arrow-right" fontSize={20} />

                <Stack alignItems="center" gap={0.5}>
                  <Avatar sx={{ width: 40, height: 40 }}>{getInitials(payment.toName)}</Avatar>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {payment.toName}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Stack>
              {payment.reservationReference && (
                <DetailRow
                  icon="lucide:link"
                  label={t("hotelPaymentLogs.drawer.reservation", "Reservation")}
                  value={payment.reservationReference}
                />
              )}
              <DetailRow icon="lucide:tag" label={t("hotelPaymentLogs.drawer.paymentType", "Payment Type")} value={payment.paymentType} />
              <DetailRow
                icon="lucide:calendar"
                label={t("hotelPaymentLogs.drawer.dateTime", "Date & Time")}
                value={formatPaymentDateTime(payment.createdAt)}
              />
              <DetailRow icon="lucide:hash" label={t("hotelPaymentLogs.drawer.paymentId", "Payment ID")} value={`#${payment.paymentId}`} />
            </Stack>

            <Stack gap={1}>
              <Typography variant="subtitle2" fontWeight={700}>
                {t("hotelPaymentLogs.drawer.timeline", "Timeline")}
              </Typography>
              <Stack direction="row" gap={1.5}>
                <Stack alignItems="center">
                  {payment.timeline.map((_, index) => (
                    <Stack key={index} alignItems="center">
                      <TimelineDot active />
                      {index < payment.timeline.length - 1 && <TimelineConnector />}
                    </Stack>
                  ))}
                </Stack>
                <Stack gap={2} flex={1}>
                  {payment.timeline.map((event, index) => (
                    <Stack key={index} gap={0.25}>
                      <Typography variant="body2" fontWeight={500}>
                        {event.event}
                      </Typography>
                      <Typography variant="caption">
                        {formatPaymentDateTime(event.occurredAt)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      )}
    </PaymentDrawerPaper>
  )
}
