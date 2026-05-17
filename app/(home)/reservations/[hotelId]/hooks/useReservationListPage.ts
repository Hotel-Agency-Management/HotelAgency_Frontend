'use client'

import { useParams } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import { useReservations } from './queries/reservationQueries'
import { useUpdateReservation, useCancelReservation, useUpdateReservationStatus } from './mutations/reservationMutations'
import { useReservationCancelDialog } from './useReservationCancelDialog'
import { useReservationExtendDialog } from './useReservationExtendDialog'
import { useReservationListControls } from './useReservationListControls'
import { useReservationUpdateDialog } from './useReservationUpdateDialog'
import { NEXT_STATUS_VALUE } from '../constants/status'
import type { ReservationListItem } from '../config/reservationConfig'

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
  const statusMutation = useUpdateReservationStatus(numericHotelId as number)

  const extendDialog = useReservationExtendDialog({
    hotelId: numericHotelId,
    updateMutation,
  })
  const updateDialog = useReservationUpdateDialog({
    hotelId: numericHotelId,
    updateMutation,
  })
  const cancelDialog = useReservationCancelDialog(cancelMutation)

  const handleUpdateStatus = (row: ReservationListItem) => {
    const nextValue = NEXT_STATUS_VALUE[row.status]
    if (nextValue === undefined) return
    statusMutation.mutate({ reservationId: row.id, data: { status: nextValue } })
  }

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
    handleUpdateStatus,
    statusUpdatingId: statusMutation.isPending ? (statusMutation.variables?.reservationId ?? null) : null,
  }
}
