import type { AuthResponse, User } from '@/core/configs/authConfig'

type AuthResponseLike = AuthResponse & {
  id?: string | number
  email?: string
  name?: string
  firstName?: string
  lastName?: string
}

const isUserRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export const getAuthResponseUser = (response: AuthResponseLike): User | null => {
  if (isUserRecord(response.user)) {
    return response.user as User
  }

  if (response.email) {
    const fullName = [response.firstName, response.lastName]
      .filter((part): part is string => typeof part === 'string' && part.trim().length > 0)
      .join(' ')

    return {
      id: String(response.id ?? response.email),
      email: response.email,
      name: response.name ?? (fullName || undefined)
    }
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
