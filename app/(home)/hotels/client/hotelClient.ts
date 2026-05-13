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
import { DEFAULT_CUSTOMER_HOTELS_PAGE_SIZE } from '../constants/hotelFilters'

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
    pageSize: meta.pageSize ?? DEFAULT_CUSTOMER_HOTELS_PAGE_SIZE,
    totalCount: meta.totalCount ?? 0,
    totalPages: meta.totalPages ?? 1,
  }
}
