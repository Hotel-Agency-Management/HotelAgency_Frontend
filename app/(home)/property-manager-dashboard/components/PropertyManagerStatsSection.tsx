'use client'

import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import { SummaryStatCard } from '../../admin-dashboard/components/SummaryStatCard'
import { useStatCard } from '../hooks/queries/useStatistic'

interface PropertyManagerStatsSectionProps {
  hotelId?: number
}

export default function PropertyManagerStatsSection({ hotelId }: PropertyManagerStatsSectionProps) {
  const { t } = useTranslation()
  const { data } = useStatCard(hotelId)

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <SummaryStatCard
          title={t('dashboard.propertyManager.stats.totalReservations.title', { defaultValue: 'Total Reservations' })}
          value={data?.totalReservations ?? '-'}
          subtitle={t('dashboard.propertyManager.stats.totalReservations.subtitle', { defaultValue: 'All reservations' })}
          color="primary"
          icon={<Icon icon="tabler:calendar-stats" fontSize={20} />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <SummaryStatCard
          title={t('dashboard.propertyManager.stats.todayCheckIns.title', { defaultValue: "Today's Check-ins" })}
          value={data?.todayCheckIns ?? '-'}
          subtitle={t('dashboard.propertyManager.stats.todayCheckIns.subtitle', { defaultValue: 'Arrivals today' })}
          color="success"
          icon={<Icon icon="tabler:login" fontSize={20} />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <SummaryStatCard
          title={t('dashboard.propertyManager.stats.todayCheckOuts.title', { defaultValue: "Today's Check-outs" })}
          value={data?.todayCheckOuts ?? '-'}
          subtitle={t('dashboard.propertyManager.stats.todayCheckOuts.subtitle', { defaultValue: 'Departures today' })}
          color="info"
          icon={<Icon icon="tabler:logout" fontSize={20} />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <SummaryStatCard
          title={t('dashboard.propertyManager.stats.pendingReservations.title', { defaultValue: 'Pending Reservations' })}
          value={data?.pendingReservations ?? '-'}
          subtitle={t('dashboard.propertyManager.stats.pendingReservations.subtitle', { defaultValue: 'Awaiting confirmation' })}
          color="warning"
          icon={<Icon icon="tabler:clock-hour-4" fontSize={20} />}
        />
      </Grid>
    </Grid>
  )
}
