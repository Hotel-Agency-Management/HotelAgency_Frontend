'use client'

import Grid from '@mui/material/Grid'
import Icon from '@/components/icon/Icon'
import { SummaryStatCard } from '../../admin-dashboard/components/SummaryStatCard'
import { STAT_CARDS_CONFIG } from '../constants/statCards'

export default function PropertyManagerStatsSection() {
  return (
    <Grid container spacing={2.5}>
      {STAT_CARDS_CONFIG.map(({ iconName, ...card }) => (
        <Grid key={card.title} size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryStatCard {...card} icon={<Icon icon={iconName} fontSize={20} />} />
        </Grid>
      ))}
    </Grid>
  )
}
