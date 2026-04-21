'use client'

import { useRouter } from 'next/navigation'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material'
import { MapPin, Star } from 'lucide-react'
import FadeIn from '@/components/animation/FadeIn'
import type { CustomerHotel } from '../types/customerHotel'
import { formatReviewCount } from '../utils/formatters'

interface HotelCardProps {
  hotel: CustomerHotel
}

export function HotelCard({ hotel }: HotelCardProps) {
  const router = useRouter()
  const reviews = formatReviewCount(hotel.reviews)
  const hotelPath = `/hotels/${hotel.id}`

  return (
    <Card variant="customerHotel">
      <CardActionArea
        onClick={() => router.push(hotelPath)}
        aria-label={`Open ${hotel.name} rooms`}
      >
        <FadeIn direction="down" distance={12} transition={{ duration: 0.7, delay: 0.12 }}>
          <CardMedia
            image={hotel.coverImage ?? 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80'}
          >
            <Stack
              direction="row"
              spacing={1}
            >
              <Chip
                size="small"
                label={hotel.tag}
              />
              <Chip
                size="small"
                label={hotel.isActive ? 'Available' : 'Opening soon'}
                color={hotel.isActive ? 'success' : 'warning'}
              />
            </Stack>
          </CardMedia>
        </FadeIn>

        <CardContent>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Stack>
              <Typography variant="h6" noWrap>
                {hotel.name}
              </Typography>
              <Typography variant="body2" noWrap>
                {hotel.agencyName}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Star size={17} fill="currentColor" />
              <Typography variant="body2">{hotel.rating}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={0.75} alignItems="center">
            <MapPin size={16} />
            <Typography variant="body2" noWrap>
              {hotel.city}, {hotel.country}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.75}>
            {hotel.amenities.slice(0, 3).map(amenity => (
              <Chip
                key={amenity}
                label={amenity}
                size="small"
                variant="outlined"
              />
            ))}
          </Stack>
        </CardContent>

        <CardActions>
          <Stack spacing={0.5}>
            <Typography variant="caption">
              {reviews} reviews
            </Typography>
            <Typography variant="caption">
              Open hotel to view available rooms
            </Typography>
          </Stack>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
