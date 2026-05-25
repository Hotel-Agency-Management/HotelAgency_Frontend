'use client'

import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'

export function PaymentEmptyState() {
  const { t } = useTranslation()
  return (
    <Stack
      minHeight={320}
      alignItems="center"
      justifyContent="center"
      gap={1.5}
    >
      <Icon icon="lucide:receipt" fontSize={48} />
      <Typography variant="h6">
        {t("hotelPaymentLogs.empty.title", "No transactions found")}
      </Typography>
      <Typography variant="body2" color="text.disabled">
        {t("hotelPaymentLogs.empty.subtitle", "There are no payment records for this period.")}
      </Typography>
    </Stack>
  )
}
