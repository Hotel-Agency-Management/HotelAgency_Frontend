'use client'

import { Container, Grid, Stack, Typography } from '@mui/material'
import { FrontDeskStatsSection } from './components/FrontDeskStatsSection'
import { TodayArrivalsWidget } from './components/TodayTimelineSection'
import { AlertsWidget } from './components/FrontDeskPerformanceSection'
import { RoomReadinessDonut } from './components/RoomReadinessSection'
import { GuestRequestsChart } from './components/GuestRequestsChart'
import { WeeklyReservationChart } from './components/WeeklyReservation'

export default function FrontDeskDashboardPage() {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Container maxWidth="xl">
      <Stack spacing={0.5} >
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Front Desk Dashboard
        </Typography>
        <Typography variant="body2" color="text.disabled">
          {today}
        </Typography>
      </Stack>

      <Stack spacing={2.5}>
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
          <Grid size={{ xs: 12, lg: 5 }} >
            <AlertsWidget />
          </Grid>
        </Grid>

      </Stack>
    </Container>
  )
}
