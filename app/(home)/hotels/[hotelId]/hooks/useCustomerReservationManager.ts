'use client'

import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createCustomerReservation,
  cancelMyReservation,
  getMyReservations,
  getMyReservationById,
  updateMyReservation,
} from '../my-bookings/client/customerReservationClient'
import { CUSTOMER_RESERVATION_QUERY_KEYS } from '../my-bookings/constants/queryKeys'
import type {
  CancelCustomerReservationResponse,
  CustomerReservationListResponse,
  ReservationDetail,
  ReservationListItem,
} from '../my-bookings/config'
import { CUSTOMER_RESERVATION_STATUS } from '../types/customerReservation'
import type {
  CustomerReservation,
  CreateCustomerReservationInput,
  ExtendCustomerReservationInput,
  UpdateCustomerReservationInput,
} from '../types/customerReservation'
import {
  clearSavedCustomerRoomReservationId,
  getSavedCustomerRoomReservationId,
  saveCustomerRoomReservationId,
} from '../utils/customerReservationPersistence'

const reservationIncludesRoom = (
  reservationRoomNumbers: Array<string | number>,
  roomNumber: string
) => reservationRoomNumbers.some(value => String(value) === roomNumber)

const getReservationTotalAmount = (
  detail: ReservationDetail,
  listTotalAmount?: number
) => Number(detail.totalAmount ?? listTotalAmount ?? 0)

function mapDetailToCustomerReservation(
  detail: ReservationDetail,
  totalAmount: number,
  hotelId: string,
  roomId: string
): CustomerReservation {
  return {
    id: String(detail.id),
    hotelId,
    roomId,
    hotelName: detail.hotelName,
    roomNumber: detail.roomNumbers[0] != null ? String(detail.roomNumbers[0]) : '',
    customerName: detail.guestFullName,
    customerEmail: detail.guestEmail,
    guestPhone: detail.guestPhone,
    guestIdNumber: detail.guestNumber,
    specialRequests: detail.specialRequests,
    notes: detail.notes,
    checkIn: detail.checkInDate,
    checkOut: detail.checkOutDate,
    guests: detail.numberOfGuests,
    rooms: detail.numberOfRooms,
    totalPrice: getReservationTotalAmount(detail, totalAmount),
    nightlyRate: 0,
    extendPrice: 0,
    currency: '',
    cancellationFeeRate: undefined,
    includeInsurance: detail.hasInsurance,
    status:
      detail.status.toLowerCase() === 'confirmed'
        ? CUSTOMER_RESERVATION_STATUS.CONFIRMED
        : CUSTOMER_RESERVATION_STATUS.CANCELLED,
    source: 'customer',
    contractUrl: detail.contractUrl,
    invoiceUrl: detail.invoiceUrl,
    createdAt: detail.createdAt,
    updatedAt: detail.updatedAt,
  }
}

export function useCustomerReservationManager(
  hotelId: string,
  roomId: string,
  roomNumber: string,
  agencyId?: number
) {
  const queryClient = useQueryClient()
  const [savedReservationId, setSavedReservationId] = useState<number | null>(null)

  useEffect(() => {
    setSavedReservationId(getSavedCustomerRoomReservationId(hotelId, roomNumber))
  }, [hotelId, roomNumber])

  const myReservationsListQuery = useQuery({
    queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.list(),
    queryFn: ({ signal }) => getMyReservations(signal),
    enabled: hotelId.length > 0 && roomId.length > 0,
    select: (data) =>
      (data?.items ?? [])
        .filter(
          (item: ReservationListItem) =>
            String(item.hotelId) === hotelId &&
            Array.isArray(item.roomNumbers) &&
            reservationIncludesRoom(item.roomNumbers, roomNumber) &&
            item.status.toLowerCase() !== 'cancelled'
        )
        .sort((first, second) => second.id - first.id)[0],
  })

  const matchedItem = myReservationsListQuery.data ?? null

  const currentReservationDetailQuery = useQuery({
    queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.detail(matchedItem?.id ?? 0),
    queryFn: () => getMyReservationById(matchedItem!.id),
    enabled: matchedItem != null,
  })

  const fallbackReservationDetailQuery = useQuery({
    queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.detail(savedReservationId ?? 0),
    queryFn: () => getMyReservationById(savedReservationId!),
    enabled:
      matchedItem == null &&
      savedReservationId != null &&
      !myReservationsListQuery.isLoading,
  })

  const fallbackDetail = fallbackReservationDetailQuery.data
  const fallbackDetailMatchesRoom =
    fallbackDetail != null &&
    String(fallbackDetail.hotelId) === hotelId &&
    reservationIncludesRoom(fallbackDetail.roomNumbers, roomNumber) &&
    fallbackDetail.status.toLowerCase() !== 'cancelled'
  const currentReservationDetail =
    currentReservationDetailQuery.data ??
    (fallbackDetailMatchesRoom ? fallbackDetail : null)

  useEffect(() => {
    if (savedReservationId == null || fallbackDetail == null || fallbackDetailMatchesRoom) {
      return
    }

    clearSavedCustomerRoomReservationId(hotelId, roomNumber)
    setSavedReservationId(null)
  }, [fallbackDetail, fallbackDetailMatchesRoom, hotelId, roomNumber, savedReservationId])

  const currentReservation: CustomerReservation | null =
    currentReservationDetail != null
      ? mapDetailToCustomerReservation(
          currentReservationDetail,
          matchedItem?.totalAmount ?? 0,
          hotelId,
          roomId
        )
      : null

  const isLoading =
    myReservationsListQuery.isLoading ||
    (matchedItem != null && currentReservationDetailQuery.isLoading) ||
    (matchedItem == null && fallbackReservationDetailQuery.isLoading)

  const createReservationMutation = useMutation<
    ReservationDetail,
    unknown,
    CreateCustomerReservationInput
  >({
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.list() })
    },
    mutationFn: (input: CreateCustomerReservationInput) =>
      createCustomerReservation(agencyId ?? 0, Number(hotelId), {
        roomNumbers: [input.roomNumber],
        guestsNumber: '',
        checkInDate: input.checkIn,
        checkOutDate: input.checkOut,
        numberOfGuests: input.guests,
        hasInsurance: input.includeInsurance,
        contractFile: input.contractFile,
        invoiceFile: input.invoiceFile,
      }),
    onSuccess: (data) => {
      saveCustomerRoomReservationId(hotelId, roomNumber, data.id)
      setSavedReservationId(data.id)

      // Immediately seed the detail cache so the section renders without a second round-trip.
      queryClient.setQueryData(CUSTOMER_RESERVATION_QUERY_KEYS.detail(data.id), data)

      // Optimistically add the new reservation to the list cache so the select filter
      // finds it right away and enables the (already-cached) detail query.
      queryClient.setQueryData(
        CUSTOMER_RESERVATION_QUERY_KEYS.list(),
        (old: CustomerReservationListResponse | undefined) => {
          const newItem: ReservationListItem = {
            id: data.id,
            reservationNumber: data.reservationNumber,
            hotelId: data.hotelId,
            roomNumbers: data.roomNumbers,
            guestFullName: data.guestFullName,
            status: data.status,
            checkInDate: data.checkInDate,
            checkOutDate: data.checkOutDate,
            totalAmount: getReservationTotalAmount(data),
            taxAmount: data.taxAmount ?? 0,
            hasInsurance: data.hasInsurance,
            insuranceAmount: data.insuranceAmount,
          }
          if (!old) {
            return {
              items: [newItem],
              pageNumber: 1,
              pageSize: 1,
              totalCount: 1,
              totalPages: 1,
            }
          }

          const hasExistingItem = old.items.some(item => item.id === data.id)

          return {
            ...old,
            items: [newItem, ...old.items.filter(item => item.id !== data.id)],
            totalCount: hasExistingItem ? old.totalCount : old.totalCount + 1,
            totalPages: Math.max(old.totalPages, 1),
          }
        }
      )
    },
  })

  const cancelReservationMutation = useMutation<
    CancelCustomerReservationResponse,
    unknown,
    string
  >({
    mutationFn: (reservationId: string) => cancelMyReservation(Number(reservationId)),
    onSuccess: (_result, reservationId) => {
      clearSavedCustomerRoomReservationId(hotelId, roomNumber)
      setSavedReservationId(null)
      queryClient.invalidateQueries({ queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.list() })
      queryClient.invalidateQueries({
        queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.detail(Number(reservationId)),
      })
    },
  })

  const updateReservationMutation = useMutation<
    ReservationDetail,
    unknown,
    UpdateCustomerReservationInput
  >({
    mutationFn: (input: UpdateCustomerReservationInput) =>
      updateMyReservation(Number(input.reservationId), {
        checkInDate: input.checkIn,
        checkOutDate: input.checkOut,
        numberOfGuests: input.guests,
        guestPhone: input.guestPhone,
        guestNumber: input.guestIdNumber,
        hasInsurance: input.hasInsurance,
        specialRequests: input.specialRequests,
        notes: input.notes,
      }),
    onSuccess: (_result, input) => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.list() })
      queryClient.invalidateQueries({
        queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.detail(Number(input.reservationId)),
      })
    },
  })

  const extendReservationMutation = useMutation<
    ReservationDetail,
    unknown,
    ExtendCustomerReservationInput
  >({
    mutationFn: (input: ExtendCustomerReservationInput) =>
      updateMyReservation(Number(input.reservationId), {
        checkOutDate: input.checkOut,
      }),
    onSuccess: (_result, input) => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.list() })
      queryClient.invalidateQueries({
        queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.detail(Number(input.reservationId)),
      })
    },
  })

  const updateReservation = async (
    input: UpdateCustomerReservationInput
  ): Promise<CustomerReservation> => {
    const detail = await updateReservationMutation.mutateAsync(input)
    return mapDetailToCustomerReservation(detail, matchedItem?.totalAmount ?? 0, hotelId, roomId)
  }

  const cancelReservation = async (reservationId: string): Promise<CustomerReservation> => {
    const result: CancelCustomerReservationResponse =
      await cancelReservationMutation.mutateAsync(reservationId)
    return {
      id: reservationId,
      hotelId,
      roomId,
      hotelName: currentReservation?.hotelName ?? '',
      roomNumber: currentReservation?.roomNumber ?? '',
      checkIn: currentReservation?.checkIn ?? '',
      checkOut: currentReservation?.checkOut ?? '',
      guests: currentReservation?.guests ?? 0,
      rooms: currentReservation?.rooms ?? 0,
      totalPrice: result.totalAmount,
      nightlyRate: currentReservation?.nightlyRate ?? 0,
      extendPrice: currentReservation?.extendPrice ?? 0,
      currency: currentReservation?.currency ?? '',
      cancellationFee: result.cancellationFee,
      includeInsurance: currentReservation?.includeInsurance ?? false,
      status: CUSTOMER_RESERVATION_STATUS.CANCELLED,
      source: 'customer' as const,
      createdAt: currentReservation?.createdAt ?? '',
      updatedAt: result.cancelledAt,
    }
  }

  return {
    currentReservation,
    roomReservations: [] as CustomerReservation[],
    hotelReservations: [] as CustomerReservation[],
    isLoading,
    createReservation: createReservationMutation.mutateAsync,
    updateReservation,
    extendReservation: extendReservationMutation.mutateAsync,
    cancelReservation,
    isBusy:
      createReservationMutation.isPending ||
      updateReservationMutation.isPending ||
      extendReservationMutation.isPending ||
      cancelReservationMutation.isPending,
  }
}
