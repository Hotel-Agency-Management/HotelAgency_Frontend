import { useState } from 'react'
import { useVerifyEmailQuery } from '@/components/auth/hooks/queries/authQueries'
import { createVerifyEmailMessage } from '../factories/createVerifyEmailMessage'
import { createVerifyEmailStatus } from '../factories/createVerifyEmailStatus'
import { createVerifyEmailViewModel } from '../factories/createVerifyEmailViewModel'
import type { VerifyEmailViewProps } from '../types'
import { getErrorMessage } from '@/core/utils/apiError'
import { extractEmailFromMessage } from '../utils/extractEmail'

export const useVerifyEmailViewModel = ({ userId, token }: VerifyEmailViewProps) => {
  const [hasStartedVerification, setHasStartedVerification] = useState(false)

  const verifyEmailQuery = useVerifyEmailQuery(
    { userId: Number(userId), token: token ?? '' },
    { enabled: false }
  )
  const isVerifying = hasStartedVerification && verifyEmailQuery.isFetching

  const hasValidParams = Boolean(userId && token)
  const apiErrorMessage = verifyEmailQuery.error
    ? getErrorMessage(verifyEmailQuery.error)
    : null

  const email =
    verifyEmailQuery.data?.email ??
    extractEmailFromMessage(apiErrorMessage ?? undefined) ??
    null

  const status = createVerifyEmailStatus({
    hasValidParams,
    hasStartedVerification,
    isPending: isVerifying,
    isSuccess: verifyEmailQuery.isSuccess,
    dataAlreadyVerified: verifyEmailQuery.data?.alreadyVerified,
    error: verifyEmailQuery.error
  })

  const handleVerify = () => {
    if (!hasValidParams) return
    setHasStartedVerification(true)
    void verifyEmailQuery.refetch()
  }

  const message = createVerifyEmailMessage({
    hasValidParams,
    hasStartedVerification,
    isPending: isVerifying,
    isSuccess: verifyEmailQuery.isSuccess,
    successMessage: verifyEmailQuery.data?.message,
    successAlreadyVerified: verifyEmailQuery.data?.alreadyVerified,
    error: verifyEmailQuery.error
  })

  const viewModel = createVerifyEmailViewModel(status, {
    message,
    canSubmit: hasValidParams && !isVerifying,
    isSubmitting: isVerifying,
    onVerify: handleVerify
  })

  return { email, viewModel }
}
