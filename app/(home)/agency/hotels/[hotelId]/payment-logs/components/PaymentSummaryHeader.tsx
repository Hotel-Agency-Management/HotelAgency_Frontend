'use client'

import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import { StatCard } from './StatCard'

interface PaymentSummaryHeaderProps {
  incomingAmount: number
  incomingCount: number
  outgoingAmount: number
  outgoingCount: number
  isLoading: boolean
  activeTab: number
}

export function PaymentSummaryHeader({
  incomingAmount,
  incomingCount,
  outgoingAmount,
  outgoingCount,
  isLoading,
  activeTab,
}: PaymentSummaryHeaderProps) {
  const { t } = useTranslation()
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <StatCard
          label={t("hotelPaymentLogs.summary.totalIncoming", "Total Incoming")}
          icon="lucide:trending-up"
          amount={incomingAmount}
          count={incomingCount}
          color="success"
          isLoading={isLoading}
          active={activeTab === 0}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <StatCard
          label={t("hotelPaymentLogs.summary.totalOutgoing", "Total Outgoing")}
          icon="lucide:trending-down"
          amount={outgoingAmount}
          count={outgoingCount}
          color="error"
          isLoading={isLoading}
          active={activeTab === 1}
        />
      </Grid>
    </Grid>
  )
}
