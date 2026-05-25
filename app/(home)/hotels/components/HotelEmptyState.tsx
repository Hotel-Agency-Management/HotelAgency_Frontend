'use client'

import { Button, Paper, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface HotelEmptyStateProps {
  onReset: () => void
}

export function HotelEmptyState({ onReset }: HotelEmptyStateProps) {
  const { t } = useTranslation()

  return (
    <Paper variant='customerHotelEmpty'>
      <Stack spacing={3} alignItems='center'>
        <Stack spacing={1}>
          <Typography variant='h5'>
            {t('hotelPortal.empty', { defaultValue: 'No hotels match this search.' })}
          </Typography>
          <Typography variant='body2'>
            {t('hotelPortal.emptyHint', { defaultValue: 'Try another destination, budget, or hotel name.' })}
          </Typography>
        </Stack>
        <Button variant='outlined' onClick={onReset}>
          {t('hotelPortal.filters.resetFilters', { defaultValue: 'Reset filters' })}
        </Button>
      </Stack>
    </Paper>
  )
}
