import { useQuery } from '@tanstack/react-query'
import {
  fetchAdminAllPayments,
  type AdminAllPaymentLogsParams,
  type AdminAllPaymentLogsResponse,
} from '../../client/adminPaymentLogsClient'

export function useAdminAllPaymentsQuery(params?: AdminAllPaymentLogsParams) {
  return useQuery<AdminAllPaymentLogsResponse>({
    queryKey: [
      'admin-payment-logs',
      'all',
      {
        pageNumber: params?.pageNumber,
        pageSize: params?.pageSize,
        type: params?.type,
        dateFrom: params?.dateFrom,
        dateTo: params?.dateTo,
        search: params?.search,
      },
    ],
    queryFn: () => fetchAdminAllPayments(params),
    placeholderData: (prev) => prev,
  })
}
