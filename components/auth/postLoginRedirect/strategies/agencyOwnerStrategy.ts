import { AGENCY_STATUS } from '../../types/authType'
import type { PostLoginRedirectStrategy, RedirectDeps } from '../types'

export const createAgencyOwnerRedirectStrategy = ({
  agencyStatus,
  onIncompleteSignup,
  redirectToHome,
}: RedirectDeps): PostLoginRedirectStrategy => ({
  execute: () => {
    if (agencyStatus === AGENCY_STATUS.INCOMPLETE) {
      onIncompleteSignup()
      return
    }

    redirectToHome()
  },
})
