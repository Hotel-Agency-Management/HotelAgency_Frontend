import apiClient from '@/core/clients/apiClient'
import type {
  HotelPaymentLogsResponse,
  PaymentLogDetails,
  PaymentLogsParams,
} from '../config/paymentLogsConfig'

const getPaymentLogsPath = (hotelId: string) =>
  `/hotels/${hotelId}/payment-logs`

const getDetailsPath = (hotelId: string, paymentLogId: number) =>
  `/hotels/${hotelId}/payment-logs/${paymentLogId}`

export async function getPaymentLogs(
  hotelId: string,
  params?: PaymentLogsParams
): Promise<HotelPaymentLogsResponse> {
  const response = await apiClient.get<HotelPaymentLogsResponse>(
    getPaymentLogsPath(hotelId),
    { params }
  )
  return response.data
}

export async function getPaymentLogDetails(
  hotelId: string,
  paymentLogId: number
): Promise<PaymentLogDetails> {
  const response = await apiClient.get<PaymentLogDetails>(
    getDetailsPath(hotelId, paymentLogId)
  )
  return response.data
}
