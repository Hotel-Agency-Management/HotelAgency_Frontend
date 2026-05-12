'use client'

import { useEffect } from 'react'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  directReservationSchema,
  getDirectReservationDefaultValues,
  type DirectReservationFormInput,
  type DirectReservationFormValues,
} from '../schema/directReservationSchema'
import type { RoomListItemResponse } from '@/app/(home)/agency/hotels/[hotelId]/rooms/configs/roomConfig'

export interface UseDirectReservationFormOptions {
  rooms: RoomListItemResponse[]
  onSubmit: (values: DirectReservationFormValues) => void
}

export function useDirectReservationForm({
  rooms,
  onSubmit,
}: UseDirectReservationFormOptions) {
  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm<DirectReservationFormInput, unknown, DirectReservationFormValues>({
    resolver: zodResolver(directReservationSchema),
    defaultValues: getDirectReservationDefaultValues(0),
    mode: 'onBlur',
  })

  const reservationSnapshot = {
    guestFullName: watch('guestFullName'),
    guestPhone: watch('guestPhone'),
    guestEmail: watch('guestEmail'),
    checkInDate: watch('checkInDate'),
    checkOutDate: watch('checkOutDate'),
    numberOfGuests: watch('numberOfGuests'),
    roomNumbers: watch('roomNumbers'),
    totalAmount: watch('totalAmount'),
    source: watch('source'),
  }

  const watchedRoomNumbers = watch('roomNumbers')
  const watchedCheckIn = watch('checkInDate')
  const watchedCheckOut = watch('checkOutDate')

  useEffect(() => {
    const nights =
      watchedCheckIn && watchedCheckOut
        ? Math.max(0, dayjs(watchedCheckOut).diff(dayjs(watchedCheckIn), 'day'))
        : 0
    const total = rooms
      .filter(r => watchedRoomNumbers.includes(r.roomNumber))
      .reduce((sum, r) => sum + r.pricePerNight, 0) * nights
    setValue('totalAmount', total, { shouldValidate: false, shouldDirty: false })
  }, [watchedRoomNumbers, watchedCheckIn, watchedCheckOut, rooms, setValue])

  return {
    control,
    errors,
    getValues,
    isSubmitting,
    reservationSnapshot,
    handleFormSubmit: handleSubmit(values => onSubmit(values)),
    trigger,
  }
}
