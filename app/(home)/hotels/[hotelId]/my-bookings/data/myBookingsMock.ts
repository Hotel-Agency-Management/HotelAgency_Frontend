// TODO: Replace with real apiClient calls when backend is ready.
// Real endpoints:
//   GET /api/hotels/{hotelId}/reservations        → ReservationsListResponse
//   GET /api/hotels/{hotelId}/reservations/{id}   → ReservationDetail

import dayjs from 'dayjs'
import { sleep } from '@/app/(home)/agency/hotels/[hotelId]/rooms/util/delay'
import type { ReservationDetail, ReservationListItem, ReservationsListResponse } from '../types'

const mockListItems: ReservationListItem[] = [
  {
    id: 1,
    reservationNumber: 'RES-2026-000001',
    roomNumbers: ['100', '101'],
    guestFullName: 'Jane Doe',
    status: 'Confirmed',
    checkInDate: dayjs().add(5, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(9, 'day').format('YYYY-MM-DD'),
    createdAt: dayjs().subtract(3, 'day').toISOString(),
    totalAmount: 500,
  },
  {
    id: 2,
    reservationNumber: 'RES-2026-000002',
    roomNumbers: ['205'],
    guestFullName: 'Jane Doe',
    status: 'Pending',
    checkInDate: dayjs().add(15, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(18, 'day').format('YYYY-MM-DD'),
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    totalAmount: 300,
  },
  {
    id: 3,
    reservationNumber: 'RES-2026-000003',
    roomNumbers: ['310'],
    guestFullName: 'Jane Doe',
    status: 'Cancelled',
    checkInDate: dayjs().subtract(10, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    createdAt: dayjs().subtract(15, 'day').toISOString(),
    totalAmount: 250,
  },
  {
    id: 4,
    reservationNumber: 'RES-2026-000004',
    roomNumbers: ['100', '101'],
    guestFullName: 'Jane Doe',
    status: 'Confirmed',
    checkInDate: dayjs().add(30, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(35, 'day').format('YYYY-MM-DD'),
    createdAt: dayjs().toISOString(),
    totalAmount: 750,
  },
]

const mockDetails: Record<number, ReservationDetail> = {
  1: {
    id: 1,
    reservationNumber: 'RES-2026-000001',
    hotelId: 1,
    hotelName: 'Grand Palace Hotel',
    roomNumbers: ['100', '101'],
    customerId: 42,
    source: 'Phone',
    status: 'Confirmed',
    guestFullName: 'Jane Doe',
    guestEmail: 'jane.doe@example.com',
    guestPhone: '+1234567890',
    totalAmount: 500,
    guestIdNumber: 'B98765432',
    checkInDate: dayjs().add(5, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(9, 'day').format('YYYY-MM-DD'),
    numberOfGuests: 2,
    numberOfRooms: 2,
    contractUrl: null,
    invoiceUrl: null,
    specialRequests: 'Late check-in after 10pm',
    notes: 'Returning guest',
    createdById: 1,
    updatedById: 1,
  },
  2: {
    id: 2,
    reservationNumber: 'RES-2026-000002',
    hotelId: 1,
    hotelName: 'Grand Palace Hotel',
    roomNumbers: ['205'],
    customerId: 42,
    source: 'Walk-in',
    status: 'Pending',
    guestFullName: 'Jane Doe',
    guestEmail: 'jane.doe@example.com',
    guestPhone: '+1234567890',
    totalAmount: 300,
    guestIdNumber: 'B98765432',
    checkInDate: dayjs().add(15, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(18, 'day').format('YYYY-MM-DD'),
    numberOfGuests: 1,
    numberOfRooms: 1,
    contractUrl: null,
    invoiceUrl: null,
    specialRequests: null,
    notes: null,
    createdById: 1,
    updatedById: 1,
  },
  3: {
    id: 3,
    reservationNumber: 'RES-2026-000003',
    hotelId: 1,
    hotelName: 'Grand Palace Hotel',
    roomNumbers: ['310'],
    customerId: 42,
    source: 'Phone',
    status: 'Cancelled',
    guestFullName: 'Jane Doe',
    guestEmail: 'jane.doe@example.com',
    guestPhone: '+1234567890',
    totalAmount: 250,
    guestIdNumber: 'B98765432',
    checkInDate: dayjs().subtract(10, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    numberOfGuests: 2,
    numberOfRooms: 1,
    contractUrl: null,
    invoiceUrl: null,
    specialRequests: 'Early check-in if possible',
    notes: null,
    createdById: 1,
    updatedById: 2,
  },
  4: {
    id: 4,
    reservationNumber: 'RES-2026-000004',
    hotelId: 1,
    hotelName: 'Grand Palace Hotel',
    roomNumbers: ['100', '101'],
    customerId: 42,
    source: 'Phone',
    status: 'Confirmed',
    guestFullName: 'Jane Doe',
    guestEmail: 'jane.doe@example.com',
    guestPhone: '+1234567890',
    totalAmount: 750,
    guestIdNumber: 'B98765432',
    checkInDate: dayjs().add(30, 'day').format('YYYY-MM-DD'),
    checkOutDate: dayjs().add(35, 'day').format('YYYY-MM-DD'),
    numberOfGuests: 3,
    numberOfRooms: 2,
    contractUrl: null,
    invoiceUrl: null,
    specialRequests: null,
    notes: 'VIP guest',
    createdById: 1,
    updatedById: 1,
  },
}

export const myBookingsApi = {
  getMyBookings: async (_hotelId: string): Promise<ReservationsListResponse> => {
    await sleep(200)
    return { items: mockListItems }
  },

  getMyBookingDetail: async (
    _hotelId: string,
    reservationId: string
  ): Promise<ReservationDetail> => {
    await sleep(180)
    const detail = mockDetails[Number(reservationId)]
    if (!detail) throw new Error('Reservation not found.')
    return detail
  },
}
