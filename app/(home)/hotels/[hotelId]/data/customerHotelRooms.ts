import { CUSTOMER_HOTELS_MOCK } from '../../data/customerHotelsMock'
import { getCustomerHotels } from '../../data/customerHotelsClient'
import { roomsApi } from '@/app/(home)/agency/hotels/[hotelId]/rooms/api/roomApi'
import type { Room } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import type { CustomerHotel } from '../../types/customerHotel'
import { HOTEL_ROOM_PROFILES, DEFAULT_ROOM_PROFILE } from '../constants/hotelRoomProfilesMock'

const getRoomProfile = (hotelId: string) => HOTEL_ROOM_PROFILES[hotelId] ?? DEFAULT_ROOM_PROFILE

export const getCustomerHotelById = async (hotelId: string): Promise<CustomerHotel | null> => {
  try {
    const hotels = await getCustomerHotels()
    return hotels.find(hotel => hotel.id === hotelId) ?? null
  } catch {
    return CUSTOMER_HOTELS_MOCK.find(hotel => hotel.id === hotelId) ?? null
  }
}

export const getCustomerHotelRooms = async (hotelId: string): Promise<Room[]> => {
  const baseRooms = await roomsApi.getAll()
  const profile = getRoomProfile(hotelId)

  return baseRooms.map((room, index) => ({
    ...room,
    id: `${hotelId}-${room.id}`,
    roomNumber: `${profile.roomPrefix}-${room.roomNumber}`,
    description:
      room.description == null || room.description.length === 0
        ? 'A comfortable room prepared for your stay.'
        : room.description,
    amenities: Array.from(new Set([...room.amenities, ...profile.amenities])),
    pricePerNight:
      room.pricePerNight == null
        ? undefined
        : Math.round((room.pricePerNight * profile.priceMultiplier + index * 12) / 5) * 5,
    extendPrice:
      room.extendPrice == null
        ? undefined
        : Math.round((room.extendPrice * profile.priceMultiplier + index * 12) / 5) * 5,
  }))
}

export const getCustomerHotelRoomById = async (
  hotelId: string,
  roomId: string
): Promise<Room | null> => {
  const rooms = await getCustomerHotelRooms(hotelId)
  return rooms.find(room => room.id === roomId) ?? null
}
