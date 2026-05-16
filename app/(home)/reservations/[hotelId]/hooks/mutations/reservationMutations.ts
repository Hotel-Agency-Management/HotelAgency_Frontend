import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { getErrorMessage } from '@/core/utils/apiError'
import { updateReservation, cancelReservation } from '../../client/directReservationClient'
import { RESERVATION_QUERY_KEYS } from '../../constants/reservationKey'
import type { UpdateReservationRequest, CancelReservationRequest } from '../../config/reservationConfig'

export function useUpdateReservation(hotelId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reservationId, data }: { reservationId: number; data: UpdateReservationRequest }) =>
      updateReservation(hotelId, reservationId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESERVATION_QUERY_KEYS.byHotelList(hotelId) })
      toast.success('Reservation updated successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useCancelReservation(hotelId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reservationId, data }: { reservationId: number; data: CancelReservationRequest }) =>
      cancelReservation(hotelId, reservationId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESERVATION_QUERY_KEYS.byHotelList(hotelId) })
      toast.success('Reservation cancelled successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}
