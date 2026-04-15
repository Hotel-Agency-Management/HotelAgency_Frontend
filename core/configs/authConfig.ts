import type { UserRole } from '@/lib/abilities'
import { HotelFormValues } from "@/app/(home)/agency/hotels/types/hotel"
import { ProfileAgencyData } from "@/app/(home)/profile/types/profile"
import { AgencyStatus } from '@/components/auth/types/authType'

// ** Auth Types - Simple and modifiable
export interface User {
  id: string
  email: string
  name?: string
  role?: UserRole
  agencyName?: string
  hotelId?: string
  agencyStatus?: AgencyStatus
  firstName?: string
  lastName?: string
  phoneNumber?: string
  dateOfBirth?: string
  gender?: string
  updatedAt?: string
  createdAt?: string
  agency?: ProfileAgencyData
  hotel?: HotelFormValues
  [key: string]: unknown
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
  token: string
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
  signup: (credentials: SignupPayload, onError?: ErrorCallback, redirect?: boolean) => Promise<boolean>
  logout: () => Promise<void>

  // ** Utilities
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setAuthData: (response: AuthResponse) => void
}

// ** Error callback type
export type ErrorCallback = (error: string | Record<string, string>) => void
