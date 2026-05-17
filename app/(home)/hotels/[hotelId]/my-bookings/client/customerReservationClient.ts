import { buildFormData } from '@/app/(home)/agency/hotels/utils/formData'
import apiClient from '@/core/clients/apiClient'
import type {
  CancelCustomerReservationResponse,
  CreateCustomerReservationRequest,
  CustomerReservationListResponse,
  ReservationDetail,
  UpdateCustomerReservationRequest,
} from '../config'

const getCreatePath = (agencyId: number, hotelId: number) =>
  `/agencies/${agencyId}/hotels/${hotelId}/customers/reservations`
const getListPath = () => `/my-reservations`
const getDetailPath = (id: number) => `/my-reservations/${id}`
const getCancelPath = (id: number) => `/my-reservations/${id}/cancel`
const getUpdatePath = (id: number) => `/my-reservations/${id}`

export async function createCustomerReservation(
  agencyId: number,
  hotelId: number,
  data: CreateCustomerReservationRequest
): Promise<ReservationDetail> {
  const response = await apiClient.post<ReservationDetail>(
    getCreatePath(agencyId, hotelId),
    buildFormData(data),
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}

export async function getMyReservations(
  signal?: AbortSignal
): Promise<CustomerReservationListResponse> {
  const response = await apiClient.get<CustomerReservationListResponse>(getListPath(), { signal })
  return response.data
}

export async function getMyReservationById(id: number): Promise<ReservationDetail> {
  const response = await apiClient.get<ReservationDetail>(getDetailPath(id))
  return response.data
}

export async function cancelMyReservation(
  id: number,
  cancellationReason = 'Customer request'
): Promise<CancelCustomerReservationResponse> {
  const response = await apiClient.patch<CancelCustomerReservationResponse>(getCancelPath(id), {
    cancellationReason,
  })
  return response.data
}

export async function updateMyReservation(
  id: number,
  data: UpdateCustomerReservationRequest
): Promise<ReservationDetail> {
  const response = await apiClient.put<ReservationDetail>(getUpdatePath(id), data)
  return response.data
}
