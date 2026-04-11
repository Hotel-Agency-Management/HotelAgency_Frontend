import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  forgetPassword,
  validateResetCode,
  submitResetPassword
} from '../client/forgetPasswordClient'
import {
  ResetPassRequest,
  VerifyCodeRequest
} from '../config/passwordConfig'
import { getErrorMessage } from '@/core/utils/apiError'
import { ResetStep } from '../components/forgotPassword/types'

interface UsePasswordResetReturn {
  resetStep: ResetStep
  isLoading: boolean
  sendCode: (email: string) => Promise<void>
  verifyCode: (email: string, code: string) => Promise<void>
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>
  goToStep: (step: ResetStep) => void
  reset: () => void
}

export const usePasswordReset = (
  onSuccess?: () => void
): UsePasswordResetReturn => {
  const [resetStep, setResetStep] = useState<ResetStep>('email')
  const [isLoading, setIsLoading] = useState(false)

  const goToStep = (step: ResetStep) => setResetStep(step)

  const reset = () => {
    setResetStep('email')
    setIsLoading(false)
  }

  const sendCode = async (email: string) => {
    if (!email) return

    setIsLoading(true)
    try {
      await forgetPassword(email)
      goToStep('code')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to send code. Please try again.'))
    } finally {
      setIsLoading(false)
    }
  }

  const verifyCode = async (email: string, code: string) => {
    setIsLoading(true)
    try {
      await validateResetCode({ email, code })
      goToStep('password')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to verify code. Please try again.'))
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (
    email: string,
    code: string,
    newPassword: string
  ) => {
    setIsLoading(true)
    try {
      await submitResetPassword({
        email,
        code,
        newPassword
      })
      reset()
      onSuccess?.()
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to reset password. Please try again.'))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    resetStep,
    isLoading,
    sendCode,
    verifyCode,
    resetPassword,
    goToStep,
    reset
  }
}
