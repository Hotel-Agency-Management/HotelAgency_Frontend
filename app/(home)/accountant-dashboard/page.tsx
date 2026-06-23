'use client'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/core/context/AuthContext'
import FinancialSummarySection from './components/FinancialSummarySection'
import RevenueAnalyticsSection from './components/RevenueAnalyticsSection'
import CashFlowSection from './components/CashFlowSection'

export default function AccountantDashboardPage() {
  const { user } = useAuth()
  const { t } = useTranslation()

  const hotelId = user?.hotelId ? Number(user.hotelId) : undefined

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
            {t('dashboard.accountant.title', { defaultValue: 'Financial Dashboard' })}
          </Typography>
          <Typography variant="body2">
            {today}{user?.hotelId ? ` · ${t('dashboard.common.hotel', { defaultValue: 'Hotel' })} #${user.hotelId}` : ''}
          </Typography>
        </Stack>

        <Divider />

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.accountant.sections.financialSummary', { defaultValue: 'Financial Summary' })}
          </Typography>
          <FinancialSummarySection hotelId={hotelId} />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.accountant.sections.revenueAnalytics', { defaultValue: 'Revenue Analytics' })}
          </Typography>
          <RevenueAnalyticsSection hotelId={hotelId} />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.accountant.sections.cashFlow', { defaultValue: 'Cash Flow' })}
          </Typography>
          <CashFlowSection hotelId={hotelId} />
        </Stack>
      </Stack>
    </Container>
  )
}
