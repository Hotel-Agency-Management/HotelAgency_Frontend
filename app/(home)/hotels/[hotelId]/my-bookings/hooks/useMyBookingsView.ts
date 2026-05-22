'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMyBookingsGridColumns } from '../components/columns/columnRegistry'
import { useMyBookings } from './useMyBookings'
import {
  useCreateCustomerReservation,
  useCancelMyReservation,
  useUpdateMyReservation,
} from './mutations/customerReservationMutations'
import { BookingsView } from '../config'

export function useMyBookingsView(hotelId: string, agencyId?: number) {
  const [view, setView] = useState<BookingsView>('cards')
  const router = useRouter()
  const { bookings, isLoading, isError } = useMyBookings(hotelId)

  const createReservationMutation = useCreateCustomerReservation(agencyId ?? 0, Number(hotelId))
  const cancelReservationMutation = useCancelMyReservation()
  const updateReservationMutation = useUpdateMyReservation()

  const columns = useMemo(
    () =>
      getMyBookingsGridColumns({
        onViewDetail: (id) => router.push(`/hotels/${hotelId}/my-bookings/${id}`),
      }),
    [hotelId, router]
  )

  return {
    view,
    setView,
    bookings,
    isLoading,
    isError,
    columns,
    createReservation: createReservationMutation.mutate,
    cancelReservation: cancelReservationMutation.mutate,
    updateReservation: updateReservationMutation.mutate,
    isCreating: createReservationMutation.isPending,
    isCancelling: cancelReservationMutation.isPending,
    isUpdating: updateReservationMutation.isPending,
  }
}
