import apiClient from '@/core/clients/apiClient'
import { CreateHotelRequest, UpdateHotelRequest, HotelResponse, HotelListParams, HotelListResponse } from '../configs/hotelConfig'
import { buildFormData } from '../utils/formData'

export const adminCreateHotel = async (
  agencyId: number,
  data: CreateHotelRequest
): Promise<HotelResponse> => {
  const response = await apiClient.post<HotelResponse>(
    `/admin/agencies/${agencyId}/hotels`,
    buildFormData(data),
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}

export const adminGetHotels = async (agencyId: number, params?: HotelListParams, signal?: AbortSignal): Promise<HotelListResponse> => {
  const response = await apiClient.get<HotelListResponse>(`/admin/agencies/${agencyId}/hotels`, { params, signal })
  return response.data
}

export const adminGetHotelById = async (
  agencyId: number,
  hotelId: number
): Promise<HotelResponse> => {
  const response = await apiClient.get<HotelResponse>(
    `/admin/agencies/${agencyId}/hotels/${hotelId}`
  )
  return response.data
}

export const adminUpdateHotel = async (
  agencyId: number,
  hotelId: number,
  data: UpdateHotelRequest
): Promise<HotelResponse> => {
  const response = await apiClient.put<HotelResponse>(
    `/admin/agencies/${agencyId}/hotels/${hotelId}`,
    buildFormData(data),
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}
