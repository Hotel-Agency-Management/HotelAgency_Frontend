import type {
  TaxDataPriceInput,
  TaxDataPriceLookupResult,
  TaxDataPriceResponse,
  TaxDataPriceResult,
} from '../types/taxData'
import { TAX_DATA_DEFAULT_PRODUCT_TYPE, TAX_DATA_PRICE_ENDPOINT } from '../constants/taxData'
import {
  buildTaxDataPriceParams,
  isPostalCodeRequiredForTax,
} from '../utils/taxDataRequest'
import { resolveCountryParam } from '../utils/taxCountry'
import {
  createRequiresPostalCodeTaxResult,
  createUnavailableTaxResult,
  hasPostalCodeValidationError,
  normalizeTaxDataPrice,
} from '../utils/taxDataResponse'

export const getTaxDataPrice = async ({
  amount,
  country,
  city,
  state,
  street,
  zip,
  type = TAX_DATA_DEFAULT_PRODUCT_TYPE,
}: TaxDataPriceInput): Promise<TaxDataPriceResult | null> => {
  const taxCountry = await resolveCountryParam(country)

  if (!taxCountry || amount <= 0) {
    return null
  }

  if (isPostalCodeRequiredForTax(taxCountry, zip)) {
    return null
  }

  const params = buildTaxDataPriceParams(
    {
      amount,
      city,
      country,
      state,
      street,
      type,
      zip,
    },
    taxCountry
  )

  try {
    const response = await fetch(`${TAX_DATA_PRICE_ENDPOINT}?${params.toString()}`)
    const payload = (await response.json()) as TaxDataPriceResponse

    if (!response.ok || payload.success === false) {
      return null
    }

    return normalizeTaxDataPrice(payload, amount)
  } catch {
    return null
  }
}

export const lookupTaxDataPrice = async (
  input: TaxDataPriceInput
): Promise<TaxDataPriceLookupResult> => {
  const taxCountry = await resolveCountryParam(input.country)

  if (!taxCountry || input.amount <= 0) {
    return createUnavailableTaxResult()
  }

  if (isPostalCodeRequiredForTax(taxCountry, input.zip)) {
    return createRequiresPostalCodeTaxResult()
  }

  const params = buildTaxDataPriceParams(input, taxCountry)

  try {
    const response = await fetch(`${TAX_DATA_PRICE_ENDPOINT}?${params.toString()}`)
    const payload = (await response.json()) as TaxDataPriceResponse

    if (hasPostalCodeValidationError(payload)) {
      return createRequiresPostalCodeTaxResult()
    }

    if (!response.ok || payload.success === false) {
      return createUnavailableTaxResult()
    }

    return {
      status: 'success',
      ...normalizeTaxDataPrice(payload, input.amount),
    }
  } catch {
    return createUnavailableTaxResult()
  }
}
