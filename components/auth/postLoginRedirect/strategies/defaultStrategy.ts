import type { PostLoginRedirectStrategy } from '../types'

export const createDefaultRedirectStrategy = (
  redirectToHome: () => void
): PostLoginRedirectStrategy => ({
  execute: () => {
    redirectToHome()
  },
})
