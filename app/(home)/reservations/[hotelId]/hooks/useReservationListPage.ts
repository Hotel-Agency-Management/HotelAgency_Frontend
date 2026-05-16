'use client'

import { useParams } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import { useReservations } from './queries/reservationQueries'
import { useUpdateReservation, useCancelReservation } from './mutations/reservationMutations'
import { useReservationCancelDialog } from './useReservationCancelDialog'
import { useReservationExtendDialog } from './useReservationExtendDialog'
import { useReservationListControls } from './useReservationListControls'
import { useReservationUpdateDialog } from './useReservationUpdateDialog'

export function useReservationListPage() {
  const params = useParams<{ hotelId?: string }>()
  const theme = useTheme()
  const numericHotelId = params.hotelId ? Number(params.hotelId) : undefined
  const { queryParams, ...listControls } = useReservationListControls()

  const { data, isLoading } = useReservations(
    numericHotelId as number,
    queryParams,
    Number.isFinite(numericHotelId)
  )

  const reservations = data?.items ?? []
  const totalCount = data?.totalCount ?? 0

  const updateMutation = useUpdateReservation(numericHotelId as number)
  const cancelMutation = useCancelReservation(numericHotelId as number)
  const extendDialog = useReservationExtendDialog({
    hotelId: numericHotelId,
    updateMutation,
  })
  const updateDialog = useReservationUpdateDialog({
    hotelId: numericHotelId,
    updateMutation,
  })
  const cancelDialog = useReservationCancelDialog(cancelMutation)

  return {
    theme,
    hotelId: params.hotelId ?? '',
    reservations,
    isLoading,
    totalCount,
    ...listControls,
    ...extendDialog,
    ...updateDialog,
    ...cancelDialog,
    isUpdating: updateMutation.isPending,
    isCancelling: cancelMutation.isPending,
  }
}
