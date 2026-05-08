"use client"

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import AgencyOwnerStatsSection from './components/AgencyOwnerStatsSection'
import RevenueFinanceSection from './components/RevenueFinanceSection'
import OccupancyBookingSection from './components/OccupancyBookingSection'
import HotelPerformanceSection from './components/HotelPerformanceSection'

export default function AgencyOwnerDashboardPage() {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Container maxWidth="xl" >
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h5" fontWeight={700}>
            Agency Overview
          </Typography>
          <Typography variant="body2" color="text.disabled">
            {today}
          </Typography>
        </Stack>

        <Divider />

        <AgencyOwnerStatsSection />

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            Revenue & Financial Overview
          </Typography>
          <RevenueFinanceSection />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            Occupancy & Booking Analytics
          </Typography>
          <OccupancyBookingSection />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            Hotels Performance
          </Typography>
          <HotelPerformanceSection />
        </Stack>
      </Stack>
    </Container>
  )
}
