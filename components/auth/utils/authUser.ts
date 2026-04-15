import type { AuthResponse, User } from '@/core/configs/authConfig'
import type { AgencyStatus } from '../types/authType'

type AuthResponseLike = AuthResponse & {
  id?: string | number
  email?: string
  name?: string
  firstName?: string
  lastName?: string
  role?: string
  agencyStatus?: AgencyStatus
  agencyId?: number
}

const isUserRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export const getAuthResponseUser = (response: AuthResponseLike): User | null => {
  if (isUserRecord(response.user)) {
    const user = response.user as User
    const agencyId = user.agencyId ?? response.agencyId

    return agencyId === undefined ? user : { ...user, agencyId }
  }

  if (response.email) {
    const fullName = [response.firstName, response.lastName]
      .filter((part): part is string => typeof part === 'string' && part.trim().length > 0)
      .join(' ')

    return {
      id: String(response.id ?? response.email),
      email: response.email,
      name: response.name ?? (fullName || undefined),
      firstName: response.firstName,
      lastName: response.lastName,
      role: response.role,
      agencyStatus: response.agencyStatus,
      agencyId: response.agencyId
    } as User
  }

  return null
}

export const getAuthDisplayName = (response: AuthResponseLike): string => {
  const user = getAuthResponseUser(response)

  if (user?.name) {
    return user.name
  }

  if (user?.email) {
    return user.email
  }

  return 'user'
}
