'use client'

import { Card, Skeleton, Stack } from '@mui/material'

export function SystemLogSkeletonCard() {
  return (
    <Card variant='outlined'>
      {/* Mobile skeleton (xs → sm) */}
      <Stack gap={1.5} sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Stack direction='row' alignItems='center' gap={1.5}>
          <Skeleton variant='circular' width={40} height={40} sx={{ flexShrink: 0 }} />
          <Stack gap={0.5} flex={1}>
            <Skeleton variant='text' width={120} />
            <Skeleton variant='text' width={80} />
          </Stack>
          <Skeleton variant='rounded' width={90} height={24} sx={{ flexShrink: 0 }} />
        </Stack>
        <Skeleton variant='text' sx={{ pl: 7 }} />
      </Stack>

      {/* Desktop skeleton (md+) */}
      <Stack direction='row' alignItems='center' gap={2.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Skeleton variant='circular' width={44} height={44} sx={{ flexShrink: 0 }} />
        <Stack gap={0.5} width={160} flexShrink={0}>
          <Skeleton variant='text' width={60} />
          <Skeleton variant='text' width={120} />
        </Stack>
        <Stack gap={0.5} width={200} flexShrink={0}>
          <Skeleton variant='text' width={60} />
          <Skeleton variant='text' width={150} />
        </Stack>
        <Stack gap={0.5} flex={1}>
          <Skeleton variant='text' width={80} />
          <Skeleton variant='text' width={250} />
        </Stack>
        <Stack gap={0.5} width={130} flexShrink={0}>
          <Skeleton variant='text' width={60} />
          <Skeleton variant='text' width={100} />
        </Stack>
        <Stack gap={0.5} alignItems='flex-end' width={150} flexShrink={0}>
          <Skeleton variant='text' width={40} />
          <Skeleton variant='text' width={100} />
        </Stack>
      </Stack>
    </Card>
  )
}
