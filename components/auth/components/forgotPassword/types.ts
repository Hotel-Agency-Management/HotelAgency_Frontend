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

export type ResetStepFactoryProps = {
  resetStep: ResetStep
  email: string
  isLoading: boolean
  onChangeEmail: (email: string) => void
  onSendCode: (email: string) => void
  onClose: () => void
  onVerifyOtp: (code: string) => void
  onSubmitPassword: (data: any) => void
  onGoToStep: (step: ResetStep) => void
}
