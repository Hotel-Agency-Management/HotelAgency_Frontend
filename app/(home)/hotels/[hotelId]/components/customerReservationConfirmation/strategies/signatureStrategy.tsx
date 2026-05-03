import type { ConfirmationStepStrategy } from '../types'
import { SignatureStep } from '../SignatureStep'

export const createSignatureStepStrategy = (): ConfirmationStepStrategy => ({
  validate: ({ signatureDataUrl }) =>
    signatureDataUrl ? null : 'Please add your signature before continuing.',
  render: ({ modalState }) => (
    <SignatureStep
      signatureDataUrl={modalState.signatureDataUrl}
      stepError={modalState.stepError}
      onSignatureChange={modalState.setSignatureDataUrl}
    />
  ),
})
