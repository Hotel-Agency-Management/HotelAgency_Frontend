import { buildFormData } from "@/app/(home)/agency/hotels/utils/formData"
import apiClient from "@/core/clients/apiClient"
import { CreateReservationRequest, ReservationResponse } from "../config/reservationConfig"

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
