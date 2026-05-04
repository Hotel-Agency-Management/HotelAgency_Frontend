import type { AuthResponse, User } from '@/core/configs/authConfig'

const isUserRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export const getAuthResponseUser = (response: AuthResponse): User | null => {
  if (isUserRecord(response.user)) {
    const user = response.user as User
    const agencyId = user.agencyId ?? (response.agencyId as number | undefined)
    const hotelId = user.hotelId ?? (response.hotelId as string | undefined)

    return {
      ...user,
      ...(agencyId !== undefined ? { agencyId } : {}),
      ...(hotelId != null ? { hotelId: String(hotelId) } : {}),
      ...(response.hotelTheme ? { hotelTheme: response.hotelTheme } : {}),
      ...(response.agencyTheme ? { agencyTheme: response.agencyTheme } : {}),
    }
  }

  const email = response.email as string | undefined
  if (email) {
    const firstName = response.firstName as string | undefined
    const lastName = response.lastName as string | undefined
    const fullName = [firstName, lastName]
      .filter((part): part is string => typeof part === 'string' && part.trim().length > 0)
      .join(' ')

    return {
      id: String((response.id as string | number | undefined) ?? email),
      email,
      name: (response.name as string | undefined) ?? (fullName || undefined),
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      role: response.role as User['role'],
      agencyStatus: response.agencyStatus as User['agencyStatus'],
      agencyId: response.agencyId as number | undefined,
      hotelId: response.hotelId as string | undefined,
      hotelTheme: response.hotelTheme,
      agencyTheme: response.agencyTheme,
    }
  }

  return null
}

export const getAuthDisplayName = (response: AuthResponse): string => {
  const user = getAuthResponseUser(response)

  if (user?.name) {
    return user.name
  }

  if (user?.email) {
    return user.email
  }

  return 'user'
}
