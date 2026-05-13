import { buildFormData } from '@/app/(home)/agency/hotels/utils/formData'
import apiClient from '@/core/clients/apiClient'
import type {
  CancellationResponse,
  CancelReservationRequest,
  CreateReservationRequest,
  PaginatedReservationsResponse,
  ReservationListParams,
  ReservationResponse,
  UpdateReservationRequest,
} from '../config/reservationConfig'

const BASE = '/admin/agencies'

const getReservationsPath = (agencyId: number, hotelId: number) =>
  `${BASE}/${agencyId}/hotels/${hotelId}/reservations`

const getReservationPath = (agencyId: number, hotelId: number, reservationId: number) =>
  `${getReservationsPath(agencyId, hotelId)}/${reservationId}`

export async function adminCreateReservation(
  agencyId: number,
  hotelId: number,
  data: CreateReservationRequest
): Promise<ReservationResponse> {
  const response = await apiClient.post<ReservationResponse>(
    getReservationsPath(agencyId, hotelId),
    buildFormData(data),
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}

export async function adminGetReservations(
  agencyId: number,
  hotelId: number,
  params?: ReservationListParams,
  signal?: AbortSignal
): Promise<PaginatedReservationsResponse> {
  const response = await apiClient.get<PaginatedReservationsResponse>(
    getReservationsPath(agencyId, hotelId),
    { params, signal }
  )
  return response.data
}

export async function adminGetReservationById(
  agencyId: number,
  hotelId: number,
  reservationId: number
): Promise<ReservationResponse> {
  const response = await apiClient.get<ReservationResponse>(
    getReservationPath(agencyId, hotelId, reservationId)
  )
  return response.data
}

const getAdminHotelReservationsPath = (hotelId: number) =>
  `/admin/hotels/${hotelId}/reservations`

const getAdminHotelReservationPath = (hotelId: number, reservationId: number) =>
  `${getAdminHotelReservationsPath(hotelId)}/${reservationId}`

export async function adminUpdateReservation(
  hotelId: number,
  reservationId: number,
  data: UpdateReservationRequest
): Promise<ReservationResponse> {
  const response = await apiClient.put<ReservationResponse>(
    getAdminHotelReservationPath(hotelId, reservationId),
    data
  )
  return response.data
}

export async function adminCancelReservation(
  hotelId: number,
  reservationId: number,
  data: CancelReservationRequest
): Promise<CancellationResponse> {
  const response = await apiClient.patch<CancellationResponse>(
    `${getAdminHotelReservationPath(hotelId, reservationId)}/cancel`,
    data
  )
  return response.data
}
