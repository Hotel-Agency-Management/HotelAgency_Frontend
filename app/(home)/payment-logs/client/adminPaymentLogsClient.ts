import apiClient from '@/core/clients/apiClient'
import type {
  PaymentLogDetails,
  HotelPaymentLogsResponse,
  PaymentLogsParams,
} from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/config/paymentLogsConfig'
import type {
  AdminAllPaymentLogsParams,
  AdminAllPaymentLogsResponse,
} from '../config/adminPaymentLogsConfig'

export type { AdminAllPaymentLogsParams, AdminAllPaymentLogsResponse, PaymentLogsParams }

const getAdminAllPath = () => `/admin/payment-logs`

const getAdminHotelPath = (agencyId: string, hotelId: string) =>
  `/admin/agencies/${agencyId}/hotels/${hotelId}/payment-logs`

const getAdminHotelIncomingPath = (agencyId: string, hotelId: string) =>
  `/admin/agencies/${agencyId}/hotels/${hotelId}/payment-logs/incoming`

const getAdminHotelOutgoingPath = (agencyId: string, hotelId: string) =>
  `/admin/agencies/${agencyId}/hotels/${hotelId}/payment-logs/outgoing`

const getAdminHotelDetailsPath = (agencyId: string, hotelId: string, paymentLogId: number) =>
  `/admin/agencies/${agencyId}/hotels/${hotelId}/payment-logs/${paymentLogId}`

export async function fetchAdminAllPayments(
  params?: AdminAllPaymentLogsParams
): Promise<AdminAllPaymentLogsResponse> {
  const response = await apiClient.get<AdminAllPaymentLogsResponse>(getAdminAllPath(), { params })
  return response.data
}

export async function fetchAdminHotelPayments(
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

export async function fetchAdminHotelIncomingPayments(
  agencyId: string,
  hotelId: string,
  params?: PaymentLogsParams
): Promise<HotelPaymentLogsResponse> {
  const response = await apiClient.get<HotelPaymentLogsResponse>(
    getAdminHotelIncomingPath(agencyId, hotelId),
    { params }
  )
  return response.data
}

export async function fetchAdminHotelOutgoingPayments(
  agencyId: string,
  hotelId: string,
  params?: PaymentLogsParams
): Promise<HotelPaymentLogsResponse> {
  const response = await apiClient.get<HotelPaymentLogsResponse>(
    getAdminHotelOutgoingPath(agencyId, hotelId),
    { params }
  )
  return response.data
}

export async function fetchAdminPaymentLogDetails(
  agencyId: string,
  hotelId: string,
  paymentLogId: number
): Promise<PaymentLogDetails> {
  const response = await apiClient.get<PaymentLogDetails>(
    getAdminHotelDetailsPath(agencyId, hotelId, paymentLogId)
  )
  return response.data
}


