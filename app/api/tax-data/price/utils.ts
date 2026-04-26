import { TAX_DATA_ALLOWED_QUERY_PARAMS, TAX_DATA_PRICE_URL } from './constants'

export const buildTaxDataPriceUrl = (searchParams: URLSearchParams) => {
  const upstreamUrl = new URL(TAX_DATA_PRICE_URL)

  TAX_DATA_ALLOWED_QUERY_PARAMS.forEach(param => {
    const value = searchParams.get(param)

    if (value) {
      upstreamUrl.searchParams.set(param, value)
    }
  })

  return upstreamUrl
}

export const createMissingApiKeyPayload = () => ({
  success: false,
  message: 'TAX_DATA_API_KEY is not configured.',
  vat_rate: 0,
})

export const createTaxDataRequestFailurePayload = () => ({
  success: false,
  message: 'Failed to request Tax Data API.',
  vat_rate: 0,
})
