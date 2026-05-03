import {
  POSTAL_CODE_REQUIRED_COUNTRIES,
  TAX_DATA_DEFAULT_PRODUCT_TYPE,
} from '../constants/taxData'
import type { TaxDataPriceInput } from '../types/taxData'

export const isPostalCodeRequiredForTax = (taxCountry: string, zip?: string) =>
  POSTAL_CODE_REQUIRED_COUNTRIES.includes(
    taxCountry as (typeof POSTAL_CODE_REQUIRED_COUNTRIES)[number]
  ) && !zip?.trim()

export const buildTaxDataPriceParams = (input: TaxDataPriceInput, taxCountry: string) => {
  const params = new URLSearchParams({
    amount: String(input.amount),
    country: taxCountry,
    type: input.type ?? TAX_DATA_DEFAULT_PRODUCT_TYPE,
  })

  if (input.city) params.set('city', input.city)
  if (input.state) params.set('state', input.state)
  if (input.street) params.set('street', input.street)
  if (input.zip) params.set('zip', input.zip)

  return params
}
