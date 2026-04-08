import { getErrorMessage } from "@/core/utils/apiError"

interface CreateVerifyEmailMessageParams {
  hasValidParams: boolean
  hasStartedVerification: boolean
  isPending: boolean
  isSuccess: boolean
  successMessage?: string
  successAlreadyVerified?: boolean
  error: unknown
}

type MessageResolver = (params: CreateVerifyEmailMessageParams) => string | null

const invalidLinkResolver: MessageResolver = ({ hasValidParams }) =>
  !hasValidParams ? 'This verification link is incomplete. Make sure it includes both userId and token.' : null

const pendingVerificationResolver: MessageResolver = ({ hasStartedVerification }) =>
  !hasStartedVerification ? 'Press the button below to confirm this email address.' : null

const loadingResolver: MessageResolver = ({ isPending }) =>
  isPending ? 'We are confirming your verification link now.' : null

const successResolver: MessageResolver = ({ isSuccess, successMessage, successAlreadyVerified }) => {
  if (!isSuccess) return null
  return successMessage ?? (successAlreadyVerified
    ? 'Your email is already verified. You can sign in now.'
    : 'Your email has been verified successfully.')
}

const errorResolver: MessageResolver = ({ error }) => getErrorMessage(error)

const resolvers: MessageResolver[] = [
  invalidLinkResolver,
  pendingVerificationResolver,
  loadingResolver,
  successResolver,
  errorResolver
]

export const createVerifyEmailMessage = (params: CreateVerifyEmailMessageParams): string =>
  resolvers.reduce<string | null>((result, resolver) => result ?? resolver(params), null) ?? ''
