import EmailStep from "../components/forgotPassword/steps/EmailStep"
import OtpStep from "../components/forgotPassword/steps/OtpStep"
import PasswordStep from "../components/forgotPassword/steps/PasswordStep"
import { ResetStepFactoryProps } from "../components/forgotPassword/types"

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
