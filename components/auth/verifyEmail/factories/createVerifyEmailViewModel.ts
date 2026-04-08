import type { VerifyEmailStatus, VerifyEmailStrategyContext } from '../types'
import { verifyEmailStrategies } from '../strategies/verifyEmailStrategies'

export const createVerifyEmailViewModel = (
  status: VerifyEmailStatus,
  context: VerifyEmailStrategyContext
) => verifyEmailStrategies[status](context)

