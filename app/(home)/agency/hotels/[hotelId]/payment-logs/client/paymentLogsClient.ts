import apiClient from '@/core/clients/apiClient'
import type {
  HotelPaymentLogsResponse,
  PaymentLogDetails,
  PaymentLogsParams,
} from '../config/paymentLogsConfig'

const getIncomingPath = (hotelId: string) =>
  `/hotels/${hotelId}/payment-logs/incoming`

const getOutgoingPath = (hotelId: string) =>
  `/hotels/${hotelId}/payment-logs/outgoing`

const getDetailsPath = (hotelId: string, paymentLogId: number) =>
  `/hotels/${hotelId}/payment-logs/${paymentLogId}`

export async function getIncomingPayments(
  hotelId: string,
  params?: PaymentLogsParams
): Promise<HotelPaymentLogsResponse> {
  const response = await apiClient.get<HotelPaymentLogsResponse>(
    getIncomingPath(hotelId),
    { params }
  )
  return response.data
}

export async function getOutgoingPayments(
  hotelId: string,
  params?: PaymentLogsParams
): Promise<HotelPaymentLogsResponse> {
  const response = await apiClient.get<HotelPaymentLogsResponse>(
    getOutgoingPath(hotelId),
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
