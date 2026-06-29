'use client'

import { usePaymentLogsFilters } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/hooks/usePaymentLogsFilters'
import { useAdminHotelPaymentsQuery } from './queries/useAdminHotelPaymentsQuery'
import { useAdminPaymentLogDetailsQuery } from './queries/useAdminPaymentLogDetailsQuery'

export function useAdminPaymentLogs(agencyId: string, hotelId: string) {
  const core = usePaymentLogsFilters()

  const query = useAdminHotelPaymentsQuery(agencyId, hotelId, {
    pageNumber: core.pageNumber,
    pageSize: core.pageSize,
    ...(core.filters.search ? { search: core.filters.search } : {}),
    ...(core.filters.transactionType ? { transactionType: core.filters.transactionType } : {}),
    ...(core.filters.type ? { type: core.filters.type } : {}),
  })
  const detailsQuery = useAdminPaymentLogDetailsQuery(agencyId, hotelId, core.selectedPaymentId ?? undefined)

  return {
    ...core,
    query,
    detailsQuery,
  }
}
