'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import DoughnutChart from '@/components/charts/DoughnutChart'
import GaugeChart from '@/components/charts/GaugeChart'
import { useRoomStatusDistribution, useTicketCompletionRate } from '../hooks/queries/useStatistic'

interface RoomsHousekeepingSectionProps {
  hotelId?: number
}

export default function RoomsHousekeepingSection({ hotelId }: RoomsHousekeepingSectionProps) {
  const { t } = useTranslation()
  const { data: roomStatusDistribution } = useRoomStatusDistribution(hotelId)
  const roomStatusItems = roomStatusDistribution?.items ?? []

  const { data: ticketCompletionRate } = useTicketCompletionRate(hotelId)

  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12, md: 6 }} >
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.propertyManager.charts.roomStatusDistribution', { defaultValue: 'Room Status Distribution' })}</Typography>
              <DoughnutChart
                data={roomStatusItems.map(item => ({
                  label: t(`dashboard.propertyManager.roomStatus.${item.status}`, { defaultValue: item.status }),
                  value: item.count,
                }))}
                percentageData={roomStatusItems.map(item => item.percentage)}
                percentage
                innerRadius={60}

                height={260}
                legendPosition="bottom"
                legendAlign="center"
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }} >
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.propertyManager.charts.ticketCompletionRate', { defaultValue: 'Ticket Completion Rate' })}</Typography>
              <GaugeChart
                value={ticketCompletionRate?.value ?? 0}
                valueMin={0}
                valueMax={100}
                unit="%"
                thresholds={{ low: 40, high: 70 }}
                height={260}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
