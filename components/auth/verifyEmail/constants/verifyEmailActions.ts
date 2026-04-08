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

export const verifyAction = (ctx: VerifyEmailStrategyContext): VerifyEmailAction => ({
  key: 'verify',
  label: 'Verify Email',
  variant: 'contained',
  onClick: ctx.onVerify,
  loading: ctx.isSubmitting,
  disabled: !ctx.canSubmit
})

export const retryAction = (ctx: VerifyEmailStrategyContext): VerifyEmailAction => ({
  key: 'retry',
  label: 'Try Again',
  variant: 'outlined',
  onClick: ctx.onVerify,
  loading: ctx.isSubmitting,
  disabled: !ctx.canSubmit,
  icon: RefreshCw
})
