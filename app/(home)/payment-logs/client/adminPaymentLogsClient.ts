import apiClient from '@/core/clients/apiClient'
import type {
  PaymentLogDetails,
  HotelPaymentLogsResponse,
  PaymentLogsParams,
} from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/config/paymentLogsConfig'

export type { PaymentLogsParams }

const getAdminHotelPath = (agencyId: string, hotelId: string) =>
  `/admin/agencies/${agencyId}/hotels/${hotelId}/payment-logs`

const getAdminHotelDetailsPath = (agencyId: string, hotelId: string, paymentLogId: number) =>
  `/admin/agencies/${agencyId}/hotels/${hotelId}/payment-logs/${paymentLogId}`

export async function getAdminHotelPayments(
  agencyId: string,
  hotelId: string,
  params?: PaymentLogsParams
): Promise<HotelPaymentLogsResponse> {
  const response = await apiClient.get<HotelPaymentLogsResponse>(
    getAdminHotelPath(agencyId, hotelId),
    { params }
  )
  return response.data
}

export async function getAdminPaymentLogDetails(
  agencyId: string,
  hotelId: string,
  paymentLogId: number
): Promise<PaymentLogDetails> {
  const response = await apiClient.get<PaymentLogDetails>(
    getAdminHotelDetailsPath(agencyId, hotelId, paymentLogId)
  )
  return response.data
}
