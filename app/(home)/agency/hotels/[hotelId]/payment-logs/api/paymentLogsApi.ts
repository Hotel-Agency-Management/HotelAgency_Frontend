// TODO: swap mock imports for apiClient calls once backend is ready
// import apiClient from '@/core/clients/apiClient'
import {
  MOCK_INCOMING_PAYMENTS,
  MOCK_OUTGOING_PAYMENTS,
} from '../data/mockPaymentLogs'
import type { PaginatedPaymentLogs, PaymentLogsParams } from '../types'

function buildPage(
  all: typeof MOCK_INCOMING_PAYMENTS,
  page = 1,
  pageSize = 7
): PaginatedPaymentLogs {
  const start = (page - 1) * pageSize
  return {
    items: all.slice(start, start + pageSize),
    totalCount: all.length,
    totalAmount: all.reduce((sum, p) => sum + p.amount, 0),
    page,
    pageSize,
  }
}

export async function fetchIncomingPayments(
  _hotelId: string,
  params?: PaymentLogsParams
): Promise<PaginatedPaymentLogs> {
  // TODO: return apiClient.get(`/api/admin/hotels/${_hotelId}/payment-logs/incoming`, { params }).then(r => r.data)
  return buildPage(MOCK_INCOMING_PAYMENTS, params?.page, params?.pageSize)
}

export async function fetchOutgoingPayments(
  _hotelId: string,
  params?: PaymentLogsParams
): Promise<PaginatedPaymentLogs> {
  // TODO: return apiClient.get(`/api/admin/hotels/${_hotelId}/payment-logs/outgoing`, { params }).then(r => r.data)
  return buildPage(MOCK_OUTGOING_PAYMENTS, params?.page, params?.pageSize)
}
