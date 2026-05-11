import type { PublicRoom } from '../../types/customerRoom'

export const getPublicRoomId = (room: PublicRoom) => String(room.roomId ?? room.id)

export const getPublicRoomTypeName = (room: PublicRoom) =>
  room.roomTypeName ?? room.roomType ?? 'Room'

export const getPublicRoomNightlyRate = (room: PublicRoom) =>
  room.pricePerNight ?? room.dailyPrice

export const getPublicRoomExtendPrice = (room: PublicRoom) =>
  room.extendPrice ?? room.weeklyPrice ?? getPublicRoomNightlyRate(room)

export const getPublicRoomAmenityName = (amenity: PublicRoom['amenities'][number]) =>
  typeof amenity === 'string' ? amenity : amenity.name
