import {
  MOCK_INCOMING_PAYMENTS,
  MOCK_OUTGOING_PAYMENTS,
} from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/data/mockPaymentLogs'
import type { PaymentLog } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/types'

export interface AdminHotel {
  id: string
  name: string
  city: string
}

export const ADMIN_HOTEL1_INCOMING = MOCK_INCOMING_PAYMENTS
export const ADMIN_HOTEL1_OUTGOING = MOCK_OUTGOING_PAYMENTS

// Hotel 2 — Azure Sea Resort, London
export const ADMIN_HOTEL2_INCOMING: PaymentLog[] = [
  {
    id: 8,
    type: 'Booking',
    amount: 980.0,
    from: 208,
    fromName: 'Lena Fischer',
    to: 2,
    toName: 'Azure Sea Resort',
    reservationId: 2001,
    createdAt: '2026-05-18T10:15:00Z',
    status: 'Completed',
  },
  {
    id: 9,
    type: 'Cancellation',
    amount: 210.0,
    from: 209,
    fromName: 'Omar Shaikh',
    to: 2,
    toName: 'Azure Sea Resort',
    reservationId: 2002,
    createdAt: '2026-05-16T12:00:00Z',
    status: 'Completed',
  },
  {
    id: 10,
    type: 'ReservationInsurance',
    amount: 60.0,
    from: 210,
    fromName: 'Priya Mehta',
    to: 2,
    toName: 'Azure Sea Resort',
    reservationId: 2003,
    createdAt: '2026-05-14T09:30:00Z',
    status: 'Completed',
  },
  {
    id: 11,
    type: 'Extend',
    amount: 330.0,
    from: 211,
    fromName: 'James Okafor',
    to: 2,
    toName: 'Azure Sea Resort',
    reservationId: 2004,
    createdAt: '2026-05-13T14:45:00Z',
    status: 'Completed',
  },
  {
    id: 12,
    type: 'Damage',
    amount: 540.0,
    from: 212,
    fromName: 'Sun Li',
    to: 2,
    toName: 'Azure Sea Resort',
    reservationId: 2005,
    createdAt: '2026-05-11T11:00:00Z',
    status: 'Completed',
  },
]

export const ADMIN_HOTEL2_OUTGOING: PaymentLog[] = [
  {
    id: 108,
    type: 'Refund',
    amount: 560.0,
    from: 2,
    fromName: 'Azure Sea Resort',
    to: 401,
    toName: 'Lena Fischer',
    reservationId: 2001,
    createdAt: '2026-05-18T14:00:00Z',
    status: 'Completed',
  },
  {
    id: 109,
    type: 'YearlyInsurance',
    amount: 1800.0,
    from: 2,
    fromName: 'Azure Sea Resort',
    to: 402,
    toName: 'CoastalGuard Insurance',
    createdAt: '2026-05-15T09:00:00Z',
    status: 'Completed',
  },
  {
    id: 110,
    type: 'Damage',
    amount: 380.0,
    from: 2,
    fromName: 'Azure Sea Resort',
    to: 403,
    toName: 'Atlantic Repairs Ltd.',
    reservationId: 2005,
    createdAt: '2026-05-12T16:30:00Z',
    status: 'Completed',
  },
  {
    id: 111,
    type: 'Booking',
    amount: 220.0,
    from: 2,
    fromName: 'Azure Sea Resort',
    to: 404,
    toName: 'BookNow Platform Fee',
    reservationId: 2001,
    createdAt: '2026-05-10T08:45:00Z',
    status: 'Completed',
  },
]

// Hotel 3 — Desert Rose Inn, Dubai
export const ADMIN_HOTEL3_INCOMING: PaymentLog[] = [
  {
    id: 13,
    type: 'Booking',
    amount: 2200.0,
    from: 213,
    fromName: 'Isabella Russo',
    to: 3,
    toName: 'Desert Rose Inn',
    reservationId: 3001,
    createdAt: '2026-05-17T16:00:00Z',
    status: 'Completed',
  },
  {
    id: 14,
    type: 'YearlyInsurance',
    amount: 1100.0,
    from: 214,
    fromName: 'Gulf Partners Ltd.',
    to: 3,
    toName: 'Desert Rose Inn',
    createdAt: '2026-05-15T08:00:00Z',
    status: 'Completed',
  },
  {
    id: 15,
    type: 'Refund',
    amount: 750.0,
    from: 215,
    fromName: 'Amir Khalil',
    to: 3,
    toName: 'Desert Rose Inn',
    reservationId: 3002,
    createdAt: '2026-05-12T13:00:00Z',
    status: 'Completed',
  },
  {
    id: 16,
    type: 'Extend',
    amount: 480.0,
    from: 216,
    fromName: 'Nora Andersen',
    to: 3,
    toName: 'Desert Rose Inn',
    reservationId: 3003,
    createdAt: '2026-05-10T10:30:00Z',
    status: 'Completed',
  },
]

export const ADMIN_HOTEL3_OUTGOING: PaymentLog[] = [
  {
    id: 112,
    type: 'Refund',
    amount: 1400.0,
    from: 3,
    fromName: 'Desert Rose Inn',
    to: 501,
    toName: 'Amir Khalil',
    reservationId: 3002,
    createdAt: '2026-05-13T10:00:00Z',
    status: 'Completed',
  },
  {
    id: 113,
    type: 'Damage',
    amount: 620.0,
    from: 3,
    fromName: 'Desert Rose Inn',
    to: 502,
    toName: 'Dubai Maintenance Co.',
    createdAt: '2026-05-11T14:00:00Z',
    status: 'Completed',
  },
  {
    id: 114,
    type: 'Cancellation',
    amount: 180.0,
    from: 3,
    fromName: 'Desert Rose Inn',
    to: 503,
    toName: 'Nora Andersen',
    reservationId: 3003,
    createdAt: '2026-05-09T09:15:00Z',
    status: 'Completed',
  },
]

export const ADMIN_ALL_INCOMING: PaymentLog[] = [
  ...ADMIN_HOTEL1_INCOMING,
  ...ADMIN_HOTEL2_INCOMING,
  ...ADMIN_HOTEL3_INCOMING,
]

export const ADMIN_ALL_OUTGOING: PaymentLog[] = [
  ...ADMIN_HOTEL1_OUTGOING,
  ...ADMIN_HOTEL2_OUTGOING,
  ...ADMIN_HOTEL3_OUTGOING,
]

export const HOTEL_INCOMING_MAP: Record<string, PaymentLog[]> = {
  '1': ADMIN_HOTEL1_INCOMING,
  '2': ADMIN_HOTEL2_INCOMING,
  '3': ADMIN_HOTEL3_INCOMING,
}

export const HOTEL_OUTGOING_MAP: Record<string, PaymentLog[]> = {
  '1': ADMIN_HOTEL1_OUTGOING,
  '2': ADMIN_HOTEL2_OUTGOING,
  '3': ADMIN_HOTEL3_OUTGOING,
}

export const ADMIN_HOTEL_LIST: AdminHotel[] = [
  { id: '1', name: 'Grand Palace Hotel', city: 'New York' },
  { id: '2', name: 'Azure Sea Resort', city: 'London' },
  { id: '3', name: 'Desert Rose Inn', city: 'Dubai' },
]
