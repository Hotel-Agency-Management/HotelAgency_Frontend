import apiClient from '@/core/clients/apiClient'
import { CreateHotelRequest, UpdateHotelRequest, HotelResponse } from '../configs/hotelConfig'
import { buildFormData } from '../utils/formData'

export const createHotel = async (data: CreateHotelRequest): Promise<HotelResponse> => {
  const response = await apiClient.post<HotelResponse>(
    `/hotels`,
    buildFormData(data),
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}

export const getHotels = async (): Promise<HotelResponse[]> => {
  const response = await apiClient.get<HotelResponse[]>(`/hotels`)
  return response.data
}

export const getHotelById = async (hotelId: number): Promise<HotelResponse> => {
  const response = await apiClient.get<HotelResponse>(`/hotels/${hotelId}`)
  return response.data
}

export const updateHotel = async (
  hotelId: number,
  data: UpdateHotelRequest
): Promise<HotelResponse> => {
  const response = await apiClient.put<HotelResponse>(
    `/hotels/${hotelId}`,
    buildFormData(data),
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}
