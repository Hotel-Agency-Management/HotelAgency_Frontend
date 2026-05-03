export interface TaxDataPriceInput {
  amount: number
  country?: string
  city?: string
  state?: string
  street?: string
  zip?: string
  type?: string
}

export interface TaxDataPriceResult {
  taxRate: number
  taxAmount: number
}

export type TaxDataPriceLookupResult =
  | {
      status: 'success'
      taxRate: number
      taxAmount: number
    }
  | {
      status: 'requiresPostalCode' | 'unavailable'
      taxRate: null
      taxAmount: null
    }

export interface TaxDataPriceResponse {
  success?: boolean
  vat_rate?: number
  price_excl_vat?: number
  price_incl_vat?: number
  error?: {
    context?: Record<string, string[]>
  }
}
