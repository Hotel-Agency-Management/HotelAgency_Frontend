'use client'

import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ForgotPasswordDialogProps, PasswordFormData, ResetStep } from './types'
import { renderResetStep } from './factories/renderResetStep'
import { usePasswordReset } from './hooks/usePasswordReset'

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({
  open,
  initialEmail = '',
  onClose
}) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const {
    resetStep,
    isLoading,
    goToStep,
    sendCode,
    verifyCode,
    resetPassword,
    reset
  } = usePasswordReset(() => {
    handleClose()
  })

  useEffect(() => {
    if (!open) return

    setEmail(initialEmail)
  }, [initialEmail, open])

  const handleClose = () => {
    reset()
    setEmail('')
    setOtp('')
    onClose()
  }

  const handleSubmitPassword = async (data: PasswordFormData) => {
    await resetPassword(email, otp, data.newPassword)
  }

  const handleVerifyOtp = async (nextOtp: string) => {
    setOtp(nextOtp)
    await verifyCode(email, nextOtp)
  }

  const stepTitles: Record<ResetStep, string> = {
    email: t('forgotPassword.steps.email'),
    code: t('forgotPassword.steps.code'),
    password: t('forgotPassword.steps.password')
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle>{stepTitles[resetStep]}</DialogTitle>

      <DialogContent>
        {renderResetStep({
          resetStep,
          email,
          isLoading,
          onChangeEmail: setEmail,
          onSendCode: sendCode,
          onClose: handleClose,
          onVerifyOtp: handleVerifyOtp,
          onSubmitPassword: handleSubmitPassword,
          onGoToStep: goToStep
        })}
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPasswordDialog
