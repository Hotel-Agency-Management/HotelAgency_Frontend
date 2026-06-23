'use client'

import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import Spinner from '@/components/loaders/Spinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { SummaryStatCard } from '@/app/(home)/admin-dashboard/components/SummaryStatCard'
import { useFinancialSummary } from '../hooks/queries/useAccountantStatistics'
import { LoadingBox } from '../styles/StyledComponents'
import { STAT_CARDS_CONFIG } from '../constants/statCardsConfig'

interface FinancialSummarySectionProps {
  hotelId?: number
}

export default function FinancialSummarySection({ hotelId }: FinancialSummarySectionProps) {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useFinancialSummary(hotelId)

  if (isLoading) {
    return (
      <LoadingBox>
        <Spinner />
      </LoadingBox>
    )
  }

  if (isError) {
    return (
      <ErrorMessage
        message={t('dashboard.accountant.stats.loadError', { defaultValue: 'Failed to load financial summary' })}
      />
    )
  }

  return (
    <Grid container spacing={2.5}>
      {STAT_CARDS_CONFIG.map(({ key, translationKey, defaultTitle, iconName, color }) => (
        <Grid key={key} size={{ xs: 12, sm: 6, md: 4 }}>
          <SummaryStatCard
            title={t(translationKey, { defaultValue: defaultTitle })}
            value={`$${(data?.[key] ?? 0).toLocaleString()}`}
            color={color}
            icon={<Icon icon={iconName} fontSize={20} />}
          />
        </Grid>
      ))}
    </Grid>
  )
}
