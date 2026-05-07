'use client'

import { Card, CardContent, Typography, Stack, Chip, Divider } from '@mui/material'
import Avatar from '@/components/ui/Avatar'
import Icon from '@/components/icon/Icon'
import { TODAY_ARRIVALS } from '../data/frontDeskMock'

export function TodayArrivalsWidget() {
  return (
    <Card variant="outlined" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Today&apos;s Arrivals
          </Typography>

          <Typography variant="caption" color="text.disabled">
            {TODAY_ARRIVALS.length} arrivals
          </Typography>
        </Stack>

        <Stack divider={<Divider />} spacing={1.5}>
          {TODAY_ARRIVALS.map((guest) => (
            <Stack
              key={guest.id}
              direction="row"
              alignItems="flex-start"
              spacing={1.5}
            >
              <Avatar
                variant="soft"
                color="primary"
                sx={{ width: 34, height: 34, flexShrink: 0 }}
              >
                <Icon icon="tabler:user-plus" fontSize={17} />
              </Avatar>

              <Stack flex={1} minWidth={0}>
                <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                  <Typography variant="body2" fontWeight={600}>
                    {guest.guestName}
                  </Typography>

                  {guest.note?.toLowerCase().includes('vip') && (
                    <Chip label="VIP" color="warning" size="small" variant="outlined" />
                  )}

                  {guest.note?.toLowerCase().includes('delayed') && (
                    <Chip label="Delayed" color="error" size="small" variant="outlined" />
                  )}
                </Stack>

                <Typography variant="caption" color="text.disabled">
                  Room {guest.roomNumber}
                </Typography>

                {guest.note && (
                  <Typography variant="caption" color="text.secondary" fontStyle="italic">
                    {guest.note}
                  </Typography>
                )}
              </Stack>

              <Typography variant="caption" fontWeight={700}>
                {guest.time}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}
