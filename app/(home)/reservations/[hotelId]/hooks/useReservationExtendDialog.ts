'use client'

import { useCallback, useMemo, useState } from 'react'
import type { UseMutationResult } from '@tanstack/react-query'
import {
  useRoomById,
  useRoomsByHotel,
} from '@/app/(home)/agency/hotels/[hotelId]/rooms/hooks/queries/roomQueries'
import { getStayLength } from '@/app/(home)/hotels/[hotelId]/utils/roomBooking'
import { RESERVATION_ROOM_LOOKUP_PAGE_SIZE } from '../constants/pagination'
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

type UseReservationExtendDialogParams = {
  hotelId?: number
  updateMutation: UpdateReservationMutation
}

export function useReservationExtendDialog({
  hotelId,
  updateMutation,
}: UseReservationExtendDialogParams) {
  const [extendingReservation, setExtendingReservation] = useState<ReservationListItem | null>(null)
  const [extendCheckOut, setExtendCheckOut] = useState('')
  const roomLookupParams = useMemo(() => ({ pageSize: RESERVATION_ROOM_LOOKUP_PAGE_SIZE }), [])
  const { data: roomsResponse, isLoading: isLoadingRoomsForExtend } = useRoomsByHotel(
    hotelId,
    roomLookupParams
  )

  const extendingRoomId = useMemo(() => {
    const roomNumber = extendingReservation?.roomNumbers[0]
    return roomsResponse?.items.find((room) => room.roomNumber === roomNumber)?.roomId
  }, [extendingReservation, roomsResponse?.items])

  const { data: extendingRoom, isLoading: isLoadingExtendRoom } = useRoomById(
    hotelId,
    extendingRoomId
  )

  const extendPrice = extendingRoom?.extendPrice ?? 0
  const isLoadingExtendPrice = isLoadingRoomsForExtend || isLoadingExtendRoom
  const extendHasValidRange =
    !!extendCheckOut && !!extendingReservation && extendCheckOut > extendingReservation.checkOutDate

  const handleOpenExtend = useCallback((row: ReservationListItem) => {
    setExtendingReservation(row)
    setExtendCheckOut('')
  }, [])

  const handleCloseExtend = useCallback(() => {
    setExtendingReservation(null)
    setExtendCheckOut('')
  }, [])

  const handleConfirmExtend = useCallback(() => {
    if (!extendingReservation) return

    const extensionTotal =
      getStayLength(extendingReservation.checkOutDate, extendCheckOut) * extendPrice

    updateMutation.mutate(
      {
        reservationId: extendingReservation.id,
        data: {
          checkOutDate: extendCheckOut,
          totalAmount: extendingReservation.totalAmount + extensionTotal,
        },
      },
      { onSuccess: handleCloseExtend }
    )
  }, [extendingReservation, extendCheckOut, extendPrice, updateMutation, handleCloseExtend])

  return {
    extendingReservation,
    extendCheckOut,
    setExtendCheckOut,
    extendPrice,
    isLoadingExtendPrice,
    extendHasValidRange,
    handleOpenExtend,
    handleCloseExtend,
    handleConfirmExtend,
  }
}
