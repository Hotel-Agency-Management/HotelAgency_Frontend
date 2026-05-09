import apiClient from '@/core/clients/apiClient'
import type {
  CustomerHotel,
  CustomerHotelsApiPayload,
  PublicHotelsQueryParams,
} from '../types/customerHotel'
import {
  extractCustomerHotelsPayload,
  mapCustomerHotelApiResponse,
} from '../utils/customerHotelMapper'

export const getCustomerHotels = async (
  params?: PublicHotelsQueryParams
): Promise<CustomerHotel[]> => {
  const response = await apiClient.get<CustomerHotelsApiPayload>(
    '/public/hotels',
    { params }
  )

  return extractCustomerHotelsPayload(response.data).map(
    mapCustomerHotelApiResponse
  )
}
