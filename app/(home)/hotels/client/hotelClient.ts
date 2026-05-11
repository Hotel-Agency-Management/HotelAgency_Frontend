import apiClient from '@/core/clients/apiClient'
import type {
  CustomerHotelsApiPayload,
  CustomerHotelsResult,
  PublicHotelsQueryParams,
} from '../types/customerHotel'
import {
  extractCustomerHotelsPayload,
  mapCustomerHotelApiResponse,
} from '../utils/customerHotelMapper'

export const getCustomerHotels = async (
  params?: PublicHotelsQueryParams,
  signal?: AbortSignal
): Promise<CustomerHotelsResult> => {
  const response = await apiClient.get<CustomerHotelsApiPayload>('/public/hotels', { params, signal })
  const payload = response.data
  const meta = Array.isArray(payload) ? {} : payload
  return {
    items: extractCustomerHotelsPayload(payload).map(mapCustomerHotelApiResponse),
    pageNumber: meta.pageNumber ?? 1,
    pageSize: meta.pageSize ?? 10,
    totalCount: meta.totalCount ?? 0,
    totalPages: meta.totalPages ?? 1,
  }
}
