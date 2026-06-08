'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import DoughnutChart from '@/components/charts/DoughnutChart'
import HorizontalBarChart from '@/components/charts/HorizontalBarChart'
import {
  HOUSEKEEPING_TASKS,
  HOUSEKEEPING_LABELS,
} from '../data/propertyManagerDashboardMock'
import { useRoomStatusDistribution } from '../hooks/queries/useStatistic'

interface RoomsHousekeepingSectionProps {
  hotelId?: number
}

export default function RoomsHousekeepingSection({ hotelId }: RoomsHousekeepingSectionProps) {
  const { t } = useTranslation()
  const { data: roomStatusDistribution } = useRoomStatusDistribution(hotelId)
  const roomStatusItems = roomStatusDistribution?.items ?? []

  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12, md: 6 }} >
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.propertyManager.charts.roomStatusDistribution', { defaultValue: 'Room Status Distribution' })}</Typography>
              <DoughnutChart
                data={roomStatusItems.map(item => ({
                  label: item.status,
                  value: item.count,
                }))}
                percentageData={roomStatusItems.map(item => item.percentage)}
                percentage
                innerRadius={60}
                paddingAngle={3}
                cornerRadius={4}
                height={260}
                legendPosition="bottom"
                legendAlign="center"
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      //TODO: replace mock data with real API data when available
      <Grid size={{ xs: 12, md: 6 }} >
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.propertyManager.charts.housekeepingTasksByStatus', { defaultValue: 'Housekeeping Tasks by Status' })}</Typography>
              <HorizontalBarChart
                data={HOUSEKEEPING_TASKS}
                labels={HOUSEKEEPING_LABELS}
                percentage
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
