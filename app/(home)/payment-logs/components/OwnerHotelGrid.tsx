'use client'

import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import type { Hotel } from '@/app/(home)/agency/hotels/types/hotel'

interface OwnerHotelGridProps {
  hotels: Hotel[]
  isLoading: boolean
  onSelect: (hotel: Hotel) => void
}

export function OwnerHotelGrid({ hotels, isLoading, onSelect }: OwnerHotelGridProps) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <Skeleton variant="rounded" height={100} />
          </Grid>
        ))}
      </Grid>
    )
  }

  if (hotels.length === 0) {
    return (
      <Stack alignItems="center" justifyContent="center" py={8} gap={1}>
        <Icon icon="lucide:building-2" fontSize={40} />
        <Typography variant="body1" color="text.secondary">
          {t('paymentLogs.noHotels', { defaultValue: 'No hotels found' })}
        </Typography>
      </Stack>
    )
  }

  return (
    <Grid container spacing={2}>
      {hotels.map((hotel) => (
        <Grid key={hotel.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="outlined">
            <CardActionArea onClick={() => onSelect(hotel)}>
              <CardContent>
                <Stack gap={0.5}>
                  <Typography variant="subtitle1" fontWeight={600} noWrap>
                    {hotel.basicInfo.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <Icon icon="lucide:map-pin" fontSize={14} />
                    <Typography variant="caption" color="text.secondary">
                      {hotel.basicInfo.city}, {hotel.basicInfo.country}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
