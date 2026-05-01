import apiClient from '@/core/clients/apiClient'
import {
  BASE_ADMIN,
  CreateRoomRequest,
  RoomListItemResponse,
  RoomResponse,
  UpdateRoomRequest,
} from '../configs/roomConfig'
import { buildRoomFormData } from '../util/roomFormData'

export async function adminCreateRoom(
  agencyId: number,
  hotelId: number,
  data: CreateRoomRequest
): Promise<RoomResponse> {
  const response = await apiClient.post<RoomResponse>(
    `${BASE_ADMIN}/${agencyId}/hotels/${hotelId}/rooms`,
    buildRoomFormData(data),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}

export async function adminGetRoomsByHotel(
  agencyId: number,
  hotelId: number
): Promise<RoomListItemResponse[]> {
  const response = await apiClient.get<RoomListItemResponse[]>(
    `${BASE_ADMIN}/${agencyId}/hotels/${hotelId}/rooms`
  )
  return response.data
}

export async function adminGetRoomById(
  agencyId: number,
  hotelId: number,
  roomId: number
): Promise<RoomResponse> {
  const response = await apiClient.get<RoomResponse>(
    `${BASE_ADMIN}/${agencyId}/hotels/${hotelId}/rooms/${roomId}`
  )
  return response.data
}

export async function adminUpdateRoom(
  agencyId: number,
  hotelId: number,
  roomId: number,
  data: UpdateRoomRequest
): Promise<RoomResponse> {
  const response = await apiClient.put<RoomResponse>(
    `${BASE_ADMIN}/${agencyId}/hotels/${hotelId}/rooms/${roomId}`,
    buildRoomFormData(data),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}

export async function adminDeleteRoom(
  agencyId: number,
  hotelId: number,
  roomId: number
): Promise<void> {
  await apiClient.delete(
    `${BASE_ADMIN}/${agencyId}/hotels/${hotelId}/rooms/${roomId}`
  )
}
