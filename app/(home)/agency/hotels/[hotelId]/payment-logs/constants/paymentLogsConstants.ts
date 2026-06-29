import { PAYMENT_TYPE_CONFIG } from './paymentTypeConfig'
import type { PaymentLogsFilters } from '../types/payment'

export const DEFAULT_FILTERS: PaymentLogsFilters = {
  search: '',
  transactionType: '',
  type: '',
}

export const PAGE_SIZE_OPTIONS = [7, 10, 20, 50]

export const PAYMENT_TYPE_OPTIONS = Object.keys(PAYMENT_TYPE_CONFIG) as Array<keyof typeof PAYMENT_TYPE_CONFIG>
