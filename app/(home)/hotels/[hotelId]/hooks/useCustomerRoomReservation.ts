'use client'

import { useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { parsePositiveNumber } from '../utils/number'

interface UseCustomerRoomReservationOptions {
  hotelId: string
  roomId: string
  hotelName?: string | null
  roomNumber: string
  currency?: string | null
}

export function useCustomerRoomReservation({
  hotelId,
  roomId,
  hotelName,
  roomNumber,
  currency,
}: UseCustomerRoomReservationOptions) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const checkIn = searchParams.get('checkIn') ?? ''
  const checkOut = searchParams.get('checkOut') ?? ''
  const guests = parsePositiveNumber(searchParams.get('guests') ?? '', 1)
  const rooms = parsePositiveNumber(searchParams.get('rooms') ?? '', 1)

  const reservation = useMemo(
    () => ({
      hotelName: hotelName ?? 'Selected hotel',
      roomNumber,
      checkIn,
      checkOut,
      guests,
      rooms,
      currency: currency ?? 'USD',
    }),
    [hotelName, roomNumber, checkIn, checkOut, guests, rooms, currency]
  )

  const handleBack = useCallback(() => {
    const search = searchParams.toString()
    router.push(search ? `/hotels/${hotelId}?${search}` : `/hotels/${hotelId}`)
  }, [hotelId, router, searchParams])

  const handleReservationDateChange = useCallback(
    (key: 'checkIn' | 'checkOut', value: string) => {
      const nextSearchParams = new URLSearchParams(searchParams.toString())

      value
        ? nextSearchParams.set(key, value)
        : nextSearchParams.delete(key)

      const nextCheckOut = nextSearchParams.get('checkOut')
      if (key === 'checkIn' && value && nextCheckOut && nextCheckOut <= value) {
        nextSearchParams.delete('checkOut')
      }

      const nextQuery = nextSearchParams.toString()
      const nextHref = `/hotels/${hotelId}/rooms/${roomId}${nextQuery ? `?${nextQuery}` : ''}`

      router.replace(nextHref, { scroll: false })
    },
    [hotelId, roomId, router, searchParams]
  )

  return {
    reservation,
    handleBack,
    handleReservationDateChange,
  }
}
