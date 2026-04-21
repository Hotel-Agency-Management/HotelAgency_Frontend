import { normalizePathname } from './utils/pathname'
import { resolveMatch } from './utils/resolveMatch'
import type { BreadcrumbFactory, BreadcrumbStrategy } from './types'

export function createBreadcrumbFactory<Context>(
  strategies: BreadcrumbStrategy<Context>[]
): BreadcrumbFactory<Context> {
  return {
    resolve: ({ pathname, context }) => {
      const normalizedPathname = normalizePathname(pathname)

      for (const strategy of strategies) {
        const params = resolveMatch(strategy, normalizedPathname)

        if (params) {
          return strategy.build({
            pathname: normalizedPathname,
            params,
            context,
          })
        }
      }

      return []
    },
  }
}

export { createPathMatcher } from './matchers/createPathMatcher'
