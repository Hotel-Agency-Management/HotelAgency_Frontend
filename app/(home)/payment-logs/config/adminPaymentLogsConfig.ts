import type { PaymentLogItem } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/config/paymentLogsConfig'
import { PaymentType } from '../../agency/hotels/[hotelId]/payment-logs/types/payment'

export interface AdminAllPaymentLogsParams {
  pageNumber?: number
  pageSize?: number
  type?: PaymentType
  dateFrom?: string
  dateTo?: string
  search?: string
}

export interface AdminAllPaymentLogsResponse {
  items: PaymentLogItem[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}
