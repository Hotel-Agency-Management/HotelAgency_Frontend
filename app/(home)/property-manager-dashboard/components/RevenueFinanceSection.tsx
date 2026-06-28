'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import { REVPAR_DATA, MONTHS } from '../data/propertyManagerDashboardMock'
import { translateMonthLabels } from '@/core/utils/translateMonthLabel'
import { useRevenueTrend } from '../hooks/queries/useStatistic'

interface RevenueFinanceSectionProps {
  hotelId?: number
}

export default function RevenueFinanceSection({ hotelId }: RevenueFinanceSectionProps) {
  const { t } = useTranslation()
  const { data: revenueTrend } = useRevenueTrend(hotelId, 'monthly')
  const revenueTrendItems = revenueTrend?.items ?? []

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

      {/* TODO: replace mock data with real API data when available */}
      <Grid size={{ xs: 12 }}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.propertyManager.charts.revpar', { defaultValue: 'Revenue per Available Room' })}</Typography>
              <BarChart
                data={REVPAR_DATA}
                labels={translateMonthLabels(MONTHS, t)}
                height={240}
                percentage
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
