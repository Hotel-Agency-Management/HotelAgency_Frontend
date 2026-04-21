'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { customerReservationsApi } from '../data/customerReservationsApi'
import type {
  CreateCustomerReservationInput,
  ExtendCustomerReservationInput,
  UpdateCustomerReservationInput,
} from '../types/customerReservation'

export const customerReservationQueryKeys = {
  current: (hotelId: string, roomId: string) =>
    ['customer-room-reservation', hotelId, roomId] as const,
  room: (hotelId: string, roomId: string) =>
    ['customer-room-reservations', hotelId, roomId] as const,
  hotel: (hotelId: string) => ['customer-hotel-reservations', hotelId] as const,
}

export function useCustomerReservationManager(hotelId: string, roomId: string) {
  const queryClient = useQueryClient()

  const invalidateReservationQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: customerReservationQueryKeys.current(hotelId, roomId),
      }),
      queryClient.invalidateQueries({
        queryKey: customerReservationQueryKeys.room(hotelId, roomId),
      }),
      queryClient.invalidateQueries({
        queryKey: customerReservationQueryKeys.hotel(hotelId),
      }),
    ])
  }

  const currentReservationQuery = useQuery({
    queryKey: customerReservationQueryKeys.current(hotelId, roomId),
    queryFn: () => customerReservationsApi.getCurrentCustomerReservation(hotelId, roomId),
    enabled: hotelId.length > 0 && roomId.length > 0,
  })

  const roomReservationsQuery = useQuery({
    queryKey: customerReservationQueryKeys.room(hotelId, roomId),
    queryFn: () => customerReservationsApi.getRoomReservations(hotelId, roomId),
    enabled: hotelId.length > 0 && roomId.length > 0,
  })

  const hotelReservationsQuery = useQuery({
    queryKey: customerReservationQueryKeys.hotel(hotelId),
    queryFn: () => customerReservationsApi.getHotelReservations(hotelId),
    enabled: hotelId.length > 0,
  })

  const createReservationMutation = useMutation({
    mutationFn: (input: CreateCustomerReservationInput) =>
      customerReservationsApi.createReservation(input),
    onSuccess: invalidateReservationQueries,
  })

  const updateReservationMutation = useMutation({
    mutationFn: (input: UpdateCustomerReservationInput) =>
      customerReservationsApi.updateReservation(input),
    onSuccess: invalidateReservationQueries,
  })

  const extendReservationMutation = useMutation({
    mutationFn: (input: ExtendCustomerReservationInput) =>
      customerReservationsApi.extendReservation(input),
    onSuccess: invalidateReservationQueries,
  })

  const cancelReservationMutation = useMutation({
    mutationFn: (reservationId: string) =>
      customerReservationsApi.cancelReservation(reservationId),
    onSuccess: invalidateReservationQueries,
  })

  return {
    currentReservation: currentReservationQuery.data ?? null,
    roomReservations: roomReservationsQuery.data ?? [],
    hotelReservations: hotelReservationsQuery.data ?? [],
    isLoading:
      currentReservationQuery.isLoading ||
      roomReservationsQuery.isLoading ||
      hotelReservationsQuery.isLoading,
    createReservation: createReservationMutation.mutateAsync,
    updateReservation: updateReservationMutation.mutateAsync,
    extendReservation: extendReservationMutation.mutateAsync,
    cancelReservation: cancelReservationMutation.mutateAsync,
    isBusy:
      createReservationMutation.isPending ||
      updateReservationMutation.isPending ||
      extendReservationMutation.isPending ||
      cancelReservationMutation.isPending,
  }
}
