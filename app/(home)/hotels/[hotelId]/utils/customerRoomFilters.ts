import type { Room } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import type { RoomType } from '@/app/(home)/room-types/types/roomType'
import type { CustomerRoomSearchFilters } from '../types/customerHotelDetails'

export const DEFAULT_CUSTOMER_ROOM_SEARCH_FILTERS: CustomerRoomSearchFilters = {
  checkIn: '',
  checkOut: '',
  guests: 2,
  rooms: 1,
  query: '',
  roomTypeId: 'all',
  maxPrice: '',
}

export const filterCustomerRooms = (
  rooms: Room[],
  roomTypes: RoomType[],
  filters: CustomerRoomSearchFilters
) => {
  const query = filters.query.trim().toLowerCase()
  const maxPrice = Number(filters.maxPrice)
  const hasMaxPrice = filters.maxPrice.trim().length > 0 && Number.isFinite(maxPrice)
  const roomTypeNameById = new Map(roomTypes.map(roomType => [roomType.id, roomType.name.toLowerCase()]))

  return rooms.filter(room => {
    const roomTypeName = roomTypeNameById.get(room.roomTypeId) ?? ''
    const matchesQuery =
      query.length === 0 ||
      room.roomNumber.toLowerCase().includes(query) ||
      room.description?.toLowerCase().includes(query) ||
      room.amenities.some(amenity => amenity.toLowerCase().includes(query)) ||
      roomTypeName.includes(query)

    const matchesRoomType = filters.roomTypeId === 'all' || room.roomTypeId === filters.roomTypeId
    const matchesGuests = room.capacity >= filters.guests
    const matchesPrice = !hasMaxPrice || (room.pricePerNight != null && room.pricePerNight <= maxPrice)

    return matchesQuery && matchesRoomType && matchesGuests && matchesPrice
  })
}
