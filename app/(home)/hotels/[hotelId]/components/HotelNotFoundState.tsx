'use client'

import { Button, Paper, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export function HotelNotFoundState() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Paper variant="customerHotelRoomEmpty">
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4">{t('hotelPortal.details.hotelNotFound', 'Hotel not found')}</Typography>
        <Typography color="text.secondary">
          {t('hotelPortal.details.hotelNotFoundHint', 'The hotel may be unavailable or the link is no longer valid.')}
        </Typography>
        <Button variant="contained" onClick={() => router.push('/hotels')}>
          {t('hotelPortal.details.browseHotels', 'Browse hotels')}
        </Button>
      </Stack>
    </Paper>
  )
}
