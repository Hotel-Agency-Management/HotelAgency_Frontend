"use client"

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import PropertyManagerStatsSection from './components/PropertyManagerStatsSection'
import RevenueFinanceSection from './components/RevenueFinanceSection'
import RoomsHousekeepingSection from './components/RoomsHousekeepingSection'
import OperationsSection from './components/OperationsSection'

export default function PropertyManagerDashboardPage() {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Container maxWidth="xl">
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Hotel Operations
          </Typography>
          <Typography variant="body2" color="text.disabled">
            {today}
          </Typography>
        </Stack>

        <Divider />

        <PropertyManagerStatsSection />

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Revenue & Finance
          </Typography>
          <RevenueFinanceSection />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Rooms & Housekeeping
          </Typography>
          <RoomsHousekeepingSection />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Operations
          </Typography>
          <OperationsSection />
        </Stack>
      </Stack>
    </Container>
  )
}
