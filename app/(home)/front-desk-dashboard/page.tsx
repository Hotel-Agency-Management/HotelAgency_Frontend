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
      <Stack spacing={0.5} mb={3}>
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
          <Grid size={{ xs: 12 }} sx={{ display: 'flex' }}>
            <WeeklyReservationChart />
          </Grid>
        </Grid>
        
        <Grid container spacing={2.5} alignItems="stretch">
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <RoomReadinessDonut />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <GuestRequestsChart />
          </Grid>
        </Grid>

        <Grid container spacing={2.5} alignItems="stretch">
          <Grid size={{ xs: 12, lg: 7 }} sx={{ display: 'flex' }}>
            <TodayArrivalsWidget />
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }} sx={{ display: 'flex' }}>
            <AlertsWidget />
          </Grid>
        </Grid>

      </Stack>
    </Container>
  )
}
