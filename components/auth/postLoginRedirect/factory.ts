import { USER_ROLES } from "@/lib/abilities"
import { createAgencyOwnerRedirectStrategy } from "./strategies/agencyOwnerStrategy"
import { createDefaultRedirectStrategy } from "./strategies/defaultStrategy"
import { FactoryParams, PostLoginRedirectStrategy } from "./types"

export const createPostLoginRedirectStrategy = ({
  role,
  agencyStatus,
  onIncompleteSignup,
  redirectToHome,
}: FactoryParams): PostLoginRedirectStrategy => {
  switch (role) {
    case USER_ROLES.AGENCY_OWNER:
      return createAgencyOwnerRedirectStrategy({
        agencyStatus,
        onIncompleteSignup,
        redirectToHome,
      })

    default:
      return createDefaultRedirectStrategy(redirectToHome)
  }
}
