'use client'

import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material'
import { BedDouble, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { PublicRoom } from '@/app/(home)/hotels/types/customerRoom'
import type { LegacyRoomStatus } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import { resolveRoomImage } from '@/lib/image-url'
import { RoomCardInfo } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/room/list/grid/RoomCardInfo'
import {
  getPublicRoomAmenityName,
  getPublicRoomId,
  getPublicRoomNightlyRate,
} from '../utils/publicRoomFields'
import {
  RoomCardImageArea,
  RoomCardImg,
  RoomCardPlaceholder,
} from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/room/list/grid/roomGridViewStyles'

interface CustomerRoomCardProps {
  room: PublicRoom
  roomTypeName: string
  currency: string
  onRoomClick: (roomId: string) => void
}

export function CustomerRoomCard({ room, roomTypeName, currency, onRoomClick }: CustomerRoomCardProps) {
  const { t } = useTranslation()
  const isAvailable = room.status.toLowerCase() === 'available'
  const roomId = getPublicRoomId(room)
  const photoUrl = resolveRoomImage(room.mainPhotoUrl ?? room.coverPhotoUrl)

  return (
    <Card
      variant="customerRoom"
      onClick={() => onRoomClick(roomId)}
      role="link"
      tabIndex={0}
      sx={{ cursor: 'pointer' }}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onRoomClick(roomId)
        }
      }}
    >
      <Stack>
        <RoomCardImageArea>
          {photoUrl ? (
            <RoomCardImg src={photoUrl} alt={room.roomNumber} />
          ) : (
            <RoomCardPlaceholder>
              <Typography variant="body2">
                {t('hotelRooms.grid.noPhoto', 'No photo')}
              </Typography>
            </RoomCardPlaceholder>
          )}
        </RoomCardImageArea>

        <CardContent>
          <Stack spacing={2}>
            <RoomCardInfo
              roomNumber={room.roomNumber}
              roomTypeName={roomTypeName}
              status={room.status as LegacyRoomStatus}
              pricePerNight={getPublicRoomNightlyRate(room)}
              capacity={room.capacity}
              currency={currency}
            />

            {room.description ? (
              <Typography variant="body2" color="text.secondary">
                {room.description}
              </Typography>
            ) : null}

            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip icon={<BedDouble size={14} />} label={room.bedType ?? 'Bed'} size="small" variant="outlined" />
              {room.amenities.slice(0, 3).map(amenity => (
                <Chip
                  key={getPublicRoomAmenityName(amenity)}
                  label={getPublicRoomAmenityName(amenity)}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Stack>
          </Stack>
        </CardContent>

        <CardActions>
          <Button
            fullWidth
            variant={isAvailable ? 'contained' : 'outlined'}
            color="primary"
            disabled={!isAvailable}
            startIcon={isAvailable ? <CheckCircle2 size={17} /> : undefined}
            onClick={event => {
              event.stopPropagation()
              onRoomClick(roomId)
            }}
          >
            {isAvailable ? 'View room details' : 'Not available'}
          </Button>
        </CardActions>
      </Stack>
    </Card>
  )
}
