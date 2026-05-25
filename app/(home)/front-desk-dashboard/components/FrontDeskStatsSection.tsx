'use client'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SummaryStatCard } from '@/app/(home)/admin-dashboard/components/SummaryStatCard'
import Icon from '@/components/icon/Icon'
import { STAT_CARDS } from '../data/frontDeskMock'
import { STAT_CARD_ICONS } from '../constants/frontDeskConstants'

const CARD_TRANSLATION_KEYS = [
  'pendingCheckIns',
  'pendingCheckOuts',
  'roomsReady',
  'pendingPayments',
] as const

export function FrontDeskStatsSection() {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2.5}>
      {STAT_CARDS.map((card, i) => {
        const key = CARD_TRANSLATION_KEYS[i]
        return (
          <Grid key={card.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <SummaryStatCard
              title={t(`dashboard.frontDesk.stats.${key}.title`, { defaultValue: card.title })}
              value={card.value}
              subtitle={t(`dashboard.frontDesk.stats.${key}.subtitle`, { defaultValue: card.subtitle })}
              color={card.color}
              icon={<Icon icon={STAT_CARD_ICONS[i]} fontSize={20} />}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
