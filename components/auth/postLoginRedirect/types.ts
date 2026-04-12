export interface PostLoginRedirectStrategy {
  execute: () => void
}

export type RedirectDeps = {
  agencyStatus?: string | null
  onIncompleteSignup: () => void
  redirectToHome: () => void
}

export type FactoryParams = {
  role?: string
  agencyStatus?: string | null
  onIncompleteSignup: () => void
  redirectToHome: () => void
}
