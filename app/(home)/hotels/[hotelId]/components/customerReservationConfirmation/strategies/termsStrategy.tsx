import type { ConfirmationStepStrategy } from '../types'
import { TermsStep } from '../TermsStep'

export const createTermsStepStrategy = (): ConfirmationStepStrategy => ({
  validate: ({ termsAccepted }) =>
    termsAccepted ? null : 'Please accept the terms and conditions before continuing.',
  render: ({ modalState }) => (
    <TermsStep
      hasActiveTerms={Boolean(modalState.activeTerms)}
      termsAccepted={modalState.termsAccepted}
      termsContent={modalState.termsContent}
      termsLoading={modalState.termsLoading}
      termsTitle={modalState.termsTitle}
      onTermsAcceptedChange={modalState.setTermsAccepted}
    />
  ),
})
