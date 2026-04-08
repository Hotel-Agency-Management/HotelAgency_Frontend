export type ResetStep = 'email' | 'code' | 'password'

export interface ForgotPasswordDialogProps {
  open: boolean
  initialEmail?: string
  onClose: () => void
}

export interface PasswordFormData {
  newPassword: string
  confirmPassword: string
}

export const OTP_LENGTH = 6

