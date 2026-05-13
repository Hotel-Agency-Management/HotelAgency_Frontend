'use client'

import { useMemo, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import { useDebouncedCallback } from 'use-debounce'
import {
  useAdminRoomById,
  useAdminRoomsByHotel,
} from '@/app/(home)/agency/hotels/[hotelId]/rooms/hooks/queries/adminRoomQueries'
import { getStayLength } from '@/app/(home)/hotels/[hotelId]/utils/roomBooking'
import { useAuth } from '@/core/context/AuthContext'
import { adminGetReservationById } from '../client/adminReservationClient'
import { useAdminReservations } from './queries/adminReservationQueries'
import { useAdminUpdateReservation, useAdminCancelReservation } from './mutations/adminReservationMutations'
import {
  ReservationSource,
  type ReservationListItem,
  type ReservationResponse,
  type UpdateReservationRequest,
} from '../config/reservationConfig'

type PaginationModel = { page: number; pageSize: number }

type EditForm = {
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  source: ReservationSource | ''
  guestFullName: string
  guestPhone: string
  guestIdNumber: string
  hasInsurance: boolean
  specialRequests: string
  notes: string
}

export function useAdminReservationListPage() {
  const params = useParams<{ agencyId?: string; hotelId?: string }>()
  const theme = useTheme()
  const { user } = useAuth()
  const numericHotelId = params.hotelId ? Number(params.hotelId) : undefined
  const agencyId = params.agencyId ? Number(params.agencyId) : user?.agencyId
  const reservationsBasePath = params.agencyId
    ? `/agencies/${params.agencyId}/hotels/${params.hotelId ?? ''}/reservations`
    : `/agency/hotels/${params.hotelId ?? ''}/reservations`

  // Pagination
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({ page: 0, pageSize: 10 })

  // Filters
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>(undefined)
  const [status, setStatus] = useState('')
  const [checkInFrom, setCheckInFrom] = useState('')
  const [checkInTo, setCheckInTo] = useState('')

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value || undefined)
    setPaginationModel((prev) => ({ ...prev, page: 0 }))
  }, 300)

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value)
      debouncedSetSearch(value)
    },
    [debouncedSetSearch]
  )

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value)
    setPaginationModel((prev) => ({ ...prev, page: 0 }))
  }, [])

  const queryParams = useMemo(
    () => ({
      pageNumber: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      search: debouncedSearch,
      status: status || undefined,
      checkInFrom: checkInFrom || undefined,
      checkInTo: checkInTo || undefined,
    }),
    [paginationModel, debouncedSearch, status, checkInFrom, checkInTo]
  )

  const { data, isLoading } = useAdminReservations(
    agencyId as number,
    numericHotelId as number,
    queryParams,
    Number.isFinite(agencyId) && Number.isFinite(numericHotelId)
  )

  const reservations = data?.items ?? []
  const totalCount = data?.totalCount ?? 0

  // Mutations
  const updateMutation = useAdminUpdateReservation(agencyId as number, numericHotelId as number)
  const cancelMutation = useAdminCancelReservation(agencyId as number, numericHotelId as number)

  // Extend dialog state
  const [extendingReservation, setExtendingReservation] = useState<ReservationListItem | null>(null)
  const [extendCheckOut, setExtendCheckOut] = useState('')
  const roomLookupParams = useMemo(() => ({ pageSize: 100 }), [])
  const { data: roomsResponse, isLoading: isLoadingRoomsForExtend } = useAdminRoomsByHotel(
    agencyId,
    numericHotelId,
    roomLookupParams
  )

  const extendingRoomId = useMemo(() => {
    const roomNumber = extendingReservation?.roomNumbers[0]
    return roomsResponse?.items.find((room) => room.roomNumber === roomNumber)?.roomId
  }, [extendingReservation, roomsResponse?.items])

  const { data: extendingRoom, isLoading: isLoadingExtendRoom } = useAdminRoomById(
    agencyId,
    numericHotelId,
    extendingRoomId
  )

  const extendPrice = extendingRoom?.extendPrice ?? 0
  const isLoadingExtendPrice = isLoadingRoomsForExtend || isLoadingExtendRoom

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

  const extendHasValidRange =
    !!extendCheckOut && !!extendingReservation && extendCheckOut > extendingReservation.checkOutDate

  // Update (edit) dialog state
  const [updatingReservation, setUpdatingReservation] = useState<ReservationListItem | null>(null)
  const [isLoadingUpdateDetails, setIsLoadingUpdateDetails] = useState(false)
  const [editForm, setEditForm] = useState<EditForm>({
    roomId: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    source: '',
    guestFullName: '',
    guestPhone: '',
    guestIdNumber: '',
    hasInsurance: false,
    specialRequests: '',
    notes: '',
  })

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

      if (!Number.isFinite(agencyId) || !Number.isFinite(numericHotelId)) {
        return
      }

      setIsLoadingUpdateDetails(true)
      try {
        const reservationDetails = await adminGetReservationById(
          agencyId as number,
          numericHotelId as number,
          row.id
        )
        fillEditForm(reservationDetails)
      } finally {
        setIsLoadingUpdateDetails(false)
      }
    },
    [fillEditForm, agencyId, numericHotelId]
  )

  const handleCloseUpdate = useCallback(() => {
    setUpdatingReservation(null)
    setIsLoadingUpdateDetails(false)
  }, [])

  const handleEditFieldChange = useCallback(
    (key: keyof EditForm, value: string | number | boolean) => {
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

  // Cancel dialog state
  const [cancellingReservation, setCancellingReservation] = useState<ReservationListItem | null>(
    null
  )

  const handleOpenCancel = useCallback((row: ReservationListItem) => {
    setCancellingReservation(row)
  }, [])

  const handleCloseCancel = useCallback(() => {
    setCancellingReservation(null)
  }, [])

  const handleConfirmCancel = useCallback(() => {
    if (!cancellingReservation) return
    cancelMutation.mutate(
      { reservationId: cancellingReservation.id, data: { cancellationReason: 'Staff cancellation' } },
      { onSuccess: handleCloseCancel }
    )
  }, [cancellingReservation, cancelMutation, handleCloseCancel])

  return {
    theme,
    hotelId: params.hotelId ?? '',
    reservationsBasePath,
    // List data
    reservations,
    isLoading,
    totalCount,
    paginationModel,
    setPaginationModel,
    // Filters
    search,
    handleSearch,
    status,
    handleStatusChange,
    checkInFrom,
    setCheckInFrom,
    checkInTo,
    setCheckInTo,
    // Extend dialog
    extendingReservation,
    extendCheckOut,
    setExtendCheckOut,
    extendPrice,
    isLoadingExtendPrice,
    extendHasValidRange,
    handleOpenExtend,
    handleCloseExtend,
    handleConfirmExtend,
    // Update dialog
    updatingReservation,
    editForm,
    isLoadingUpdateDetails,
    editFormHasValidRange,
    handleEditFieldChange,
    handleOpenUpdate,
    handleCloseUpdate,
    handleConfirmUpdate,
    // Cancel dialog
    cancellingReservation,
    handleOpenCancel,
    handleCloseCancel,
    handleConfirmCancel,
    // Mutation state
    isUpdating: updateMutation.isPending,
    isCancelling: cancelMutation.isPending,
  }
}
