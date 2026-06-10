'use client'

import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/core/context/AuthContext'
import Icon from '@/components/icon/Icon'
import { SummaryStatCard } from '../../admin-dashboard/components/SummaryStatCard'
import { STAT_CARDS_CONFIG } from '../constants/statCards'
import { useOverviewStats } from '../hooks/queries/useStatisticQueries'

const CARD_TRANSLATION_KEYS = [
  'totalRevenue',
  'totalBookings',
  'pendingReservations',
  'averageBookingValue',
] as const

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export default function AgencyOwnerStatsSection() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const agencyId = user?.agencyId === undefined ? undefined : Number(user.agencyId)
  const { data } = useOverviewStats(agencyId)

  const getCardValue = (key: (typeof STAT_CARDS_CONFIG)[number]['key']) => {
    if (key === 'totalRevenue' || key === 'averageBookingValue') {
      return currencyFormatter.format(data?.[key] ?? 0)
    }

    return data?.[key] ?? 0
  }

  return (
    <Grid container spacing={2.5}>
      {STAT_CARDS_CONFIG.map(({ iconName, key: cardKey, ...card }, i) => {
        const key = CARD_TRANSLATION_KEYS[i]
        const translatedCard = {
          ...card,
          value: getCardValue(cardKey),
          title: t(`dashboard.agencyOwner.stats.${key}.title`, { defaultValue: card.title }),
        }
        return (
          <Grid key={card.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <SummaryStatCard {...translatedCard} icon={<Icon icon={iconName} fontSize={20} />} />
          </Grid>
        )
      })}
    </Grid>
  )
}
