'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  directReservationSchema,
  getDirectReservationDefaultValues,
  type DirectReservationFormInput,
  type DirectReservationFormValues,
} from '../schema/directReservationSchema'

export interface UseDirectReservationFormOptions {
  totalAmount: number
  onSubmit: (values: DirectReservationFormValues) => void
}

export function useDirectReservationForm({
  totalAmount,
  onSubmit,
}: UseDirectReservationFormOptions) {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm<DirectReservationFormInput, unknown, DirectReservationFormValues>({
    resolver: zodResolver(directReservationSchema),
    defaultValues: getDirectReservationDefaultValues(totalAmount),
    mode: 'onBlur',
  })

  const paidAmount = watch('paidAmount')
  const reservationSnapshot = {
    checkInDate: watch('checkInDate'),
    checkOutDate: watch('checkOutDate'),
    numberOfGuests: watch('numberOfGuests'),
    numberOfRooms: watch('numberOfRooms'),
    roomType: watch('roomType'),
    paymentMethod: watch('paymentMethod'),
    paidAmount,
    remainingAmount: watch('remainingAmount'),
  }

  useEffect(() => {
    setValue('totalAmount', totalAmount, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    })
  }, [setValue, totalAmount])

  useEffect(() => {
    const normalizedPaidAmount = typeof paidAmount === 'number' ? paidAmount : 0

    setValue('remainingAmount', totalAmount - normalizedPaidAmount, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    })
  }, [paidAmount, setValue, totalAmount])

  return {
    control,
    errors,
    isSubmitting,
    reservationSnapshot,
    handleFormSubmit: handleSubmit(values => onSubmit(values)),
    trigger,
  }
}
