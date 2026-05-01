import apiClient from '@/core/clients/apiClient'
import { BASE, RoomAmenityResponse } from '../configs/roomAmenityConfig'

export async function getAllRoomAmenities(): Promise<RoomAmenityResponse[]> {
  const response = await apiClient.get<RoomAmenityResponse[]>(BASE)
  return response.data
}

export async function getRoomAmenityById(id: number): Promise<RoomAmenityResponse> {
  const response = await apiClient.get<RoomAmenityResponse>(`${BASE}/${id}`)
  return response.data
}
