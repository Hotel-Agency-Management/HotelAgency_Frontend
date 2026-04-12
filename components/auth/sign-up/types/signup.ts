import type { UserRole } from '@/lib/abilities'

export type SignupAccountType = 'customer' | 'agencyOwner'

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
