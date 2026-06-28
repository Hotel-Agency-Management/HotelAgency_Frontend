'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/core/context/AuthContext'
import BarChart from '@/components/charts/BarChart'
import DoughnutChart from '@/components/charts/DoughnutChart'
import {
  useBookingDistribution,
  useReservationByRoomType,
  useStatusDistribution,
} from '../hooks/queries/useStatisticQueries'

export default function OccupancyBookingSection({ agencyId: agencyIdProp }: { agencyId?: number }) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const agencyId = agencyIdProp ?? (user?.agencyId !== undefined ? Number(user.agencyId) : undefined)
  const reservationByRoomTypeQuery = useReservationByRoomType(agencyId)
  const statusDistributionQuery = useStatusDistribution(agencyId)
  const bookingDistributionQuery = useBookingDistribution(agencyId)

  const reservationByRoomTypeData = reservationByRoomTypeQuery.data ?? []
  const statusDistributionData = statusDistributionQuery.data ?? []
  const bookingDistributionData = bookingDistributionQuery.data ?? []

  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12 }}>
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.agencyOwner.charts.reservationsByRoomType', { defaultValue: 'Reservations by Room Type' })}</Typography>
              <BarChart
                data={reservationByRoomTypeData.map(item => item.reservationsCount)}
                labels={reservationByRoomTypeData.map(item => item.roomTypeName)}
                height={240}
                percentage
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 8 }} >
        <Card variant="outlined" sx={{ width: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.agencyOwner.charts.reservationsStatusDistribution', { defaultValue: 'Reservations Status Distribution' })}</Typography>
              <DoughnutChart
                data={statusDistributionData.map(item => ({ label: item.status, value: item.count }))}
                percentageData={statusDistributionData.map(item => item.percentage)}
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

      <Grid size={{ xs: 12, md: 4 }} display="flex">
        <Card variant="outlined" sx={{ width: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.agencyOwner.charts.bookingTypesDistribution', { defaultValue: 'Booking Types Distribution' })}</Typography>
              <DoughnutChart
                data={bookingDistributionData.map(item => ({ label: item.type, value: item.count }))}
                percentageData={bookingDistributionData.map(item => item.percentage)}
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
    </Grid>
  )
}
