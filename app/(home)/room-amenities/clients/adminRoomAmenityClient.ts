import apiClient from '@/core/clients/apiClient'
import {
  ADMIN_BASE,
  CreateRoomAmenityRequest,
  RoomAmenityResponse,
} from '../configs/roomAmenityConfig'

export async function adminGetAllRoomAmenities(): Promise<RoomAmenityResponse[]> {
  const response = await apiClient.get<RoomAmenityResponse[]>(ADMIN_BASE)
  return response.data
}

export async function adminGetRoomAmenityById(id: number): Promise<RoomAmenityResponse> {
  const response = await apiClient.get<RoomAmenityResponse>(`${ADMIN_BASE}/${id}`)
  return response.data
}

export async function adminCreateRoomAmenity(
  data: CreateRoomAmenityRequest
): Promise<RoomAmenityResponse> {
  const response = await apiClient.post<RoomAmenityResponse>(ADMIN_BASE, data)
  return response.data
}

export async function adminDeleteRoomAmenity(id: number): Promise<void> {
  await apiClient.delete(`${ADMIN_BASE}/${id}`)
}
