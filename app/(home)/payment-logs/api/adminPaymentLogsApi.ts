// TODO: swap mock imports for apiClient calls once backend is ready
// import apiClient from '@/core/clients/apiClient'
import type { PaginatedPaymentLogs, PaymentLog } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/types'
import {
  ADMIN_ALL_INCOMING,
  ADMIN_ALL_OUTGOING,
  HOTEL_INCOMING_MAP,
  HOTEL_OUTGOING_MAP,
  ADMIN_HOTEL_LIST,
  type AdminHotel,
} from '../data/adminPaymentLogsMock'

export type { AdminHotel }

export interface AdminPaymentLogsParams {
  page?: number
  pageSize?: number
  hotelId?: string | null
}

function buildPage(items: PaymentLog[], page = 1, pageSize = 10): PaginatedPaymentLogs {
  const start = (page - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    totalCount: items.length,
    totalAmount: items.reduce((sum, p) => sum + p.amount, 0),
    page,
    pageSize,
  }
}

export async function fetchAdminIncomingPayments(
  params?: AdminPaymentLogsParams
): Promise<PaginatedPaymentLogs> {
  // TODO: return apiClient
  //   .get('/api/admin/payment-logs/incoming', { params })
  //   .then(r => r.data)
  const source = params?.hotelId
    ? (HOTEL_INCOMING_MAP[params.hotelId] ?? [])
    : ADMIN_ALL_INCOMING
  return buildPage(source, params?.page, params?.pageSize)
}

export async function fetchAdminOutgoingPayments(
  params?: AdminPaymentLogsParams
): Promise<PaginatedPaymentLogs> {
  // TODO: return apiClient
  //   .get('/api/admin/payment-logs/outgoing', { params })
  //   .then(r => r.data)
  const source = params?.hotelId
    ? (HOTEL_OUTGOING_MAP[params.hotelId] ?? [])
    : ADMIN_ALL_OUTGOING
  return buildPage(source, params?.page, params?.pageSize)
}

export async function fetchAdminHotelsList(): Promise<{ hotels: AdminHotel[] }> {
  // TODO: return apiClient.get('/api/admin/hotels/list').then(r => r.data)
  return { hotels: ADMIN_HOTEL_LIST }
}
