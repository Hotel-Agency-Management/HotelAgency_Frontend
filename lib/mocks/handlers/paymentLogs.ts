import { http, HttpResponse, delay } from 'msw'
import {
  MOCK_INCOMING_PAYMENTS,
  MOCK_OUTGOING_PAYMENTS,
} from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/data/mockPaymentLogs'
import type { PaginatedPaymentLogs } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/types'

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
]
