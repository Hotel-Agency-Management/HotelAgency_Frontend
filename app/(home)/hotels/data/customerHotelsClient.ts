import apiClient from '@/core/clients/apiClient'
import type { CustomerHotel, CustomerHotelsApiPayload } from '../types/customerHotel'
import { extractCustomerHotelsPayload, mapCustomerHotelApiResponse } from '../utils/customerHotelMapper'
import { CUSTOMER_HOTELS_MOCK } from './customerHotelsMock'

const shouldUseMockHotels =
  process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_MOCKS !== 'false'

export const getCustomerHotels = async (): Promise<CustomerHotel[]> => {
  if (shouldUseMockHotels) {
    return CUSTOMER_HOTELS_MOCK
  }

  try {
    const response = await apiClient.get<CustomerHotelsApiPayload>('/hotels')
    return extractCustomerHotelsPayload(response.data).map(mapCustomerHotelApiResponse)
  } catch {
    return CUSTOMER_HOTELS_MOCK
  }
}
