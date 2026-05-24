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
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'

interface HotelGridProps {
  hotels: CustomerHotel[]
  isLoading: boolean
  onSelect: (hotel: CustomerHotel) => void
}

export function HotelGrid({ hotels, isLoading, onSelect }: HotelGridProps) {
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
      {hotels.map((hotel) => {
        const disabled = !hotel.agencyId
        return (
          <Grid key={hotel.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined" sx={{ opacity: disabled ? 0.5 : 1 }}>
              <CardActionArea
                onClick={() => !disabled && onSelect(hotel)}
                disabled={disabled}
              >
                <CardContent>
                  <Stack gap={0.5}>
                    <Typography variant="subtitle1" fontWeight={600} noWrap>
                      {hotel.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                      <Icon icon="lucide:map-pin" fontSize={14} />
                      <Typography variant="caption" color="text.secondary">
                        {hotel.city}, {hotel.country}
                      </Typography>
                    </Stack>
                    {disabled && (
                      <Typography variant="caption" color="text.disabled">
                        {t('paymentLogs.noAgencyLinked', { defaultValue: 'No agency linked' })}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}
