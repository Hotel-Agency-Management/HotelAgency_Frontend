"use client"

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'react-i18next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/core/context/AuthContext'
import DashboardContextBar from '@/components/dashboard/DashboardContextBar'
import PropertyManagerStatsSection from './components/PropertyManagerStatsSection'
import RevenueFinanceSection from './components/RevenueFinanceSection'
import RoomsHousekeepingSection from './components/RoomsHousekeepingSection'
import OperationsSection from './components/OperationsSection'

export default function PropertyManagerDashboardPage() {
  const { user } = useAuth()
  const { t, i18n } = useTranslation()
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

  const today = new Date().toLocaleDateString(i18n.language, {
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
            {t('dashboard.propertyManager.title', { defaultValue: 'Hotel Operations' })}
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

        <PropertyManagerStatsSection hotelId={hotelId} />

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.propertyManager.sections.revenueFinance', { defaultValue: 'Revenue & Finance' })}
          </Typography>
          <RevenueFinanceSection hotelId={hotelId} />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.propertyManager.sections.roomsHousekeeping', { defaultValue: 'Rooms & Housekeeping' })}
          </Typography>
          <RoomsHousekeepingSection hotelId={hotelId} />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.propertyManager.sections.operations', { defaultValue: 'Operations' })}
          </Typography>
          <OperationsSection hotelId={hotelId} />
        </Stack>
      </Stack>
    </Container>
  )
}
