'use client'

import { Avatar, Box, CircularProgress, Divider, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Icon from '@/components/icon/Icon'
import { PaymentTypeChip } from './PaymentTypeChip'
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
  isIncoming: boolean
  open: boolean
  onClose: () => void
}

export function PaymentDetailsDrawer({ payment, isLoading, isIncoming, open, onClose }: PaymentDetailsDrawerProps) {
  const theme = useTheme()
  const amountColor = isIncoming ? theme.palette.success.main : theme.palette.error.main

  return (
    <PaymentDrawerPaper anchor="right" open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={700}>
          Payment Details
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
              <PaymentTypeChip type={payment.paymentType} size="medium" />
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

                <Icon icon="lucide:arrow-right" fontSize={20} />

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
                  label="Reservation"
                  value={payment.reservationReference}
                />
              )}
              <DetailRow icon="lucide:tag" label="Payment Type" value={payment.paymentType} />
              <DetailRow
                icon="lucide:calendar"
                label="Date & Time"
                value={formatPaymentDateTime(payment.createdAt)}
              />
              <DetailRow icon="lucide:hash" label="Payment ID" value={`#${payment.paymentId}`} />
            </Stack>

            <Stack gap={1}>
              <Typography variant="subtitle2" fontWeight={700}>
                Timeline
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
