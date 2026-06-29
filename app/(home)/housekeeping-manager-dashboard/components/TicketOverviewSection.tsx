'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import ChartFactory from '@/components/charts/ChartFactory'
import HeatmapChart from '@/components/charts/HeatmapChart'
import Spinner from '@/components/loaders/Spinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import {
  useOpenTicketsOverTime,
  useTicketCompletionRate,
  useTicketStatusDistribution,
} from '../hooks/queries/useHousekeepingDashboard'
import { LoadingBox } from '../styles/StyledComponents'
import { buildOpenTicketsHeatmap } from '../utils/heatmapTransform'

interface TicketOverviewSectionProps {
  hotelId?: number
}

export default function TicketOverviewSection({ hotelId }: TicketOverviewSectionProps) {
  const { t, i18n } = useTranslation()

  const statusQuery = useTicketStatusDistribution(hotelId)
  const completionRateQuery = useTicketCompletionRate(hotelId)
  const openOverTimeQuery = useOpenTicketsOverTime(hotelId)

  const isLoading = statusQuery.isLoading || completionRateQuery.isLoading || openOverTimeQuery.isLoading
  const isError = statusQuery.isError || completionRateQuery.isError || openOverTimeQuery.isError

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
        message={t('dashboard.housekeepingManager.overview.loadError', { defaultValue: 'Failed to load ticket overview' })}
      />
    )
  }

  const statusItems = statusQuery.data?.items ?? []
  const completionValue = completionRateQuery.data?.value ?? 0

  const heatmapLabels = {
    dayLabels: [
      t('dashboard.housekeepingManager.heatmap.days.sun', { defaultValue: 'Sun' }),
      t('dashboard.housekeepingManager.heatmap.days.mon', { defaultValue: 'Mon' }),
      t('dashboard.housekeepingManager.heatmap.days.tue', { defaultValue: 'Tue' }),
      t('dashboard.housekeepingManager.heatmap.days.wed', { defaultValue: 'Wed' }),
      t('dashboard.housekeepingManager.heatmap.days.thu', { defaultValue: 'Thu' }),
      t('dashboard.housekeepingManager.heatmap.days.fri', { defaultValue: 'Fri' }),
      t('dashboard.housekeepingManager.heatmap.days.sat', { defaultValue: 'Sat' }),
    ],
    monthLabels: [
      t('dashboard.housekeepingManager.heatmap.months.jan', { defaultValue: 'Jan' }),
      t('dashboard.housekeepingManager.heatmap.months.feb', { defaultValue: 'Feb' }),
      t('dashboard.housekeepingManager.heatmap.months.mar', { defaultValue: 'Mar' }),
      t('dashboard.housekeepingManager.heatmap.months.apr', { defaultValue: 'Apr' }),
      t('dashboard.housekeepingManager.heatmap.months.may', { defaultValue: 'May' }),
      t('dashboard.housekeepingManager.heatmap.months.jun', { defaultValue: 'Jun' }),
      t('dashboard.housekeepingManager.heatmap.months.jul', { defaultValue: 'Jul' }),
      t('dashboard.housekeepingManager.heatmap.months.aug', { defaultValue: 'Aug' }),
      t('dashboard.housekeepingManager.heatmap.months.sep', { defaultValue: 'Sep' }),
      t('dashboard.housekeepingManager.heatmap.months.oct', { defaultValue: 'Oct' }),
      t('dashboard.housekeepingManager.heatmap.months.nov', { defaultValue: 'Nov' }),
      t('dashboard.housekeepingManager.heatmap.months.dec', { defaultValue: 'Dec' }),
    ],
    openLabel: t('dashboard.housekeepingManager.heatmap.openLabel', { defaultValue: 'open' }),
    dayBeforeMonth: i18n.dir() === 'rtl',
  }

  const heatmap = buildOpenTicketsHeatmap(openOverTimeQuery.data?.series ?? [], heatmapLabels)

  return (
    <Stack spacing={2.5}>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {t('dashboard.housekeepingManager.charts.ticketStatusDistribution', {
                    defaultValue: 'Ticket Status Distribution',
                  })}
                </Typography>
                <ChartFactory
                  type="Doughnut"
                  data={statusItems.map(item => ({ label: item.status, value: item.count }))}
                  percentageData={statusItems.map(item => item.percentage)}
                  innerRadius={60}
                  paddingAngle={3}
                  cornerRadius={4}
                  height={260}
                  showLegend
                  legendPosition="bottom"
                  legendAlign="center"
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
                  {t('dashboard.housekeepingManager.charts.ticketCompletionRate', {
                    defaultValue: 'Ticket Completion Rate',
                  })}
                </Typography>
                <Stack flex={1} alignItems="center" justifyContent="center">
                  <ChartFactory
                    type="Gauge"
                    value={completionValue}
                    valueMin={0}
                    valueMax={100}
                    unit="%"
                    thresholds={{ low: 40, high: 70 }}
                    height={220}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              {t('dashboard.housekeepingManager.charts.openTicketsOverTime', {
                defaultValue: 'Open Tickets Over Time',
              })}
            </Typography>
            <HeatmapChart
              data={heatmap.data}
              rowLabels={heatmap.rowLabels}
              colLabels={heatmap.colLabels}
              tooltipLabels={heatmap.tooltipLabels}
              maskedCells={heatmap.maskedCells}
              cellSize={40}
              gap={4}
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
