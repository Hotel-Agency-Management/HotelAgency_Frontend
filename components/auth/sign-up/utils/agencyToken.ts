import { decodeJwt } from 'jose'

type AgencyTokenPayload = {
  agencyId?: string | number
  exp?: number
}

export const getNumericAgencyId = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsedValue = Number(value)

    return Number.isFinite(parsedValue) ? parsedValue : null
  }

  return null
}

export const getAgencyIdFromToken = (token?: string): number | null => {
  if (!token) return null

  try {
    const payload = decodeJwt(token) as AgencyTokenPayload

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null
    }

    return getNumericAgencyId(payload.agencyId)
  } catch {
    return null
  }
}
