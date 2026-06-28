"use client"

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'react-i18next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/core/context/AuthContext'
import DashboardContextBar from '@/components/dashboard/DashboardContextBar'
import AgencyOwnerStatsSection from './components/AgencyOwnerStatsSection'
import RevenueFinanceSection from './components/RevenueFinanceSection'
import OccupancyBookingSection from './components/OccupancyBookingSection'
import HotelPerformanceSection from './components/HotelPerformanceSection'

export default function AgencyOwnerDashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const urlAgencyId = searchParams.get('agencyId') ? Number(searchParams.get('agencyId')) : undefined
  const agencyId = urlAgencyId ?? (user?.agencyId ? Number(user.agencyId) : undefined)

  const handleAgencyChange = (id: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('agencyId', String(id))
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
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h5" fontWeight={700}>
            {t('dashboard.agencyOwner.title', { defaultValue: 'Agency Overview' })}
          </Typography>
          <Typography variant="body2" color="text.disabled">
            {today}
          </Typography>
        </Stack>

        <Divider />

        <DashboardContextBar
          contextNeeds="agency"
          selectedAgencyId={agencyId}
          onAgencyChange={handleAgencyChange}
          onHotelChange={() => {}}
        />

        <AgencyOwnerStatsSection agencyId={agencyId} />

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.agencyOwner.sections.revenueFinance', { defaultValue: 'Revenue & Financial Overview' })}
          </Typography>
          <RevenueFinanceSection agencyId={agencyId} />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.agencyOwner.sections.occupancyBooking', { defaultValue: 'Occupancy & Booking Analytics' })}
          </Typography>
          <OccupancyBookingSection agencyId={agencyId} />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.agencyOwner.sections.hotelsPerformance', { defaultValue: 'Hotels Performance' })}
          </Typography>
          <HotelPerformanceSection agencyId={agencyId} />
        </Stack>
      </Stack>
    </Container>
  )
}
