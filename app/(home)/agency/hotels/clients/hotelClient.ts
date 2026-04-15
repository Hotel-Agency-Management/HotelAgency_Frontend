import apiClient from '@/core/clients/apiClient'
import { CreateHotelRequest, UpdateHotelRequest, HotelResponse } from '../configs/hotelConfig'
import { buildFormData } from '../utils/formData'

export const createHotel = async (
  agencyId: number,
  data: CreateHotelRequest
): Promise<HotelResponse> => {
  const response = await apiClient.post<HotelResponse>(
    `/agencies/${agencyId}/hotels`,
    buildFormData(data),
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}

export const getHotels = async (agencyId: number): Promise<HotelResponse[]> => {
  const response = await apiClient.get<HotelResponse[]>(`/agencies/${agencyId}/hotels`)
  return response.data
}

export const getHotelById = async (
  agencyId: number,
  hotelId: number
): Promise<HotelResponse> => {
  const response = await apiClient.get<HotelResponse>(
    `/agencies/${agencyId}/hotels/${hotelId}`
  )
  return response.data
}

export const updateHotel = async (
  agencyId: number,
  hotelId: number,
  data: UpdateHotelRequest
): Promise<HotelResponse> => {
  const response = await apiClient.put<HotelResponse>(
    `/agencies/${agencyId}/hotels/${hotelId}`,
    buildFormData(data),
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}

export const deleteHotel = async (agencyId: number, hotelId: number): Promise<void> => {
  await apiClient.delete(`/agencies/${agencyId}/hotels/${hotelId}`)
}
