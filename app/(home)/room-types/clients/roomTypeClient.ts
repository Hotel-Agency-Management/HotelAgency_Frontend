import apiClient from '@/core/clients/apiClient'
import type { RoomType, CreateRoomTypePayload, UpdateRoomTypePayload } from '../types/roomType'

const BASE = '/admin/room-types'

export const getRoomTypes = async (): Promise<RoomType[]> => {
  const response = await apiClient.get<RoomType[]>(BASE)
  return response.data
}

export const getRoomTypeById = async (id: number): Promise<RoomType> => {
  const response = await apiClient.get<RoomType>(`${BASE}/${id}`)
  return response.data
}

export const createRoomType = async (payload: CreateRoomTypePayload): Promise<RoomType> => {
  const response = await apiClient.post<RoomType>(BASE, payload)
  return response.data
}

export const updateRoomType = async ({ id, ...payload }: UpdateRoomTypePayload): Promise<RoomType> => {
  const response = await apiClient.put<RoomType>(`${BASE}/${id}`, payload)
  return response.data
}

export const deleteRoomType = async (id: number): Promise<void> => {
  await apiClient.delete(`${BASE}/${id}`)
}
