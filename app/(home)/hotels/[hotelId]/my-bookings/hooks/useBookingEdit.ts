'use client'

import { useMemo, useState } from 'react'
import type {
  EditReservationFieldKey,
  EditReservationFormState,
} from '../../types/editReservationForm'
import { isValidReservationRange } from '../../utils/customerReservationPolicy'
import { getStayLength } from '../../utils/roomBooking'
import type { ReservationDetail } from '../config'
import { useUpdateMyReservation } from './mutations/customerReservationMutations'

interface UseBookingEditParams {
  booking: ReservationDetail | null
  roomNumber: string
  nightlyRate: number
  extendPrice: number
}

const EMPTY_EDIT_FORM: EditReservationFormState = {
  roomId: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  rooms: 1,
}

export function useBookingEdit({ booking, roomNumber, nightlyRate, extendPrice }: UseBookingEditParams) {
  const [editOpen, setEditOpen] = useState(false)
  const [editForm, setEditForm] = useState<EditReservationFormState>(EMPTY_EDIT_FORM)
  const updateMutation = useUpdateMyReservation()

  const editStayLength = getStayLength(editForm.checkIn, editForm.checkOut)
  const editFormHasValidRange = isValidReservationRange(editForm.checkIn, editForm.checkOut)

  const roomOptions = useMemo(
    () => [
      {
        id: roomNumber,
        label: booking?.roomNumbers.join(', ') ?? roomNumber,
        capacity: 999,
        nightlyRate,
        extendPrice,
      },
    ],
    [booking?.roomNumbers, extendPrice, nightlyRate, roomNumber]
  )

  const openEdit = () => {
    if (!booking) return

    setEditForm({
      roomId: roomNumber,
      checkIn: booking.checkInDate,
      checkOut: booking.checkOutDate,
      guests: booking.numberOfGuests,
      rooms: booking.numberOfRooms,
      guestFullName: booking.guestFullName,
      guestPhone: booking.guestPhone ?? '',
      guestIdNumber: booking.guestNumber ?? '',
      hasInsurance: booking.hasInsurance,
      specialRequests: booking.specialRequests ?? '',
      notes: booking.notes ?? '',
    })
    setEditOpen(true)
  }

  const closeEdit = () => setEditOpen(false)

  const onFieldChange = (key: EditReservationFieldKey, value: string | number | boolean) =>
    setEditForm(current => ({ ...current, [key]: value }))

  const saveEdit = () => {
    if (!booking || !editFormHasValidRange) return

    updateMutation.mutate(
      {
        id: booking.id,
        data: {
          checkInDate: editForm.checkIn,
          checkOutDate: editForm.checkOut,
          numberOfGuests: editForm.guests,
          guestPhone: editForm.guestPhone,
          guestNumber: editForm.guestIdNumber,
          hasInsurance: editForm.hasInsurance,
          specialRequests: editForm.specialRequests || null,
          notes: editForm.notes || null,
        },
      },
      { onSuccess: closeEdit }
    )
  }

  return {
    editOpen,
    editForm,
    editStayLength,
    editFormHasValidRange,
    roomOptions,
    openEdit,
    closeEdit,
    onFieldChange,
    saveEdit,
    isUpdating: updateMutation.isPending,
  }
}
