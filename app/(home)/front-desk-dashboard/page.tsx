'use client'

import { Container, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/core/context/AuthContext'
import DashboardContextBar from '@/components/dashboard/DashboardContextBar'
import { FrontDeskStatsSection } from './components/FrontDeskStatsSection'
import { TodayArrivalsWidget } from './components/TodayTimelineSection'
import { AlertsWidget } from './components/FrontDeskPerformanceSection'
import { RoomReadinessDonut } from './components/RoomReadinessSection'
import { GuestRequestsChart } from './components/GuestRequestsChart'
import { WeeklyReservationChart } from './components/WeeklyReservation'

export default function FrontDeskDashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const urlAgencyId = searchParams.get('agencyId') ? Number(searchParams.get('agencyId')) : undefined
  const urlHotelId = searchParams.get('hotelId') ? Number(searchParams.get('hotelId')) : undefined

  const agencyId = urlAgencyId ?? (user?.agencyId !== undefined ? Number(user.agencyId) : undefined)
  const userHotelId = user?.hotelId ? Number(user.hotelId) : undefined
  const hotelId = Number.isFinite(urlHotelId) ? urlHotelId : (Number.isFinite(userHotelId) ? userHotelId : undefined)

  const handleAgencyChange = (id: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('agencyId', String(id))
    params.delete('hotelId')
    router.push(`?${params.toString()}`)
  }

  const handleHotelChange = (id: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('hotelId', String(id))
    router.push(`?${params.toString()}`)
  }

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Container maxWidth="xl">
      <Stack spacing={2.5}>
        <Stack spacing={0.5}>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            {t('dashboard.frontDesk.title', { defaultValue: 'Front Desk Dashboard' })}
          </Typography>
          <Typography variant="body2" color="text.disabled">
            {today}{hotelId ? ` · ${t('dashboard.common.hotel', { defaultValue: 'Hotel' })} #${hotelId}` : ''}
          </Typography>
        </Stack>

        <DashboardContextBar
          contextNeeds="hotel"
          selectedAgencyId={agencyId}
          selectedHotelId={hotelId}
          onAgencyChange={handleAgencyChange}
          onHotelChange={handleHotelChange}
        />

        <FrontDeskStatsSection />

        <Grid container spacing={2.5} alignItems="stretch">
          <Grid size={{ xs: 12 }}>
            <WeeklyReservationChart />
          </Grid>
        </Grid>

        <Grid container spacing={2.5} alignItems="stretch">
          <Grid size={{ xs: 12, md: 6 }}>
            <RoomReadinessDonut />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <GuestRequestsChart />
          </Grid>
        </Grid>

        <Grid container spacing={2.5} alignItems="stretch">
          <Grid size={{ xs: 12, lg: 7 }}>
            <TodayArrivalsWidget />
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }}>
            <AlertsWidget />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}
