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

export interface ForgotPasswordResponse {
  success: boolean
  message: string
}

export interface VerifyResetCodeRequest {
  email: string
  code: string
}

export interface ResetPasswordRequest {
  email: string
  code: string
  newPassword: string
}

export const OTP_LENGTH = 6

export type ResetStepFactoryProps = {
  resetStep: ResetStep
  email: string
  isLoading: boolean
  onChangeEmail: (email: string) => void
  onSendCode: (email: string) => void
  onClose: () => void
  onVerifyOtp: (code: string) => void
  onSubmitPassword: (data: PasswordFormData) => void
  onGoToStep: (step: ResetStep) => void
}
