'use client'

import { Paper, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TypewriterText } from '@/components/animation'
import { heroStyle } from '../constants/hotelFilters'

export function HotelsHero() {
  const { t } = useTranslation()

  return (
    <Paper elevation={0} variant='customerHotelHero' style={heroStyle}>
      <Stack spacing={2}>
        <Typography variant='overline'>
          {t('hotelPortal.hero.overline', { defaultValue: 'Worldwide stays' })}
        </Typography>
        <TypewriterText
          variant='h1'
          text={t('hotelPortal.hero.title', { defaultValue: 'Your next hotel starts anywhere.' })}
        />
        <Typography>
          {t('hotelPortal.hero.subtitle', {
            defaultValue: 'Compare verified hotels from every partner agency in one place.'
          })}
        </Typography>
      </Stack>
    </Paper>
  )
}
