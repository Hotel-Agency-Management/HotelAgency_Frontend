import apiClient from '@/core/clients/apiClient'
import {
  CreateRoomRequest,
  UpdateRoomRequest,
  RoomResponse,
  RoomListParams,
  RoomListResponse,
  BASE,
} from '../configs/roomConfig'
import { buildRoomFormData } from '../util/roomFormData'

const getRoomsPath = (hotelId: number) => `${BASE}/${hotelId}/rooms`
const getRoomPath = (hotelId: number, roomId: number) =>
  `${getRoomsPath(hotelId)}/${roomId}`

export async function createRoom(
  hotelId: number,
  data: CreateRoomRequest
): Promise<RoomResponse> {
  const response = await apiClient.post<RoomResponse>(
    getRoomsPath(hotelId),
    buildRoomFormData(data),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return response.data
}

export async function getRoomsByHotel(
  hotelId: number,
  params?: RoomListParams,
  signal?: AbortSignal
): Promise<RoomListResponse> {
  const response = await apiClient.get<RoomListResponse>(getRoomsPath(hotelId), { params, signal })
  return response.data
}

export async function getRoomById(
  hotelId: number,
  roomId: number
): Promise<RoomResponse> {
  const response = await apiClient.get<RoomResponse>(
    getRoomPath(hotelId, roomId)
  )

  return response.data
}

export async function updateRoom(
  hotelId: number,
  roomId: number,
  data: UpdateRoomRequest
): Promise<RoomResponse> {
  const response = await apiClient.put<RoomResponse>(
    getRoomPath(hotelId, roomId),
    buildRoomFormData(data),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return response.data
}

export async function deleteRoom(
  hotelId: number,
  roomId: number
): Promise<void> {
  await apiClient.delete(getRoomPath(hotelId, roomId))
}
