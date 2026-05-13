'use client'

import { useParams } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '@/core/context/AuthContext'
import { useAdminReservations } from './queries/adminReservationQueries'
import { useAdminUpdateReservation, useAdminCancelReservation } from './mutations/adminReservationMutations'
import { useAdminReservationExtendDialog } from './useAdminReservationExtendDialog'
import { useAdminReservationUpdateDialog } from './useAdminReservationUpdateDialog'
import { useReservationCancelDialog } from './useReservationCancelDialog'
import { useReservationListControls } from './useReservationListControls'

export function useAdminReservationListPage() {
  const params = useParams<{ agencyId?: string; hotelId?: string }>()
  const theme = useTheme()
  const { user } = useAuth()
  const numericHotelId = params.hotelId ? Number(params.hotelId) : undefined
  const agencyId = params.agencyId ? Number(params.agencyId) : user?.agencyId
  const reservationsBasePath = params.agencyId
    ? `/agencies/${params.agencyId}/hotels/${params.hotelId ?? ''}/reservations`
    : `/agency/hotels/${params.hotelId ?? ''}/reservations`

  const { queryParams, ...listControls } = useReservationListControls()

  const { data, isLoading } = useAdminReservations(
    agencyId as number,
    numericHotelId as number,
    queryParams,
    Number.isFinite(agencyId) && Number.isFinite(numericHotelId)
  )

  const reservations = data?.items ?? []
  const totalCount = data?.totalCount ?? 0

  const updateMutation = useAdminUpdateReservation(agencyId as number, numericHotelId as number)
  const cancelMutation = useAdminCancelReservation(agencyId as number, numericHotelId as number)
  const extendDialog = useAdminReservationExtendDialog({
    agencyId,
    hotelId: numericHotelId,
    updateMutation,
  })
  const updateDialog = useAdminReservationUpdateDialog({
    agencyId,
    hotelId: numericHotelId,
    updateMutation,
  })
  const cancelDialog = useReservationCancelDialog(cancelMutation)

  return {
    theme,
    hotelId: params.hotelId ?? '',
    reservationsBasePath,
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
