import type {
  TaxDataPriceLookupResult,
  TaxDataPriceResponse,
  TaxDataPriceResult,
} from '../types/taxData'

export const createUnavailableTaxResult = (): TaxDataPriceLookupResult => ({
  status: 'unavailable',
  taxRate: null,
  taxAmount: null,
})

export const createRequiresPostalCodeTaxResult = (): TaxDataPriceLookupResult => ({
  status: 'requiresPostalCode',
  taxRate: null,
  taxAmount: null,
})

export const hasPostalCodeValidationError = (payload: TaxDataPriceResponse) =>
  Boolean(payload.error?.context?.zip)

export const normalizeTaxDataPrice = (
  payload: TaxDataPriceResponse,
  amount: number
): TaxDataPriceResult => {
  const taxRate = typeof payload.vat_rate === 'number' ? payload.vat_rate : 0
  const apiTaxAmount =
    typeof payload.price_incl_vat === 'number' && typeof payload.price_excl_vat === 'number'
      ? payload.price_incl_vat - payload.price_excl_vat
      : amount * taxRate

  return {
    taxRate,
    taxAmount: Math.max(apiTaxAmount, 0),
  }
}
