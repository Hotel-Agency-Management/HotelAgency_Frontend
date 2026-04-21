'use client'

import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material'
import { BedDouble, CheckCircle2 } from 'lucide-react'
import type { Room } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import { ROOM_STATUS } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import { RoomCardImage } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/room/list/grid/RoomCardImage'
import { RoomCardInfo } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/room/list/grid/RoomCardInfo'

interface CustomerRoomCardProps {
  room: Room
  roomTypeName: string
  currency: string
  onRoomClick: (roomId: string) => void
}

export function CustomerRoomCard({ room, roomTypeName, currency, onRoomClick }: CustomerRoomCardProps) {
  const isAvailable = room.status === ROOM_STATUS.AVAILABLE

  return (
    <Card
      variant="customerRoom"
      onClick={() => onRoomClick(room.id)}
      role="link"
      tabIndex={0}
      sx={{ cursor: 'pointer' }}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onRoomClick(room.id)
        }
      }}
    >
      <Stack>
        <RoomCardImage photos={room.photos} title={room.roomNumber} />
        <CardContent>
          <Stack spacing={2}>
            <RoomCardInfo
              roomNumber={room.roomNumber}
              roomTypeName={roomTypeName}
              status={room.status}
              pricePerNight={room.pricePerNight}
              capacity={room.capacity}
              currency={currency}
            />

            {room.description ? (
              <Typography variant="body2" color="text.secondary">
                {room.description}
              </Typography>
            ) : null}

            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip icon={<BedDouble size={14} />} label={room.bedType} size="small" variant="outlined" />
              {room.amenities.slice(0, 3).map(amenity => (
                <Chip key={amenity} label={amenity} size="small" variant="outlined" />
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
              onRoomClick(room.id)
            }}
          >
            {isAvailable ? 'View room details' : 'Not available'}
          </Button>
        </CardActions>
      </Stack>
    </Card>
  )
}
