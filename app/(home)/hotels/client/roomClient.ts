import apiClient from '@/core/clients/apiClient'
import type {
  PublicRoom,
  PublicRoomPhoto,
  PublicRoomsApiPayload,
  PublicRoomsQueryParams,
} from '../types/customerRoom'

export const getPublicRooms = async (
  hotelId: string,
  params?: PublicRoomsQueryParams
): Promise<PublicRoom[]> => {
  const response = await apiClient.get<PublicRoomsApiPayload>(
    `/public/hotels/${hotelId}/rooms`,
    { params }
  )
  return response.data.items
}

export const getPublicRoomById = async (
  hotelId: string,
  roomId: string
): Promise<PublicRoom> => {
  const response = await apiClient.get<PublicRoom>(
    `/public/hotels/${hotelId}/rooms/${roomId}`
  )
  return response.data
}

export const getPublicRoomPhotos = async (
  hotelId: string,
  roomId: string
): Promise<PublicRoomPhoto[]> => {
  const response = await apiClient.get<PublicRoomPhoto[]>(
    `/public/hotels/${hotelId}/rooms/${roomId}/photos`
  )
  return response.data
}
