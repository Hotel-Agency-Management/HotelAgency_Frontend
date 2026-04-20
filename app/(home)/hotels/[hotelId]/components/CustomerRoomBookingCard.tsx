'use client'

import { Button, Paper, Rating, Stack, Typography } from '@mui/material'
import { CalendarDays } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import { ROOM_TYPES } from '@/app/(home)/room-types/constants/roomTypes'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import { getRoomDetails } from '../utils/roomBooking'

interface CustomerRoomBookingCardProps {
  room: Pick<RoomProfile, 'type' | 'floorNumber' | 'capacity' | 'pricePerNight' | 'starRating'>
}

export function CustomerRoomBookingCard({ room }: CustomerRoomBookingCardProps) {
  const { t, i18n } = useTranslation()

  const roomType = ROOM_TYPES[room.type]
  const details = getRoomDetails(room, t, i18n.language)

  return (
    <Paper variant="card" sx={{ height: '100%', width: 1 }}>
      <Stack gap={1.75}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Icon icon={roomType.icon} fontSize="small" />
            <Typography variant="subtitle2" color="text.secondary">
              {t('hotelRooms.profile.type')}
            </Typography>
          </Stack>

          <Typography variant="body1" fontWeight={700}>
            {roomType.label}
          </Typography>
        </Stack>

        {details.map(item => (
          <Stack key={item.label} direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2" color="text.secondary">
              {item.label}
            </Typography>

            <Typography variant="body2" fontWeight={600}>
              {item.value}
            </Typography>
          </Stack>
        ))}
        <Stack gap={0.5}>
          <Typography variant="body2" color="text.secondary">
            {t('hotelRooms.profile.stars')}
          </Typography>
          <Rating value={room.starRating} readOnly size="small" />
        </Stack>
        <Button fullWidth variant="contained" startIcon={<CalendarDays size={17} />}>
          Reserve this room
        </Button>
      </Stack>
    </Paper>
  )
}
