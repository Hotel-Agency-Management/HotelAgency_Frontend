import apiClient from '@/core/clients/apiClient'
import type { CustomerHotel, CustomerHotelsApiPayload } from '../types/customerHotel'
import { extractCustomerHotelsPayload, mapCustomerHotelApiResponse } from '../utils/customerHotelMapper'

export const getCustomerHotels = async (): Promise<CustomerHotel[]> => {
  const response = await apiClient.get<CustomerHotelsApiPayload>('/hotels')
  return extractCustomerHotelsPayload(response.data).map(mapCustomerHotelApiResponse)
}
