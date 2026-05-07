'use client'

import { Grid } from '@mui/material'
import { SummaryStatCard } from '@/app/(home)/admin-dashboard/components/SummaryStatCard'
import Icon from '@/components/icon/Icon'
import { STAT_CARDS } from '../data/frontDeskMock'
import { STAT_CARD_ICONS } from '../constants/frontDeskConstants'

export function FrontDeskStatsSection() {
  return (
    <Grid container spacing={2.5}>
      {STAT_CARDS.map((card, i) => (
        <Grid key={card.title} size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryStatCard
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            color={card.color}
            icon={<Icon icon={STAT_CARD_ICONS[i]} fontSize={20} />}
          />
        </Grid>
      ))}
    </Grid>
  )
}
