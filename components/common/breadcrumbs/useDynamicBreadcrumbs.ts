'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import type { BreadcrumbFactory, BreadcrumbItem } from './types'

export function useDynamicBreadcrumbs<Context>(
  factory: BreadcrumbFactory<Context>,
  context: Context
): BreadcrumbItem[] {
  const pathname = usePathname()

  return useMemo(
    () => factory.resolve({ pathname, context }),
    [context, factory, pathname]
  )
}
