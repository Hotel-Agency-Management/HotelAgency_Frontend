// TODO: Replace with real API calls when backend is ready.
// This file is a mock implementation and should be deleted once the API is integrated.

import dayjs from 'dayjs'
import { sleep } from '@/app/(home)/agency/hotels/[hotelId]/rooms/util/delay'
import { customerInvoicesApi } from '../invoice/data/customerInvoicesApi'
import {
  CUSTOMER_RESERVATION_STATUS,
  type CreateCustomerReservationInput,
  type CustomerReservation,
  type ExtendCustomerReservationInput,
  type UpdateCustomerReservationInput,
} from '../types/customerReservation'
import {
  calculateCancellationFee,
  calculateReservationExtensionTotal,
  calculateReservationTotal,
  canModifyReservation,
  findAvailabilityConflict,
  isValidReservationRange,
} from '../utils/customerReservationPolicy'

const buildSeedReservation = (
  seed: Omit<CustomerReservation, 'createdAt' | 'updatedAt' | 'status' | 'source' | 'totalPrice'>
): CustomerReservation => ({
  ...seed,
  totalPrice: calculateReservationTotal(seed.nightlyRate, seed.checkIn, seed.checkOut, seed.rooms),
  status: CUSTOMER_RESERVATION_STATUS.CONFIRMED,
  source: 'external',
  createdAt: dayjs().subtract(2, 'day').toISOString(),
  updatedAt: dayjs().subtract(2, 'day').toISOString(),
})

let mockReservations: CustomerReservation[] = [
  buildSeedReservation({
    id: 'seed-1',
    hotelId: '1',
    roomId: '1-1',
    hotelName: 'Grand Palace Hotel',
    roomNumber: 'GP-101',
    checkIn: dayjs().add(9, 'day').format('YYYY-MM-DD'),
    checkOut: dayjs().add(12, 'day').format('YYYY-MM-DD'),
    guests: 1,
    rooms: 1,
    currency: 'USD',
    cancellationFeeRate: 0.35,
    nightlyRate: 110,
    extendPrice: 200,
    includeInsurance: false,
  }),
  buildSeedReservation({
    id: 'seed-2',
    hotelId: '2',
    roomId: '2-1',
    hotelName: 'Azure Sea Resort',
    roomNumber: 'AZ-101',
    checkIn: dayjs().add(6, 'day').format('YYYY-MM-DD'),
    checkOut: dayjs().add(8, 'day').format('YYYY-MM-DD'),
    guests: 2,
    rooms: 1,
    currency: 'GBP',
    cancellationFeeRate: 0.25,
    nightlyRate: 95,
    extendPrice: 105,
    includeInsurance: false,
  }),
]

const sortReservations = (reservations: CustomerReservation[]) =>
  [...reservations].sort((left, right) => left.checkIn.localeCompare(right.checkIn))

const getRoomReservationsInternal = (hotelId: string, roomId: string) =>
  sortReservations(
    mockReservations.filter(
      reservation =>
        reservation.hotelId === hotelId &&
        reservation.roomId === roomId &&
        reservation.status === CUSTOMER_RESERVATION_STATUS.CONFIRMED
    )
  )

const getHotelReservationsInternal = (hotelId: string) =>
  sortReservations(
    mockReservations.filter(
      reservation =>
        reservation.hotelId === hotelId &&
        reservation.status === CUSTOMER_RESERVATION_STATUS.CONFIRMED
    )
  )

const getCustomerReservationInternal = (hotelId: string, roomId: string) =>
  mockReservations.find(
    reservation =>
      reservation.hotelId === hotelId &&
      reservation.roomId === roomId &&
      reservation.source === 'customer' &&
      reservation.status === CUSTOMER_RESERVATION_STATUS.CONFIRMED
  ) ?? null

const assertValidRange = (checkIn: string, checkOut: string) => {
  if (!isValidReservationRange(checkIn, checkOut)) {
    throw new Error('Check-out must be at least one day after check-in.')
  }
}

const assertAvailability = (
  hotelId: string,
  roomId: string,
  checkIn: string,
  checkOut: string,
  excludeReservationId?: string
) => {
  const conflict = findAvailabilityConflict(getRoomReservationsInternal(hotelId, roomId), {
    checkIn,
    checkOut,
    excludeReservationId,
  })

  if (conflict) {
    throw new Error(
      `This room is already reserved from ${conflict.checkIn} until ${conflict.checkOut}.`
    )
  }
}

export const customerReservationsApi = {
  getCurrentCustomerReservation: async (hotelId: string, roomId: string) => {
    await sleep(180)
    return getCustomerReservationInternal(hotelId, roomId)
  },

  getRoomReservations: async (hotelId: string, roomId: string) => {
    await sleep(180)
    return getRoomReservationsInternal(hotelId, roomId)
  },

  getHotelReservations: async (hotelId: string) => {
    await sleep(180)
    return getHotelReservationsInternal(hotelId)
  },

  createReservation: async (input: CreateCustomerReservationInput) => {
    await sleep(320)
    assertValidRange(input.checkIn, input.checkOut)

    if (getCustomerReservationInternal(input.hotelId, input.roomId) != null) {
      throw new Error('You already have an active reservation for this room.')
    }

    if (!input.termsAccepted || !input.customerSignatureDataUrl) {
      throw new Error('Terms acceptance and customer signature are required.')
    }

    assertAvailability(input.hotelId, input.roomId, input.checkIn, input.checkOut)

    const now = new Date().toISOString()
    const { termsAccepted, customerSignatureDataUrl, ...reservationInput } = input
    const reservationId = `reservation-${Date.now()}`
    const reservation: CustomerReservation = {
      id: reservationId,
      ...reservationInput,
      totalPrice: calculateReservationTotal(
        input.nightlyRate,
        input.checkIn,
        input.checkOut,
        input.rooms
      ),
      status: CUSTOMER_RESERVATION_STATUS.CONFIRMED,
      source: 'customer',
      termsAcceptedAt: termsAccepted ? now : undefined,
      customerSignatureDataUrl,
      createdAt: now,
      updatedAt: now,
    }

    const invoice = await customerInvoicesApi.createInvoice({
      reservationId,
      customerName: input.customerName ?? 'Guest customer',
      customerEmail: input.customerEmail ?? 'guest@example.com',
      hotelName: input.hotelName,
      hotelLogo: input.hotelLogo,
      hotelPrimaryColor: input.hotelPrimaryColor,
      hotelSecondaryColor: input.hotelSecondaryColor,
      hotelCountry: input.hotelCountry,
      hotelCity: input.hotelCity,
      hotelState: input.hotelState,
      hotelAddress: input.hotelAddress,
      hotelZip: input.hotelZip,
      roomName: input.roomNumber,
      roomType: input.roomType ?? input.roomNumber,
      currency: input.currency,
      checkInDate: input.checkIn,
      checkOutDate: input.checkOut,
      nights: dayjs(input.checkOut).diff(dayjs(input.checkIn), 'day'),
      numberOfRooms: input.rooms,
      pricePerNight: input.nightlyRate,
      paymentMethod: input.paymentMethod ?? 'Online payment',
      bookingSource: 'Customer portal',
    })

    reservation.invoice = invoice

    mockReservations = [...mockReservations, reservation]
    return reservation
  },

  updateReservation: async (input: UpdateCustomerReservationInput) => {
    await sleep(320)
    const reservationIndex = mockReservations.findIndex(
      reservation => reservation.id === input.reservationId && reservation.source === 'customer'
    )

    if (reservationIndex === -1) {
      throw new Error('Reservation not found.')
    }

    const reservation = mockReservations[reservationIndex]

    if (!canModifyReservation(reservation)) {
      throw new Error('Reservation changes are allowed only during the first 24 hours.')
    }

    assertValidRange(input.checkIn, input.checkOut)
    assertAvailability(
      reservation.hotelId,
      input.roomId,
      input.checkIn,
      input.checkOut,
      reservation.id
    )

    const updatedReservation: CustomerReservation = {
      ...reservation,
      ...input,
      totalPrice: calculateReservationTotal(
        input.nightlyRate,
        input.checkIn,
        input.checkOut,
        input.rooms
      ),
      updatedAt: new Date().toISOString(),
    }

    mockReservations = mockReservations.map(current =>
      current.id === reservation.id ? updatedReservation : current
    )

    return updatedReservation
  },

  extendReservation: async (input: ExtendCustomerReservationInput) => {
    await sleep(280)
    const reservationIndex = mockReservations.findIndex(
      reservation => reservation.id === input.reservationId && reservation.source === 'customer'
    )

    if (reservationIndex === -1) {
      throw new Error('Reservation not found.')
    }

    const reservation = mockReservations[reservationIndex]

    if (!dayjs(input.checkOut).isAfter(dayjs(reservation.checkOut), 'day')) {
      throw new Error('The new check-out date must be later than the current one.')
    }

    assertAvailability(
      reservation.hotelId,
      reservation.roomId,
      reservation.checkIn,
      input.checkOut,
      reservation.id
    )

    const updatedReservation: CustomerReservation = {
      ...reservation,
      checkOut: input.checkOut,
      totalPrice:
        reservation.totalPrice +
        calculateReservationExtensionTotal(
          reservation.extendPrice,
          reservation.checkOut,
          input.checkOut,
          reservation.rooms
        ),
      updatedAt: new Date().toISOString(),
    }

    mockReservations = mockReservations.map(current =>
      current.id === reservation.id ? updatedReservation : current
    )

    return updatedReservation
  },

  cancelReservation: async (reservationId: string) => {
    await sleep(260)
    const reservationIndex = mockReservations.findIndex(
      reservation => reservation.id === reservationId && reservation.source === 'customer'
    )

    if (reservationIndex === -1) {
      throw new Error('Reservation not found.')
    }

    const reservation = mockReservations[reservationIndex]
    const cancellationFee = calculateCancellationFee(reservation)
    const updatedReservation: CustomerReservation = {
      ...reservation,
      status: CUSTOMER_RESERVATION_STATUS.CANCELLED,
      cancellationFee,
      cancelledAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockReservations = mockReservations.map(current =>
      current.id === reservation.id ? updatedReservation : current
    )

    return updatedReservation
  },
}
