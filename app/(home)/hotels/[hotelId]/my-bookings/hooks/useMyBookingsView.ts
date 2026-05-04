'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMyBookingsGridColumns } from '../components/columns/columnRegistry'
import { useMyBookings } from './useMyBookings'
import { BookingsView } from '../types'

export function useMyBookingsView(hotelId: string) {
  const [view, setView] = useState<BookingsView>('cards')
  const router = useRouter()
  const { bookings, isLoading, isError } = useMyBookings(hotelId)

  const columns = useMemo(
    () =>
      getMyBookingsGridColumns({
        onViewDetail: (id) => router.push(`/hotels/${hotelId}/my-bookings/${id}`),
      }),
    [hotelId, router]
  )

  return { view, setView, bookings, isLoading, isError, columns }
}
