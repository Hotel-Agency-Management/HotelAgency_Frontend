'use client'

import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import Spinner from '@/components/loaders/Spinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { SummaryStatCard } from '@/app/(home)/admin-dashboard/components/SummaryStatCard'
import { STAT_CARDS_CONFIG } from '../constants/statCardsConfig'
import { useHousekeepingKpi } from '../hooks/queries/useHousekeepingDashboard'
import { LoadingBox } from '../styles/StyledComponents'

interface HousekeepingStatsSectionProps {
  hotelId?: number
}

export default function HousekeepingStatsSection({ hotelId }: HousekeepingStatsSectionProps) {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useHousekeepingKpi(hotelId)

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
        message={t('dashboard.housekeepingManager.stats.loadError', { defaultValue: 'Failed to load KPI data' })}
      />
    )
  }

  const getValue = (key: (typeof STAT_CARDS_CONFIG)[number]['key']): string | number => {
    if (!data) return '-'
    if (key === 'activeTickets') return data.activeTickets.count
    if (key === 'overdueTickets') return data.overdueTickets.count
    if (key === 'highPriorityTickets') return data.highPriorityTickets.count
    return `${data.completionRate.rate}%`
  }

  return (
    <Grid container spacing={2.5}>
      {STAT_CARDS_CONFIG.map(({ key, translationKey, defaultTitle, iconName, color }) => (
        <Grid key={key} size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryStatCard
            title={t(translationKey, { defaultValue: defaultTitle })}
            value={getValue(key)}
            color={color}
            icon={<Icon icon={iconName} fontSize={20} />}
          />
        </Grid>
      ))}
    </Grid>
  )
}
