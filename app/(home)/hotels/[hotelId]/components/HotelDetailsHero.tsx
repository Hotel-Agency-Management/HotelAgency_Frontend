'use client'

import type { CSSProperties } from 'react'
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { MapPin, Star } from 'lucide-react'
import type { CustomerHotel } from '../../types/customerHotel'
import { formatReviewCount } from '../../utils/formatters'
import { fallbackCover } from '../constants/hotelRoomProfilesMock'

interface HotelDetailsHeroProps {
  hotel: CustomerHotel | null
  isLoading: boolean
}

export function HotelDetailsHero({ hotel, isLoading }: HotelDetailsHeroProps) {
  const theme = useTheme()
  const coverImage = hotel?.coverImage ?? fallbackCover
  const style = {
    '--customer-hotel-detail-hero-image': `url(${coverImage})`,
  } as CSSProperties

  return (
    <Paper elevation={0} variant="customerHotelDetailHero" style={style}>
      <Stack className="hotel-detail-hero-content" spacing={3}>
        {isLoading || hotel == null ? (
          <Stack spacing={2}>
            <Skeleton variant="rounded" width={88} height={88} />
            <Skeleton variant="rounded" width="62%" height={54} />
            <Skeleton variant="rounded" width="42%" height={24} />
          </Stack>
        ) : (
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} alignItems={{ md: 'center' }}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip label={hotel.tag} size="small" />
                  <Chip
                    label={hotel.isActive ? 'Available now' : 'Opening soon'}
                    size="small"
                    color={hotel.isActive ? 'success' : 'warning'}
                  />
                </Stack>

                <Typography variant="h1">{hotel.name}</Typography>
                <Typography variant="subtitle1">{hotel.agencyName}</Typography>
              </Stack>
            </Stack>

            <Stack
              className="hotel-detail-meta"
              direction={{ xs: 'column', sm: 'row' }}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <MapPin size={18} />
                <Typography>
                  {hotel.address}, {hotel.city}, {hotel.country}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Star size={18} fill="currentColor" />
                <Typography>
                  {hotel.rating} rating · {formatReviewCount(hotel.reviews)} reviews
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {hotel.amenities.map(amenity => (
                <Chip key={amenity} label={amenity} size="small" variant="outlined" />
              ))}
            </Stack>

            <Box>
              <Button
                variant="contained"
                href="#available-rooms"
                sx={{
                  color: theme.palette.getContrastText(theme.palette.secondary.main),
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.tertiary.main} 100%)`,
                }}
              >
                View available rooms
              </Button>
            </Box>
          </Stack>
        )}
      </Stack>
    </Paper>
  )
}
