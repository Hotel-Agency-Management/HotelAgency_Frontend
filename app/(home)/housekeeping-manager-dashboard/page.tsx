'use client'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'react-i18next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/core/context/AuthContext'
import DashboardContextBar from '@/components/dashboard/DashboardContextBar'
import HousekeepingStatsSection from './components/HousekeepingStatsSection'
import TicketOverviewSection from './components/TicketOverviewSection'
import TicketBreakdownSection from './components/TicketBreakdownSection'

export default function HousekeepingManagerDashboardPage() {
  const { user } = useAuth()
  const { t } = useTranslation()
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
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="h5" fontWeight={700}>
            {t('dashboard.housekeepingManager.title', { defaultValue: 'Housekeeping Dashboard' })}
          </Typography>
          <Typography variant="body2">
            {today}{hotelId ? ` · ${t('dashboard.common.hotel', { defaultValue: 'Hotel' })} #${hotelId}` : ''}
          </Typography>
        </Stack>

        <Divider />

        <DashboardContextBar
          contextNeeds="hotel"
          selectedAgencyId={agencyId}
          selectedHotelId={hotelId}
          onAgencyChange={handleAgencyChange}
          onHotelChange={handleHotelChange}
        />

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.housekeepingManager.sections.kpi', { defaultValue: 'Key Metrics' })}
          </Typography>
          <HousekeepingStatsSection hotelId={hotelId} />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.housekeepingManager.sections.ticketOverview', { defaultValue: 'Ticket Overview' })}
          </Typography>
          <TicketOverviewSection hotelId={hotelId} />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.housekeepingManager.sections.ticketBreakdown', { defaultValue: 'Ticket Breakdown' })}
          </Typography>
          <TicketBreakdownSection hotelId={hotelId} />
        </Stack>
      </Stack>
    </Container>
  )
}
