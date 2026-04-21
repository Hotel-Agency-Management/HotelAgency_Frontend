import type { BreadcrumbMatchParams, BreadcrumbMatcher } from '../types'
import { splitPathname } from '../utils/pathname'

// Matches dynamic route segments like [id] or [hotelId]
const DYNAMIC_SEGMENT_REGEX = /^\[(.+)\]$/
export function createPathMatcher(pattern: string): BreadcrumbMatcher {
  return pathname => {
    const patternSegments = splitPathname(pattern)
    const pathnameSegments = splitPathname(pathname)

    if (patternSegments.length !== pathnameSegments.length) {
      return null
    }

    const params: BreadcrumbMatchParams = {}

    for (let index = 0; index < patternSegments.length; index += 1) {
      const patternSegment = patternSegments[index]
      const pathnameSegment = pathnameSegments[index]
      const dynamicMatch = patternSegment.match(DYNAMIC_SEGMENT_REGEX)

      if (dynamicMatch) {
        params[dynamicMatch[1]] = decodeURIComponent(pathnameSegment)
        continue
      }

      if (patternSegment !== pathnameSegment) {
        return null
      }
    }

    return params
  }
}
