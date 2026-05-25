'use client'

import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import { SummaryStatCard } from '../../admin-dashboard/components/SummaryStatCard'
import { STAT_CARDS_CONFIG } from '../constants/statCards'

const CARD_TRANSLATION_KEYS = [
  'occupancyRate',
  'checkIns',
  'checkOuts',
  'pendingMaintenance',
] as const

export default function PropertyManagerStatsSection() {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2.5}>
      {STAT_CARDS_CONFIG.map(({ iconName, ...card }, i) => {
        const key = CARD_TRANSLATION_KEYS[i]
        const translatedCard = {
          ...card,
          title: t(`dashboard.propertyManager.stats.${key}.title`, { defaultValue: card.title }),
          subtitle: t(`dashboard.propertyManager.stats.${key}.subtitle`, { defaultValue: card.subtitle }),
          trend: card.trend
            ? {
                ...card.trend,
                value: t(`dashboard.propertyManager.stats.${key}.trend`, { defaultValue: card.trend.value }),
              }
            : undefined,
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
