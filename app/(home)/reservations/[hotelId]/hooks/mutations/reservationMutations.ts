import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { getErrorMessage } from '@/core/utils/apiError'
import { updateReservation, cancelReservation, updateReservationStatus } from '../../client/directReservationClient'
import { RESERVATION_QUERY_KEYS } from '../../constants/reservationKey'
import type {
  UpdateReservationRequest,
  CancelReservationRequest,
  UpdateReservationStatusRequest
} from '../../config/reservationConfig'

export function useUpdateReservation(hotelId: number) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ reservationId, data }: { reservationId: number; data: UpdateReservationRequest }) =>
      updateReservation(hotelId, reservationId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESERVATION_QUERY_KEYS.byHotelList(hotelId) })
      toast.success(t('reservations.toast.updated', { defaultValue: 'Reservation updated successfully' }))
    },

    onError: error => {
      toast.error(getErrorMessage(error))
    }
  })
}

export function useCancelReservation(hotelId: number) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ reservationId, data }: { reservationId: number; data: CancelReservationRequest }) =>
      cancelReservation(hotelId, reservationId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESERVATION_QUERY_KEYS.byHotelList(hotelId) })
      toast.success(t('reservations.toast.cancelled', { defaultValue: 'Reservation cancelled successfully' }))
    },

    onError: error => {
      toast.error(getErrorMessage(error))
    }
  })
}

export function useUpdateReservationStatus(hotelId: number) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: ({ reservationId, data }: { reservationId: number; data: UpdateReservationStatusRequest }) =>
      updateReservationStatus(hotelId, reservationId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESERVATION_QUERY_KEYS.byHotelList(hotelId) })
      toast.success(t('reservations.toast.statusUpdated', { defaultValue: 'Reservation status updated successfully' }))
    },

    onError: error => {
      toast.error(getErrorMessage(error))
    }
  })
}
