import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createReservation } from '../../client/directReservationClient'
import { CreateReservationRequest } from '../../config/reservationConfig'
import { getErrorMessage } from '@/core/utils/apiError'

const RESERVATIONS_QUERY_KEY = ['reservations']

export const useCreateReservation = (hotelId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateReservationRequest) =>
      createReservation(hotelId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...RESERVATIONS_QUERY_KEY, hotelId],
      })

      toast.success('Reservation created successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}
