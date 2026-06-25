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
  const items = extractCustomerHotelsPayload(payload).map(mapCustomerHotelApiResponse)
  const pageSize = meta.pageSize ?? params?.pageSize ?? DEFAULT_CUSTOMER_HOTELS_PAGE_SIZE
  const totalCount = meta.totalCount ?? items.length

  return {
    items,
    pageNumber: meta.pageNumber ?? 1,
    pageSize,
    totalCount,
    totalPages: meta.totalPages ?? Math.max(1, Math.ceil(totalCount / pageSize)),
  }
}
