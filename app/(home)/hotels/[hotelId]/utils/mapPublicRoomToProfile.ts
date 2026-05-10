import type { PublicRoom } from '@/app/(home)/hotels/types/customerRoom'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import { inferRoomKindFromTypeName } from '@/app/(home)/agency/hotels/[hotelId]/rooms/util/mapRoomToProfile'
import { resolveRoomImage } from '@/lib/image-url'
import {
  getPublicRoomExtendPrice,
  getPublicRoomId,
  getPublicRoomNightlyRate,
} from './publicRoomFields'

export function mapPublicRoomToProfile(room: PublicRoom, roomTypeName: string): RoomProfile {
  const photoUrl = resolveRoomImage(room.mainPhotoUrl ?? room.coverPhotoUrl)
  const roomId = getPublicRoomId(room)
  const photos = photoUrl
    ? [{ id: roomId, url: photoUrl, isPrimary: true }]
    : []

  return {
    id: roomId,
    roomNumber: room.roomNumber,
    roomTypeName,
    floorNumber: room.floorNumber ?? 0,
    type: inferRoomKindFromTypeName(roomTypeName),
    status: room.status as RoomProfile['status'],
    description: room.description ?? undefined,
    notes: room.notes,
    capacity: room.capacity,
    bedType: room.bedType as RoomProfile['bedType'],
    starRating: room.starRating ?? 0,
    amenities: room.amenities,
    photos,
    pricePerNight: getPublicRoomNightlyRate(room),
    extendPrice: getPublicRoomExtendPrice(room),
    insurance: undefined,
  }
}
