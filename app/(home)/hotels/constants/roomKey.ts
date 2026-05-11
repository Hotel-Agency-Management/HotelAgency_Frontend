export const publicRoomsQueryKeys = {
  all: (hotelId: string) => ['public-rooms', hotelId] as const,
  detail: (hotelId: string, roomId: string) =>
    ['public-rooms', hotelId, roomId] as const,
  photos: (hotelId: string, roomId: string) =>
    ['public-room-photos', hotelId, roomId] as const,
}
