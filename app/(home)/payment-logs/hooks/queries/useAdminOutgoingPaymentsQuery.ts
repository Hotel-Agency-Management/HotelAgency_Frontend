'use client'

import { useQuery } from '@tanstack/react-query'
import {
  fetchAdminOutgoingPayments,
  type AdminPaymentLogsParams,
} from '../../api/adminPaymentLogsApi'

export function useAdminOutgoingPaymentsQuery(params?: AdminPaymentLogsParams) {
  return useQuery({
    queryKey: [
      'admin-payment-logs',
      'outgoing',
      { hotelId: params?.hotelId ?? null, page: params?.page, pageSize: params?.pageSize },
    ],
    queryFn: () => fetchAdminOutgoingPayments(params),
  })
}
