import axios from 'axios'
import { getErrorMessage } from '@/core/utils/apiError'
import type { VerifyEmailStateContext, VerifyEmailStatus } from '../types'

type StatusResolver = (ctx: VerifyEmailStateContext) => VerifyEmailStatus | null

const invalidResolver: StatusResolver = ({ hasValidParams }) =>
  !hasValidParams ? 'invalid' : null

const idleResolver: StatusResolver = ({ hasStartedVerification }) =>
  !hasStartedVerification ? 'idle' : null

const loadingResolver: StatusResolver = ({ isPending }) =>
  isPending ? 'loading' : null

const successResolver: StatusResolver = ({ isSuccess, dataAlreadyVerified }) =>
  isSuccess ? (dataAlreadyVerified ? 'already-verified' : 'success') : null

const errorResolver: StatusResolver = ({ error }) => {
  if (!axios.isAxiosError(error)) {
    return 'error'
  }

  const message = getErrorMessage(error, '').toLowerCase()

  return error.response?.status === 409 || message.includes('already verified')
    ? 'already-verified'
    : 'error'
}

const resolvers: StatusResolver[] = [
  invalidResolver,
  idleResolver,
  loadingResolver,
  successResolver,
  errorResolver
]

export const createVerifyEmailStatus = (ctx: VerifyEmailStateContext): VerifyEmailStatus =>
  resolvers.reduce<VerifyEmailStatus | null>((result, resolver) => result ?? resolver(ctx), null) ?? 'error'
