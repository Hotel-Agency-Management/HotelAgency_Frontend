import apiClient from '@/core/clients/apiClient'
import {
  ADMIN_BASE,
  CreateRoomAmenityRequest,
  RoomAmenityResponse,
} from '../configs/roomAmenityConfig'

export async function fetchRoomAmenitiesByAdmin(): Promise<RoomAmenityResponse[]> {
  const response = await apiClient.get<RoomAmenityResponse[]>(ADMIN_BASE)
  return response.data
}

export async function fetchRoomAmenityByIdByAdmin(id: number): Promise<RoomAmenityResponse> {
  const response = await apiClient.get<RoomAmenityResponse>(`${ADMIN_BASE}/${id}`)
  return response.data
}

export async function createRoomAmenityByAdmin(
  data: CreateRoomAmenityRequest
): Promise<RoomAmenityResponse> {
  const response = await apiClient.post<RoomAmenityResponse>(ADMIN_BASE, data)
  return response.data
}

export async function deleteRoomAmenityByAdmin(id: number): Promise<void> {
  await apiClient.delete(`${ADMIN_BASE}/${id}`)
}
