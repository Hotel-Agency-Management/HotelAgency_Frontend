import type { PublicRoom } from '../../types/customerRoom'
import type { CustomerRoomSearchFilters } from '../types/customerHotelDetails'
import {
  getPublicRoomAmenityName,
  getPublicRoomNightlyRate,
  getPublicRoomTypeName,
} from './publicRoomFields'

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
  rooms: PublicRoom[],
  filters: CustomerRoomSearchFilters
) => {
  const query = filters.query.trim().toLowerCase()
  const maxPrice = Number(filters.maxPrice)
  const hasMaxPrice = filters.maxPrice.trim().length > 0 && Number.isFinite(maxPrice)
  return rooms.filter(room => {
    const roomTypeName = getPublicRoomTypeName(room).toLowerCase()
    const nightlyRate = getPublicRoomNightlyRate(room)
    const matchesQuery =
      query.length === 0 ||
      room.roomNumber.toLowerCase().includes(query) ||
      room.description?.toLowerCase().includes(query) ||
      room.amenities.some(amenity =>
        getPublicRoomAmenityName(amenity).toLowerCase().includes(query)
      ) ||
      roomTypeName.includes(query)

    const matchesRoomType =
      filters.roomTypeId === 'all' ||
      roomTypeName === filters.roomTypeId.toLowerCase()
    const matchesGuests = room.capacity >= filters.guests
    const matchesPrice = !hasMaxPrice || (nightlyRate != null && nightlyRate <= maxPrice)

    return matchesQuery && matchesRoomType && matchesGuests && matchesPrice
  })
}
