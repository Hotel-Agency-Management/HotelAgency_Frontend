import { http, HttpResponse, delay } from 'msw'
import {
  MOCK_INCOMING_PAYMENTS,
  MOCK_OUTGOING_PAYMENTS,
} from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/data/mockPaymentLogs'
import type { PaginatedPaymentLogs } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/types'
import {
  ADMIN_ALL_INCOMING,
  ADMIN_ALL_OUTGOING,
  HOTEL_INCOMING_MAP,
  HOTEL_OUTGOING_MAP,
  ADMIN_HOTEL_LIST,
} from '@/app/(home)/payment-logs/data/adminPaymentLogsMock'

const API_BASE = '/api/admin/hotels'
const SIMULATED_DELAY = 350

function paginate(
  items: typeof MOCK_INCOMING_PAYMENTS,
  page: number,
  pageSize: number
): PaginatedPaymentLogs {
  const start = (page - 1) * pageSize
  const sliced = items.slice(start, start + pageSize)
  const totalAmount = items.reduce((sum, p) => sum + p.amount, 0)
  return {
    items: sliced,
    totalCount: items.length,
    totalAmount,
    page,
    pageSize,
  }
}

export const paymentLogHandlers = [
  // Hotel-scoped endpoints
  http.get(`${API_BASE}/:hotelId/payment-logs/incoming`, async ({ request }) => {
    await delay(SIMULATED_DELAY)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? '1')
    const pageSize = Number(url.searchParams.get('pageSize') ?? '7')
    return HttpResponse.json(paginate(MOCK_INCOMING_PAYMENTS, page, pageSize))
  }),

  http.get(`${API_BASE}/:hotelId/payment-logs/outgoing`, async ({ request }) => {
    await delay(SIMULATED_DELAY)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? '1')
    const pageSize = Number(url.searchParams.get('pageSize') ?? '7')
    return HttpResponse.json(paginate(MOCK_OUTGOING_PAYMENTS, page, pageSize))
  }),

  // Admin-level endpoints (all hotels, optional hotelId filter)
  http.get('/api/admin/payment-logs/incoming', async ({ request }) => {
    await delay(SIMULATED_DELAY)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? '1')
    const pageSize = Number(url.searchParams.get('pageSize') ?? '10')
    const hotelId = url.searchParams.get('hotelId') ?? ''
    const source = hotelId ? (HOTEL_INCOMING_MAP[hotelId] ?? []) : ADMIN_ALL_INCOMING
    return HttpResponse.json(paginate(source, page, pageSize))
  }),

  http.get('/api/admin/payment-logs/outgoing', async ({ request }) => {
    await delay(SIMULATED_DELAY)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? '1')
    const pageSize = Number(url.searchParams.get('pageSize') ?? '10')
    const hotelId = url.searchParams.get('hotelId') ?? ''
    const source = hotelId ? (HOTEL_OUTGOING_MAP[hotelId] ?? []) : ADMIN_ALL_OUTGOING
    return HttpResponse.json(paginate(source, page, pageSize))
  }),

  http.get('/api/admin/hotels/list', async () => {
    await delay(SIMULATED_DELAY)
    return HttpResponse.json({ hotels: ADMIN_HOTEL_LIST })
  }),
]
