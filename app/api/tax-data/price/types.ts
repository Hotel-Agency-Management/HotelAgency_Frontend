import type { TAX_DATA_ALLOWED_QUERY_PARAMS } from './constants'

export type TaxDataAllowedQueryParam = (typeof TAX_DATA_ALLOWED_QUERY_PARAMS)[number]

export interface TaxDataProxyResult {
  payload: unknown
  status: number
}
