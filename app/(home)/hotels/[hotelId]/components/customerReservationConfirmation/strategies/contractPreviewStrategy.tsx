import type { ConfirmationStepStrategy } from '../types'
import { ContractPreviewStep } from '../ContractPreviewStep'

export const createContractPreviewStepStrategy = (): ConfirmationStepStrategy => ({
  validate: ({ contractPreviewAccepted }) =>
    contractPreviewAccepted ? null : 'Please review the contract preview before continuing.',
  render: ({ modalState }) => (
    <ContractPreviewStep
      contract={modalState.contractPreview}
      previewAccepted={modalState.contractPreviewAccepted}
      stepError={modalState.stepError}
      onPreviewAcceptedChange={modalState.setContractPreviewAccepted}
    />
  ),
})
