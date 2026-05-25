'use client'

import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface HotelRoomsSectionHeaderProps {
  roomsCount: number
  totalRooms: number
}

export function HotelRoomsSectionHeader({ roomsCount, totalRooms }: HotelRoomsSectionHeaderProps) {
  const { t } = useTranslation()

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent='space-between'>
      <Stack spacing={0.5}>
        <Typography variant='overline'>
          {t('hotelPortal.details.availableStays', { defaultValue: 'Available stays' })}
        </Typography>
        <Typography variant='h4'>
          {t('hotelPortal.details.chooseRoom', { defaultValue: 'Choose your room' })}
        </Typography>
      </Stack>
      <Typography color='text.secondary'>
        {t('hotelPortal.details.roomsMatchSearch', {
          count: roomsCount,
          total: totalRooms,
          defaultValue: '{{count}} of {{total}} rooms match your search'
        })}
      </Typography>
    </Stack>
  )
}
