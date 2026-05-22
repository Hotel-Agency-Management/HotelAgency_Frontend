'use client'

import { Stack, Typography } from '@mui/material'
import Icon from '@/components/icon/Icon'

export function PaymentEmptyState() {
  return (
    <Stack
      minHeight={320}
      alignItems="center"
      justifyContent="center"
      gap={1.5}
    >
      <Icon icon="lucide:receipt" fontSize={48} />
      <Typography variant="h6">
        No transactions found
      </Typography>
      <Typography variant="body2" color="text.disabled">
        There are no payment records for this period.
      </Typography>
    </Stack>
  )
}
