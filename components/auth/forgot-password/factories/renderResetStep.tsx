import EmailStep from '../steps/EmailStep'
import OtpStep from '../steps/OtpStep'
import PasswordStep from '../steps/PasswordStep'
import type { ResetStepFactoryProps } from '../types'

export function renderResetStep({
  resetStep,
  email,
  isLoading,
  onChangeEmail,
  onSendCode,
  onClose,
  onVerifyOtp,
  onSubmitPassword,
  onGoToStep
}: ResetStepFactoryProps) {
  const stepMap = {
    email: (
      <EmailStep
        email={email}
        isLoading={isLoading}
        onChange={onChangeEmail}
        onSend={() => onSendCode(email)}
        onClose={onClose}
      />
    ),
    code: (
      <OtpStep
        email={email}
        isLoading={isLoading}
        onVerify={onVerifyOtp}
        onBack={() => onGoToStep('email')}
      />
    ),
    password: (
      <PasswordStep
        isLoading={isLoading}
        onSubmit={onSubmitPassword}
        onBack={() => onGoToStep('email')}
      />
    )
  }

  return stepMap[resetStep] ?? null
}
