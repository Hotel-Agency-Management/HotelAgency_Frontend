import type { UserRole } from '@/lib/abilities'

// ** Auth Types - Simple and modifiable
export interface User {
  id: string
  email: string
  name?: string
  role?: UserRole
  agencyName?: string
  hotelId?: string
  [key: string]: unknown // Allow additional custom fields
}

export interface LoginCredentials {
  email: string
  password: string
  [key: string]: unknown // Allow additional fields like rememberMe, etc.
}

export interface SignupCredentials {
  email: string
  password: string
  name?: string
  [key: string]: unknown // Allow additional fields
}

export type SignupPayload = SignupCredentials | FormData

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken?: string
  [key: string]: unknown // Allow additional response fields
}

export interface AuthContextType {
  // ** State
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  // ** Actions
  login: (credentials: LoginCredentials, onError?: ErrorCallback) => Promise<void>
  signup: (credentials: SignupPayload, onError?: ErrorCallback) => Promise<void>
  logout: () => Promise<void>

  // ** Utilities
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

// ** Error callback type
export type ErrorCallback = (error: string | Record<string, string>) => void
