import { CUSTOMER_HOTELS_MOCK } from '../../data/customerHotelsMock'
import type { CustomerHotel } from '../../types/customerHotel'
import type { PublicRoom } from '../../types/customerRoom'
import { getCustomerHotels } from '../../client/hotelClient'
import { getPublicRooms, getPublicRoomById } from '../../client/roomClient'

export const getCustomerHotelById = async (hotelId: string): Promise<CustomerHotel | null> => {
  try {
    const hotels = await getCustomerHotels()
    return hotels.find(hotel => hotel.id === hotelId) ?? null
  } catch {
    return CUSTOMER_HOTELS_MOCK.find(hotel => hotel.id === hotelId) ?? null
  }
}

export const getCustomerHotelRooms = async (hotelId: string): Promise<PublicRoom[]> => {
  return getPublicRooms(hotelId)
}

export const getCustomerHotelRoomById = async (
  hotelId: string,
  roomId: string
): Promise<PublicRoom | null> => {
  const result = await getPublicRoomById(hotelId, roomId).catch(() => null);
  return result ?? null;
};
