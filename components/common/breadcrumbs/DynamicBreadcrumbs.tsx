'use client'

import Link from 'next/link'
import { Breadcrumbs, Link as MuiLink, Skeleton, Typography } from '@mui/material'
import { useDynamicBreadcrumbs } from './useDynamicBreadcrumbs'
import type { BreadcrumbFactory } from './types'

interface DynamicBreadcrumbsProps<Context> {
  factory: BreadcrumbFactory<Context>
  context: Context
  isLoading?: boolean
  skeletonWidth?: number
}

export function DynamicBreadcrumbs<Context>({
  factory,
  context,
  isLoading = false,
  skeletonWidth = 280,
}: DynamicBreadcrumbsProps<Context>) {
  const items = useDynamicBreadcrumbs(factory, context)

  if (isLoading) {
    return <Skeleton variant="text" width={skeletonWidth} height={28} />
  }

  if (items.length === 0) {
    return null
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        if (isLast || !item.href) {
          return (
            <Typography key={`${item.label}-${index}`} variant="body2">
              {item.label}
            </Typography>
          )
        }

        return (
          <MuiLink
            key={`${item.label}-${index}`}
            component={Link}
            href={item.href}
            variant="body2"
          >
            {item.label}
          </MuiLink>
        )
      })}
    </Breadcrumbs>
  )
}
