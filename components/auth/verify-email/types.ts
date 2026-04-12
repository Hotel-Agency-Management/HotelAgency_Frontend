import type { AlertColor, ButtonProps } from '@mui/material'
import type { LucideIcon } from 'lucide-react'

export type VerifyEmailStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'already-verified'
  | 'error'
  | 'invalid'

export type VerifyEmailTone = 'primary' | 'success' | 'info' | 'error' | 'warning'

export interface VerifyEmailViewProps {
  userId?: string
  token?: string
}

export interface ApiErrorData {
  message?: string
  email?: string
  alreadyVerified?: boolean
}

export interface VerifyEmailAction {
  key: string
  label: string
  variant: ButtonProps['variant']
  href?: string
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  icon?: LucideIcon
}

export interface VerifyEmailViewModel {
  badge: string
  title: string
  description: string
  message: string
  severity: AlertColor
  tone: VerifyEmailTone
  icon?: LucideIcon
  isLoadingIcon?: boolean
  actions: VerifyEmailAction[]
}

export interface VerifyEmailStateContext {
  hasValidParams: boolean
  hasStartedVerification: boolean
  isPending: boolean
  isSuccess: boolean
  dataAlreadyVerified?: boolean
  error: unknown
}

export interface VerifyEmailStrategyContext {
  message: string
  canSubmit: boolean
  isSubmitting: boolean
  onVerify: () => void
}

export interface CreateVerifyEmailMessageParams {
  hasValidParams: boolean
  hasStartedVerification: boolean
  isPending: boolean
  isSuccess: boolean
  successMessage?: string
  successAlreadyVerified?: boolean
  error: unknown
}

export type MessageResolver = (params: CreateVerifyEmailMessageParams) => string | null

export type StatusResolver = (verifyEmailContext: VerifyEmailStateContext) => VerifyEmailStatus | null
