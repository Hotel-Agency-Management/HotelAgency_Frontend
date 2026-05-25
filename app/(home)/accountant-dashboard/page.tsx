'use client'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/core/context/AuthContext'
import FinancialSummarySection from './components/FinancialSummarySection'
import RevenueAnalyticsSection from './components/RevenueAnalyticsSection'
import NetProfitTrendSection from './components/NetProfitTrendSection'
import CashFlowSection from './components/CashFlowSection'
import FinancialAlertsSection from './components/FinancialAlertsSection'

export default function AccountantDashboardPage() {
  const { user } = useAuth()
  const { t } = useTranslation()

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
          <FinancialSummarySection />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.accountant.sections.revenueAnalytics', { defaultValue: 'Revenue Analytics' })}
          </Typography>
          <RevenueAnalyticsSection />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.accountant.sections.netProfitTrend', { defaultValue: 'Net Profit Trend' })}
          </Typography>
          <NetProfitTrendSection />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.accountant.sections.cashFlow', { defaultValue: 'Cash Flow' })}
          </Typography>
          <CashFlowSection />
        </Stack>

        <FinancialAlertsSection />
      </Stack>
    </Container>
  )
}
