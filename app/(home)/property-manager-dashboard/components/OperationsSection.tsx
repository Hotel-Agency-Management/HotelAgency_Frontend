'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import DoughnutChart from '@/components/charts/DoughnutChart'
import {
  useReservationStatusDistribution,
  useReservationTypeDistribution,
} from '../hooks/queries/useStatistic'

interface OperationsSectionProps {
  hotelId?: number
}

export default function OperationsSection({ hotelId }: OperationsSectionProps) {
  const { t } = useTranslation()
  const { data: reservationStatusDistribution } = useReservationStatusDistribution(hotelId)
  const { data: reservationTypeDistribution } = useReservationTypeDistribution(hotelId)
  const reservationStatusItems = reservationStatusDistribution?.items ?? []
  const reservationTypeItems = reservationTypeDistribution?.items ?? []

  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.propertyManager.charts.reservationStatusDistribution', { defaultValue: 'Reservation Status Distribution' })}</Typography>
              <DoughnutChart
                data={reservationStatusItems.map(item => ({
                  label: t(`dashboard.propertyManager.reservationStatus.${item.status}`, { defaultValue: item.status }),
                  value: item.count,
                }))}
                percentageData={reservationStatusItems.map(item => item.percentage)}
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

      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.propertyManager.charts.bookingTypesDistribution', { defaultValue: 'Booking Types Distribution' })}</Typography>
              <DoughnutChart
                data={reservationTypeItems.map(item => ({
                  label: t(`dashboard.propertyManager.reservationType.${item.type}`, { defaultValue: item.type }),
                  value: item.count,
                }))}
                percentageData={reservationTypeItems.map(item => item.percentage)}
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
    </Grid>
  )
}
