import { CheckCircle2, MailCheck, ShieldAlert, TriangleAlert } from 'lucide-react'
import { verifyAction, loginAction, dashboardAction, retryAction } from '../constants/verifyEmailActions'
import { VerifyEmailStrategyContext, VerifyEmailViewModel, VerifyEmailStatus } from '../types'

type VerifyEmailStrategy = (context: VerifyEmailStrategyContext) => VerifyEmailViewModel

export const verifyEmailStrategies: Record<VerifyEmailStatus, VerifyEmailStrategy> = {
  idle: ctx => ({
    badge: 'Account Security',
    title: 'Verify your email address',
    description: 'Confirm your email to activate the account and continue using HotelAgency.',
    message: ctx.message,
    severity: 'info',
    tone: 'primary',
    icon: MailCheck,
    actions: [verifyAction(ctx)]
  }),
  loading: ctx => ({
    badge: 'Checking Link',
    title: 'Verifying your email address',
    description: 'Please wait while we confirm your verification link.',
    message: ctx.message,
    severity: 'info',
    tone: 'primary',
    isLoadingIcon: true,
    actions: []
  }),
  success: ctx => ({
    badge: 'Email Confirmed',
    title: 'Your email is verified',
    description: 'Everything is ready. You can sign in and continue using HotelAgency.',
    message: ctx.message,
    severity: 'success',
    tone: 'success',
    icon: CheckCircle2,
    actions: [loginAction, dashboardAction]
  }),
  'already-verified': ctx => ({
    badge: 'Already Verified',
    title: 'This email is already verified',
    description: 'The account is already active. You can continue to sign in.',
    message: ctx.message,
    severity: 'success',
    tone: 'info',
    icon: MailCheck,
    actions: [loginAction, dashboardAction]
  }),
  error: ctx => ({
    badge: 'Verification Failed',
    title: 'We could not verify this email',
    description: 'The link may be expired, invalid, or replaced by a newer one.',
    message: ctx.message,
    severity: 'error',
    tone: 'error',
    icon: ShieldAlert,
    actions: [loginAction, retryAction(ctx)]
  }),
  invalid: ctx => ({
    badge: 'Invalid Link',
    title: 'This verification link is incomplete',
    description: 'Open the original email again and use the latest verification link.',
    message: ctx.message,
    severity: 'warning',
    tone: 'warning',
    icon: TriangleAlert,
    actions: [loginAction]
  })
}
