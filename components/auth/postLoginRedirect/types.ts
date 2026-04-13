import type { AgencyStatus } from '../types/authType'

export interface PostLoginRedirectStrategy {
  execute: () => void
}

export type RedirectDeps = {
  agencyStatus?: AgencyStatus | null
  onIncompleteSignup: () => void
  redirectToHome: () => void
}

export type FactoryParams = {
  role?: string
  agencyStatus?: AgencyStatus | null
  onIncompleteSignup: () => void
  redirectToHome: () => void
}
