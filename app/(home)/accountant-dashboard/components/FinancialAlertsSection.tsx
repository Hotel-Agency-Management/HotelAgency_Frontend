'use client'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { useTranslation } from 'react-i18next'
import FinancialAlertCard from './FinancialAlertCard'
import { FINANCIAL_ALERTS } from '../data/accountantDashboardMock'

export default function FinancialAlertsSection() {
  const { t } = useTranslation()

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Typography variant="h6" fontWeight={600}>
          {t('dashboard.accountant.financialAlerts.title', { defaultValue: 'Financial Alerts' })}
        </Typography>
        <Chip
          label={FINANCIAL_ALERTS.length}
          size="small"
          color="error"
          sx={{ fontWeight: 700, minWidth: 28 }}
        />
      </Stack>

      <Grid container spacing={2}>
        {FINANCIAL_ALERTS.map((alert) => (
          <Grid key={alert.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <FinancialAlertCard alert={alert} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
