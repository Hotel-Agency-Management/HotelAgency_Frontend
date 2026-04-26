import type { TaxDataProxyResult } from './types'
import {
  buildTaxDataPriceUrl,
  createMissingApiKeyPayload,
  createTaxDataRequestFailurePayload,
} from './utils'

export const getTaxDataPrice = async (
  searchParams: URLSearchParams
): Promise<TaxDataProxyResult> => {
  const apiKey = process.env.TAX_DATA_API_KEY

  if (!apiKey) {
    return {
      payload: createMissingApiKeyPayload(),
      status: 200,
    }
  }

  try {
    const response = await fetch(buildTaxDataPriceUrl(searchParams), {
      method: 'GET',
      headers: {
        apikey: apiKey,
      },
      cache: 'no-store',
    })
    const payload = await response.json()

    return {
      payload,
      status: response.ok ? 200 : response.status,
    }
  } catch {
    return {
      payload: createTaxDataRequestFailurePayload(),
      status: 200,
    }
  }
}
