'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import HorizontalBarChart from '@/components/charts/HorizontalBarChart'
import { useRevenuePerHotel } from '../hooks/queries/useStatisticQueries'
import { NoAgencySelectedState } from './NoAgencySelectedState'

export default function HotelPerformanceSection({ agencyId }: { agencyId?: number }) {
  const { t } = useTranslation()
  const revenuePerHotelQuery = useRevenuePerHotel(agencyId)
  const revenuePerHotelData = revenuePerHotelQuery.data ?? []

  if (!agencyId) return <NoAgencySelectedState />

  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12 }}>
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.agencyOwner.charts.revenuePerHotel', { defaultValue: 'Revenue per Hotel' })}</Typography>
              <HorizontalBarChart
                percentage
                data={revenuePerHotelData.map(item => item.revenue)}
                labels={revenuePerHotelData.map(item => item.hotelName)}
                labelWidth={160}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
