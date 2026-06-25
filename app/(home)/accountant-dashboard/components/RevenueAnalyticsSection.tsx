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
import {
  useRefundImpact,
  useRevenueByType,
  useRevenueExpenses,
  useRevenueGrowth,
} from '../hooks/queries/useAccountantStatistics'
import { LoadingBox } from '../styles/StyledComponents'

interface RevenueAnalyticsSectionProps {
  hotelId?: number
}

export default function RevenueAnalyticsSection({ hotelId }: RevenueAnalyticsSectionProps) {
  const { t } = useTranslation()

  const revenueExpensesQuery = useRevenueExpenses(hotelId)
  const revenueByTypeQuery = useRevenueByType(hotelId)
  const refundImpactQuery = useRefundImpact(hotelId)
  const revenueGrowthQuery = useRevenueGrowth(hotelId)

  const isLoading =
    revenueExpensesQuery.isLoading ||
    revenueByTypeQuery.isLoading ||
    refundImpactQuery.isLoading ||
    revenueGrowthQuery.isLoading

  const isError =
    revenueExpensesQuery.isError ||
    revenueByTypeQuery.isError ||
    refundImpactQuery.isError ||
    revenueGrowthQuery.isError

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
        message={t('dashboard.accountant.charts.loadError', { defaultValue: 'Failed to load revenue analytics' })}
      />
    )
  }

  const revenueExpensesItems = revenueExpensesQuery.data?.data ?? []
  const revenueByTypeItems = revenueByTypeQuery.data ?? []
  const refundImpact = refundImpactQuery.data
  const revenueGrowth = revenueGrowthQuery.data

  return (
    <Stack spacing={2.5}>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              {t('dashboard.accountant.charts.revenueVsExpenses', { defaultValue: 'Revenue vs Expenses' })}
            </Typography>
            <ChartFactory
              type="Area"
              series={[
                { label: 'Revenue', data: revenueExpensesItems.map(item => item.revenue) },
                { label: 'Expenses', data: revenueExpensesItems.map(item => item.expenses) },
              ]}
              labels={revenueExpensesItems.map(item => item.month)}
              height={280}
              showLegend
              percentage
            />
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {t('dashboard.accountant.charts.revenueByPaymentType', { defaultValue: 'Revenue by Payment Type' })}
                </Typography>
                <ChartFactory
                  type="Bar"
                  data={revenueByTypeItems.map(item => item.revenue)}
                  labels={revenueByTypeItems.map(item => item.paymentType)}
                  height={300}
                  percentage
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {t('dashboard.accountant.charts.refundImpact', { defaultValue: 'Refund Impact' })}
                </Typography>
                <ChartFactory
                  type="Doughnut"
                  data={[
                    { label: 'Paid Revenue', value: refundImpact?.paidRevenue ?? 0 },
                    { label: 'Refund', value: refundImpact?.refundAmount ?? 0 },
                    { label: 'Cancellation Loss', value: refundImpact?.cancellationLoss ?? 0 },
                  ]}
                  height={300}
                  showLegend
                  legendPosition="bottom"
                  legendAlign="center"
                  percentage
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%' }}>
              <Stack spacing={2} sx={{ height: '100%' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {t('dashboard.accountant.charts.revenueGrowth', { defaultValue: 'Revenue Growth' })}
                </Typography>
                <Stack
                  flex={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  <ChartFactory
                    type="Gauge"
                    value={revenueGrowth?.gaugeScore ?? 0}
                    valueMin={-20}
                    valueMax={100}
                    unit="%"
                    thresholds={{ low: 20, high: 50 }}
                    height={220}
                  />
                  <Typography variant="caption" align="center" display="block" mt={0.5}>
                    {t('dashboard.accountant.charts.comparedToLastMonth', { defaultValue: 'Compared to last month' })}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}
