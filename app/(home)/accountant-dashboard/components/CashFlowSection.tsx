'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import ChartFactory from '@/components/charts/ChartFactory'
import Spinner from '@/components/loaders/Spinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useBalanceTrend, useCashFlow } from '../hooks/queries/useAccountantStatistics'
import { buildMonthYearLabels } from '@/core/utils/translateMonthLabel'
import { LoadingBox } from '../styles/StyledComponents'

interface CashFlowSectionProps {
  hotelId?: number
}

export default function CashFlowSection({ hotelId }: CashFlowSectionProps) {
  const { t } = useTranslation()

  const cashFlowQuery = useCashFlow(hotelId)
  const balanceTrendQuery = useBalanceTrend(hotelId)

  const isLoading = cashFlowQuery.isLoading || balanceTrendQuery.isLoading
  const isError = cashFlowQuery.isError || balanceTrendQuery.isError

  if (isLoading) {
    return (
      <LoadingBox>
        <Spinner />
      </LoadingBox>
    )
  }

  if (isError) {
    return (
      <ErrorMessage
        message={t('dashboard.accountant.charts.loadError', { defaultValue: 'Failed to load cash flow' })}
      />
    )
  }

  const cashFlowItems = cashFlowQuery.data ?? []
  const balanceTrendItems = balanceTrendQuery.data ?? []

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12 }}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                {t('dashboard.accountant.charts.incomingVsOutgoingCashFlow', { defaultValue: 'Incoming vs Outgoing Cash Flow' })}
              </Typography>
              <ChartFactory
                type="StackedBar"
                series={[
                  { label: 'Incoming', data: cashFlowItems.map(item => item.incoming) },
                  { label: 'Outgoing', data: cashFlowItems.map(item => item.outgoing) },
                ]}
                labels={buildMonthYearLabels(cashFlowItems, t)}
                height={260}
                showLegend
                normalized
                labelRows={2}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12}}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                {t('dashboard.accountant.charts.currentBalanceTrend', { defaultValue: 'Current Balance Trend' })}
              </Typography>
              <ChartFactory
                type="Line"
                series={[{ label: 'Balance', data: balanceTrendItems.map(item => item.balance) }]}
                labels={buildMonthYearLabels(balanceTrendItems, t)}
                height={260}
                showLegend={false}
                percentage
                labelRows={2}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
