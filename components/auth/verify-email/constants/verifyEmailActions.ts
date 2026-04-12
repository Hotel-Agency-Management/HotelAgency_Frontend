import { RefreshCw } from 'lucide-react'
import { authConfig } from '@/core/configs/clientConfig'
import type { VerifyEmailAction, VerifyEmailStrategyContext } from '../types'

export const loginAction: VerifyEmailAction = {
  key: 'login',
  label: 'Go to Login',
  variant: 'contained',
  href: authConfig.loginPageURL
}

export const dashboardAction: VerifyEmailAction = {
  key: 'dashboard',
  label: 'Open Dashboard',
  variant: 'text',
  href: authConfig.homePageURL
}

export const verifyAction = (verifyContext: VerifyEmailStrategyContext): VerifyEmailAction => ({
  key: 'verify',
  label: 'Verify Email',
  variant: 'contained',
  onClick: verifyContext.onVerify,
  loading: verifyContext.isSubmitting,
  disabled: !verifyContext.canSubmit
})

export const retryAction = (verifyContext: VerifyEmailStrategyContext): VerifyEmailAction => ({
  key: 'retry',
  label: 'Try Again',
  variant: 'outlined',
  onClick: verifyContext.onVerify,
  loading: verifyContext.isSubmitting,
  disabled: !verifyContext.canSubmit,
  icon: RefreshCw
})
