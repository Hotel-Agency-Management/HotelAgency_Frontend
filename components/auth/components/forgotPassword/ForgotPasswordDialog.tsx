'use client'

import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ForgotPasswordDialogProps, PasswordFormData } from './types'
import EmailStep from './steps/EmailStep'
import OtpStep from './steps/OtpStep'
import PasswordStep from './steps/PasswordStep'
import { usePasswordReset } from '../../hooks/useResetPass'

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({
  open,
  initialEmail = '',
  onClose
}) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const stepTitles: Record<string, string> = {
    email: t('forgotPassword.steps.email'),
    code: t('forgotPassword.steps.code'),
    password: t('forgotPassword.steps.password')
  }

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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 400,
          maxWidth: '90%',
        }
      }}
    >
      <DialogTitle>
        {stepTitles[resetStep]}
      </DialogTitle>

      <DialogContent>
        {resetStep === 'email' && (
          <EmailStep
            email={email}
            isLoading={isLoading}
            onChange={setEmail}
            onSend={() => sendCode(email)}
            onClose={handleClose}
          />
        )}

        {resetStep === 'code' && (
          <OtpStep
            email={email}
            isLoading={isLoading}
            onVerify={handleVerifyOtp}
            onBack={() => goToStep('email')}
          />
        )}

        {resetStep === 'password' && (
          <PasswordStep
            isLoading={isLoading}
            onSubmit={handleSubmitPassword}
            onBack={() => goToStep('email')}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPasswordDialog
