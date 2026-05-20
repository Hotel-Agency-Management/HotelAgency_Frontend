'use client'

import { useQuery } from '@tanstack/react-query'
import {
  fetchAdminIncomingPayments,
  type AdminPaymentLogsParams,
} from '../../api/adminPaymentLogsApi'

export function useAdminIncomingPaymentsQuery(params?: AdminPaymentLogsParams) {
  return useQuery({
    queryKey: [
      'admin-payment-logs',
      'incoming',
      { hotelId: params?.hotelId ?? null, page: params?.page, pageSize: params?.pageSize },
    ],
    queryFn: () => fetchAdminIncomingPayments(params),
  })
}
