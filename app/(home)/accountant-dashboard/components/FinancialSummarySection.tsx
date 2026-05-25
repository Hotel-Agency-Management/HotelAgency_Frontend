'use client'

import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import { SummaryStatCard } from '@/app/(home)/admin-dashboard/components/SummaryStatCard'
import { STAT_CARDS_CONFIG, CARD_TRANSLATION_KEYS } from '../constants/statCards'

export default function FinancialSummarySection() {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2.5}>
      {STAT_CARDS_CONFIG.map(({ iconName, ...card }, i) => {
        const key = CARD_TRANSLATION_KEYS[i]
        const translatedCard = {
          ...card,
          title: t(`dashboard.accountant.stats.${key}.title`, { defaultValue: card.title }),
          subtitle: t(`dashboard.accountant.stats.${key}.subtitle`, { defaultValue: card.subtitle }),
          trend: card.trend
            ? {
                ...card.trend,
                value: t(`dashboard.accountant.stats.${key}.trend`, { defaultValue: card.trend.value }),
              }
            : undefined,
        }
        return (
          <Grid key={card.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <SummaryStatCard
              {...translatedCard}
              icon={<Icon icon={iconName} fontSize={20} />}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
