import type { UserRole } from '@/lib/abilities'

export const SIGNUP_UI_ACCOUNT_TYPE = {
  CUSTOMER: 'customer',
  AGENCY_OWNER: 'agencyOwner',
} as const

export type SignupUiAccountType =
  (typeof SIGNUP_UI_ACCOUNT_TYPE)[keyof typeof SIGNUP_UI_ACCOUNT_TYPE]

export interface SignupFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  role: UserRole
}

export interface SignupFormProps {
  onSwitchToLogin: () => void
  initialStep?: number
}
