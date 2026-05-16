import { buildFormData } from "@/app/(home)/agency/hotels/utils/formData"
import apiClient from "@/core/clients/apiClient"
import {
  CancellationResponse,
  CancelReservationRequest,
  CreateReservationRequest,
  PaginatedReservationsResponse,
  ReservationListParams,
  ReservationResponse,
  UpdateReservationRequest,
} from "../config/reservationConfig"

const BASE_RESERVATIONS = '/hotels'

export async function createReservation(
  hotelId: number,
  data: CreateReservationRequest
): Promise<ReservationResponse> {
  const response = await apiClient.post<ReservationResponse>(
    `${BASE_RESERVATIONS}/${hotelId}/reservations`,
    buildFormData(data),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}

export async function getReservations(
  hotelId: number,
  params?: ReservationListParams,
  signal?: AbortSignal
): Promise<PaginatedReservationsResponse> {
  const response = await apiClient.get<PaginatedReservationsResponse>(
    `${BASE_RESERVATIONS}/${hotelId}/reservations`,
    { params, signal }
  )
  return response.data
}

export async function getReservationById(
  hotelId: number,
  reservationId: number
): Promise<ReservationResponse> {
  const response = await apiClient.get<ReservationResponse>(
    `${BASE_RESERVATIONS}/${hotelId}/reservations/${reservationId}`
  )
  return response.data
}

export async function updateReservation(
  hotelId: number,
  reservationId: number,
  data: UpdateReservationRequest
): Promise<ReservationResponse> {
  const response = await apiClient.put<ReservationResponse>(
    `${BASE_RESERVATIONS}/${hotelId}/reservations/${reservationId}`,
    data
  )
  return response.data
}

export async function cancelReservation(
  hotelId: number,
  reservationId: number,
  data: CancelReservationRequest
): Promise<CancellationResponse> {
  const response = await apiClient.patch<CancellationResponse>(
    `${BASE_RESERVATIONS}/${hotelId}/reservations/${reservationId}/cancel`,
    data
  )
  return response.data
}
