import { REST_COUNTRIES_NAME_ENDPOINT } from '../constants/taxData'

export const resolveCountryParam = async (country?: string) => {
  const normalizedCountry = country?.trim()

  if (!normalizedCountry) {
    return undefined
  }

  if (/^[A-Z]{2}$/i.test(normalizedCountry)) {
    return normalizedCountry.toUpperCase()
  }

  try {
    const response = await fetch(
      `${REST_COUNTRIES_NAME_ENDPOINT}/${encodeURIComponent(normalizedCountry)}?fullText=true&fields=cca2`
    )
    const payload = (await response.json()) as Array<{ cca2?: string }>
    const countryCode = payload[0]?.cca2

    return countryCode ?? normalizedCountry
  } catch {
    return normalizedCountry
  }
}
