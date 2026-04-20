import { createPathMatcher } from '../matchers/createPathMatcher'
import type { BreadcrumbStrategy } from '../types'

export function resolveMatch<Context>(
  strategy: BreadcrumbStrategy<Context>,
  pathname: string
) {
  const matcher = typeof strategy.match === 'string'
    ? createPathMatcher(strategy.match)
    : strategy.match

  return matcher(pathname)
}
