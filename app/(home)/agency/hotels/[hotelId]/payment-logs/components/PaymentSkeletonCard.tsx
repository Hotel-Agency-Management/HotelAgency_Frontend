'use client'

import { Card, Skeleton, Stack } from '@mui/material'

export function PaymentSkeletonCard() {
  return (
    <Card variant="outlined">
      {/* Mobile skeleton (xs → sm) */}
      <Stack gap={1.5} sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
          <Stack gap={0.5} flex={1}>
            <Skeleton variant="text" width={80} />
            <Skeleton variant="text" width={120} />
          </Stack>
          <Skeleton variant="text" width={70} sx={{ flexShrink: 0 }} />
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} sx={{ pl: 7 }}>
          <Skeleton variant="text" sx={{ flex: 1 }} />
          <Skeleton variant="text" width={80} sx={{ flexShrink: 0 }} />
        </Stack>
      </Stack>

      {/* Desktop skeleton (md+) */}
      <Stack direction="row" alignItems="center" gap={2.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Skeleton variant="circular" width={44} height={44} sx={{ flexShrink: 0 }} />
        <Stack gap={0.5} width={140} flexShrink={0}>
          <Skeleton variant="text" width={60} />
          <Skeleton variant="text" width={100} />
        </Stack>
        <Stack gap={0.5} flex={1}>
          <Skeleton variant="text" width={40} />
          <Skeleton variant="text" width={130} />
        </Stack>
        <Stack gap={0.5} width={100} flexShrink={0}>
          <Skeleton variant="text" width={60} />
          <Skeleton variant="text" width={80} />
        </Stack>
        <Stack gap={0.5} alignItems="flex-end" width={100} flexShrink={0}>
          <Skeleton variant="text" width={40} />
          <Skeleton variant="text" width={70} />
        </Stack>
        <Skeleton variant="rounded" width={80} height={24} sx={{ flexShrink: 0 }} />
        <Skeleton variant="text" width={52} sx={{ flexShrink: 0 }} />
      </Stack>
    </Card>
  )
}
