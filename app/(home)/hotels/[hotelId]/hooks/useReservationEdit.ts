'use client'

import { useMemo, useState } from 'react'
import { getErrorMessage } from '@/core/utils/apiError'
import type { Room } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import type {
  CustomerReservation,
  UpdateCustomerReservationInput,
} from '../types/customerReservation'
import { findAvailabilityConflict, isValidReservationRange } from '../utils/customerReservationPolicy'
import { getStayLength } from '../utils/roomBooking'

interface ReservationEditFormState {
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
}

export interface ReservationEditRoomOption {
  id: string
  label: string
  capacity: number
  nightlyRate: number
  extendPrice: number
  disabled?: boolean
}

interface UseReservationEditOptions {
  currentReservation: CustomerReservation | null
  fallbackRoomCapacity: number
  availableRooms: Room[]
  hotelReservations: CustomerReservation[]
  updateReservation: (input: UpdateCustomerReservationInput) => Promise<CustomerReservation>
  canModify: boolean
  showFeedback: (severity: 'success' | 'error', message: string) => void
  onSaved?: (reservation: CustomerReservation) => void
}

export function useReservationEdit({
  currentReservation,
  fallbackRoomCapacity,
  availableRooms,
  hotelReservations,
  updateReservation,
  canModify,
  showFeedback,
  onSaved,
}: UseReservationEditOptions) {
  const [editOpen, setEditOpen] = useState(false)
  const [editForm, setEditForm] = useState<ReservationEditFormState>({
    roomId: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
  })

  const selectedRoom = useMemo(
    () => availableRooms.find(room => room.id === editForm.roomId) ?? null,
    [availableRooms, editForm.roomId]
  )
  const selectedRoomCapacity = selectedRoom?.capacity ?? fallbackRoomCapacity
  const selectedNightlyRate = selectedRoom?.pricePerNight ?? currentReservation?.nightlyRate ?? 0
  const selectedExtendPrice =
    selectedRoom?.extendPrice ?? currentReservation?.extendPrice ?? selectedNightlyRate
  const editFormHasValidRange = isValidReservationRange(editForm.checkIn, editForm.checkOut)
  const editStayLength = getStayLength(editForm.checkIn, editForm.checkOut)

  const editConflict = useMemo(() => {
    if (!editFormHasValidRange || currentReservation == null || selectedRoom == null) {
      return null
    }

    return findAvailabilityConflict(
      hotelReservations.filter(reservation => reservation.roomId === selectedRoom.id),
      {
        checkIn: editForm.checkIn,
        checkOut: editForm.checkOut,
        excludeReservationId: currentReservation.id,
      }
    )
  }, [
    currentReservation,
    selectedRoom,
    editForm.checkIn,
    editForm.checkOut,
    editFormHasValidRange,
    hotelReservations,
  ])

  const openEdit = () => {
    if (currentReservation == null) {
      return
    }

    setEditForm({
      roomId: currentReservation.roomId,
      checkIn: currentReservation.checkIn,
      checkOut: currentReservation.checkOut,
      guests: currentReservation.guests,
      rooms: currentReservation.rooms,
    })
    setEditOpen(true)
  }

  const closeEdit = () => {
    setEditOpen(false)
  }

  const updateEditField = <TKey extends keyof ReservationEditFormState>(
    key: TKey,
    value: ReservationEditFormState[TKey]
  ) => {
    setEditForm(current => ({ ...current, [key]: value }))
  }

  const saveEdit = async () => {
    if (
      currentReservation == null ||
      selectedRoom == null ||
      !canModify ||
      !editFormHasValidRange ||
      editForm.guests < 1 ||
      editForm.guests > selectedRoomCapacity ||
      editForm.rooms < 1 ||
      editConflict != null
    ) {
      return
    }

    try {
      const updatedReservation = await updateReservation({
        reservationId: currentReservation.id,
        roomId: selectedRoom.id,
        roomNumber: selectedRoom.roomNumber,
        checkIn: editForm.checkIn,
        checkOut: editForm.checkOut,
        guests: editForm.guests,
        rooms: editForm.rooms,
        nightlyRate: selectedNightlyRate,
        extendPrice: selectedExtendPrice,
      })

      closeEdit()
      showFeedback('success', 'Reservation updated successfully.')
      onSaved?.(updatedReservation)
    } catch (error) {
      showFeedback('error', getErrorMessage(error, 'Failed to update reservation.'))
    }
  }

  return {
    editOpen,
    editForm,
    editFormHasValidRange,
    editStayLength,
    editConflict,
    selectedRoom,
    selectedRoomCapacity,
    selectedNightlyRate,
    openEdit,
    closeEdit,
    updateEditField,
    saveEdit,
  }
}
