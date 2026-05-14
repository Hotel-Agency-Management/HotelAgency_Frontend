'use client'

import { useCallback, useState } from 'react'
import type { UseMutationResult } from '@tanstack/react-query'
import type {
  EditReservationFieldKey,
  EditReservationFormState,
} from '@/app/(home)/hotels/[hotelId]/types/editReservationForm'
import { getReservationById } from '../client/directReservationClient'
import { DEFAULT_VALUE_OF_RESERVATION_EDIT_FORM } from '../constants/reservationEditForm'
import type {
  ReservationListItem,
  ReservationResponse,
  UpdateReservationRequest,
} from '../config/reservationConfig'

type UpdateReservationMutation = UseMutationResult<
  ReservationResponse,
  unknown,
  { reservationId: number; data: UpdateReservationRequest }
>

type UseReservationUpdateDialogParams = {
  hotelId?: number
  updateMutation: UpdateReservationMutation
}

export function useReservationUpdateDialog({
  hotelId,
  updateMutation,
}: UseReservationUpdateDialogParams) {
  const [updatingReservation, setUpdatingReservation] = useState<ReservationListItem | null>(null)
  const [isLoadingUpdateDetails, setIsLoadingUpdateDetails] = useState(false)
  const [editForm, setEditForm] = useState<EditReservationFormState>(
    DEFAULT_VALUE_OF_RESERVATION_EDIT_FORM
  )

  const fillEditForm = useCallback((reservation: ReservationListItem | ReservationResponse) => {
    setEditForm({
      roomId: reservation.roomNumbers[0] ?? '',
      checkIn: reservation.checkInDate,
      checkOut: reservation.checkOutDate,
      guests: reservation.numberOfGuests ?? 1,
      rooms: reservation.roomNumbers.length,
      source: reservation.source ?? '',
      guestFullName: reservation.guestFullName,
      guestPhone: reservation.guestPhone ?? '',
      guestIdNumber: reservation.guestIdNumber ?? '',
      hasInsurance: reservation.hasInsurance,
      specialRequests: reservation.specialRequests ?? '',
      notes: reservation.notes ?? '',
    })
  }, [])

  const handleOpenUpdate = useCallback(
    async (row: ReservationListItem) => {
      setUpdatingReservation(row)
      fillEditForm(row)

      if (!Number.isFinite(hotelId)) {
        return
      }

      setIsLoadingUpdateDetails(true)
      try {
        const reservationDetails = await getReservationById(hotelId as number, row.id)
        fillEditForm(reservationDetails)
      } finally {
        setIsLoadingUpdateDetails(false)
      }
    },
    [fillEditForm, hotelId]
  )

  const handleCloseUpdate = useCallback(() => {
    setUpdatingReservation(null)
    setIsLoadingUpdateDetails(false)
  }, [])

  const handleEditFieldChange = useCallback(
    (key: EditReservationFieldKey, value: string | number | boolean) => {
      setEditForm((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const editFormHasValidRange =
    !!editForm.checkIn && !!editForm.checkOut && editForm.checkOut > editForm.checkIn

  const handleConfirmUpdate = useCallback(() => {
    if (!updatingReservation) return

    const data: UpdateReservationRequest = {
      roomNumbers: editForm.roomId ? [editForm.roomId] : undefined,
      checkInDate: editForm.checkIn,
      checkOutDate: editForm.checkOut,
      numberOfGuests: editForm.guests,
      source: editForm.source || undefined,
      guestFullName: editForm.guestFullName,
      guestPhone: editForm.guestPhone,
      guestIdNumber: editForm.guestIdNumber,
      hasInsurance: editForm.hasInsurance,
      specialRequests: editForm.specialRequests || null,
      notes: editForm.notes || null,
    }

    updateMutation.mutate(
      { reservationId: updatingReservation.id, data },
      { onSuccess: handleCloseUpdate }
    )
  }, [updatingReservation, editForm, updateMutation, handleCloseUpdate])

  return {
    updatingReservation,
    editForm,
    isLoadingUpdateDetails,
    editFormHasValidRange,
    handleEditFieldChange,
    handleOpenUpdate,
    handleCloseUpdate,
    handleConfirmUpdate,
  }
}
