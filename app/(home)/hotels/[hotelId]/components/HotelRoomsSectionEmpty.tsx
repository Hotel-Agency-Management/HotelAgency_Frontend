'use client'

import { Button, Paper, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface HotelRoomsSectionEmptyProps {
  onResetFilters: () => void
}

export function HotelRoomsSectionEmpty({ onResetFilters }: HotelRoomsSectionEmptyProps) {
  const { t } = useTranslation()

  return (
    <Paper variant='customerHotelRoomEmpty'>
      <Stack spacing={2} alignItems='center'>
        <Typography variant='h5'>
          {t('hotelPortal.details.noRoomsMatch', { defaultValue: 'No rooms match this search' })}
        </Typography>
        <Typography color='text.secondary'>
          {t('hotelPortal.details.noRoomsMatchHint', {
            defaultValue: 'Try different dates, guest count, room type, or price range.'
          })}
        </Typography>
        <Button variant='outlined' onClick={onResetFilters}>
          {t('hotelPortal.details.resetSearch', { defaultValue: 'Reset search' })}
        </Button>
      </Stack>
    </Paper>
  )
}
