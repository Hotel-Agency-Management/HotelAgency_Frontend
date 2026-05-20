import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { getErrorMessage } from '@/core/utils/apiError'
import {
  createAdminReservation,
  cancelAdminReservation,
  updateAdminReservation,
  updateAdminReservationStatus,
} from '../../client/adminReservationClient'
import { ADMIN_RESERVATION_QUERY_KEYS } from '../../constants/reservationKey'
import type {
  CancellationResponse,
  CancelReservationRequest,
  CreateReservationRequest,
  ReservationResponse,
  UpdateReservationRequest,
  UpdateReservationStatusRequest,
} from '../../config/reservationConfig'

export function useAdminCreateReservation(agencyId: number, hotelId: number) {
  const queryClient = useQueryClient()

  return useMutation<ReservationResponse, unknown, CreateReservationRequest>({
    mutationFn: (data) => createAdminReservation(agencyId, hotelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_RESERVATION_QUERY_KEYS.byHotelList(agencyId, hotelId),
      })
      toast.success('Reservation created successfully')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useAdminUpdateReservation(agencyId: number, hotelId: number) {
  const queryClient = useQueryClient()

  return useMutation<
    ReservationResponse,
    unknown,
    { reservationId: number; data: UpdateReservationRequest }
  >({
    mutationFn: ({ reservationId, data }) => updateAdminReservation(hotelId, reservationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_RESERVATION_QUERY_KEYS.byHotelList(agencyId, hotelId),
      })
      toast.success('Reservation updated successfully')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useAdminCancelReservation(agencyId: number, hotelId: number) {
  const queryClient = useQueryClient()

  return useMutation<CancellationResponse, unknown, { reservationId: number; data: CancelReservationRequest }>({
    mutationFn: ({ reservationId, data }) => cancelAdminReservation(hotelId, reservationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_RESERVATION_QUERY_KEYS.byHotelList(agencyId, hotelId),
      })
      toast.success('Reservation cancelled successfully')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useAdminUpdateReservationStatus(agencyId: number, hotelId: number) {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, { reservationId: number; data: UpdateReservationStatusRequest }>({
    mutationFn: ({ reservationId, data }) => updateAdminReservationStatus(agencyId, hotelId, reservationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_RESERVATION_QUERY_KEYS.byHotelList(agencyId, hotelId),
      })
      toast.success('Reservation status updated successfully')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}
