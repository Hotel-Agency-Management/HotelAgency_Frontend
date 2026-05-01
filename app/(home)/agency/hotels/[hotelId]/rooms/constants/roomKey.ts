export const ROOM_QUERY_KEYS = {
  rooms: ['rooms'] as const,
  roomsByHotel: (hotelId: number) => [...ROOM_QUERY_KEYS.rooms, hotelId] as const,
  room: (hotelId: number, roomId: number) =>
    [...ROOM_QUERY_KEYS.roomsByHotel(hotelId), roomId] as const,
  roomPhotos: (hotelId: number, roomId: number) =>
    [...ROOM_QUERY_KEYS.room(hotelId, roomId), 'photos'] as const,
}

export const ADMIN_ROOM_QUERY_KEYS = {
  roomsByHotel: (agencyId: number, hotelId: number) =>
    ['admin', 'rooms', 'hotel', agencyId, hotelId] as const,
  room: (agencyId: number, hotelId: number, roomId: number) =>
    ['admin', 'rooms', agencyId, hotelId, roomId] as const,
  roomPhotos: (agencyId: number, hotelId: number, roomId: number) =>
    ['admin', 'rooms', 'photos', agencyId, hotelId, roomId] as const,
}
