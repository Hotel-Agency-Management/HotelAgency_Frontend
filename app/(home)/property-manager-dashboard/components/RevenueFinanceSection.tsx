'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import LineChart from '@/components/charts/LineChart'
import { useRevenueTrend, useInsuranceIncomeTrend } from '../hooks/queries/useStatistic'
import { formatMonthLabel } from '../utils/formatMonthLabel'
import { translateMonthLabels } from '@/core/utils/translateMonthLabel'

interface RevenueFinanceSectionProps {
  hotelId?: number
}

export default function RevenueFinanceSection({ hotelId }: RevenueFinanceSectionProps) {
  const { t, i18n } = useTranslation()
  const { data: revenueTrend } = useRevenueTrend(hotelId, 'monthly')
  const revenueTrendItems = revenueTrend?.items ?? []

  const { data: insuranceIncomeTrend } = useInsuranceIncomeTrend(hotelId)
  const insuranceItems = insuranceIncomeTrend ?? []

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.propertyManager.charts.adrTrend', { defaultValue: 'Average Daily Room Rate Trend' })}</Typography>
              <LineChart
                series={[
                  {
                    label: t('dashboard.propertyManager.charts.revenueTrendSeries', { defaultValue: 'Revenue' }),
                    data: revenueTrendItems.map(item => item.revenue),
                  },
                ]}
                labels={translateMonthLabels(revenueTrendItems.map(item => item.label), t)}
                height={240}
                showLegend={false}
                percentage
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.propertyManager.charts.insuranceIncomeTrend', { defaultValue: 'Insurance Incoming Trend' })}</Typography>
              <LineChart
                series={[
                  {
                    label: t('dashboard.propertyManager.charts.insuranceIncomeSeries', { defaultValue: 'Insurance Income' }),
                    data: insuranceItems.map(item => item.value),
                  },
                ]}
                labels={insuranceItems.map(item => formatMonthLabel(item.month, i18n.language))}
                height={240}
                showLegend={false}
                percentage
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
