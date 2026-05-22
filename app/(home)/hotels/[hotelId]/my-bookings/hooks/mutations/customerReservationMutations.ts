import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { getErrorMessage } from '@/core/utils/apiError'
import {
  cancelMyReservation,
  createCustomerReservation,
  updateMyReservation,
} from '../../client/customerReservationClient'
import { CUSTOMER_RESERVATION_QUERY_KEYS } from '../../constants/queryKeys'
import type {
  CancelCustomerReservationResponse,
  CreateCustomerReservationRequest,
  ReservationDetail,
  UpdateCustomerReservationRequest,
} from '../../config'

export function useCreateCustomerReservation(agencyId: number, hotelId: number) {
  const queryClient = useQueryClient()

  return useMutation<ReservationDetail, unknown, CreateCustomerReservationRequest>({
    mutationFn: (data: CreateCustomerReservationRequest) =>
      createCustomerReservation(agencyId, hotelId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.list() })
      toast.success('Reservation created successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useCancelMyReservation() {
  const queryClient = useQueryClient()

  return useMutation<CancelCustomerReservationResponse, unknown, number>({
    mutationFn: (id: number) => cancelMyReservation(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.list() })
      queryClient.invalidateQueries({ queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.detail(id) })
      toast.success('Reservation cancelled successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useUpdateMyReservation() {
  const queryClient = useQueryClient()

  return useMutation<
    ReservationDetail,
    unknown,
    { id: number; data: UpdateCustomerReservationRequest }
  >({
    mutationFn: ({ id, data }) => updateMyReservation(id, data),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.list() })
      queryClient.invalidateQueries({ queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.detail(id) })
      toast.success('Reservation updated successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}
