'use client'

import { Card, CardContent, Typography, Stack, Chip, Divider } from '@mui/material'
import Avatar from '@/components/ui/Avatar'
import Icon from '@/components/icon/Icon'
import { ALERT_ITEMS } from '../data/frontDeskMock'
import { ALERT_SEVERITY_LABELS } from '../constants/frontDeskConstants'
import type { PaletteColorKey } from '../types/frontDeskTypes'

export function AlertsWidget() {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Operational Alerts
          </Typography>
          <Typography variant="caption">
            {ALERT_ITEMS.length} active
          </Typography>
        </Stack>

        <Stack divider={<Divider />} gap={2}>
          {ALERT_ITEMS.map((alert) => (
            <Stack
              key={alert.id}
              direction="row"
              alignItems="flex-start"
              spacing={1.5}
            >
              <Avatar
                variant="soft"
                color={alert.severity as PaletteColorKey}
                sx={{ width: 34, height: 34, flexShrink: 0}}
              >
                <Icon icon={alert.icon} fontSize={17} />
              </Avatar>

              <Stack flex={1} minWidth={0}>
                <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                  <Typography variant="body2" fontWeight={600}>
                    {alert.title}
                  </Typography>
                  <Chip
                    label={ALERT_SEVERITY_LABELS[alert.severity]}
                    color={alert.severity}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
                <Typography variant="caption" >
                  {alert.description}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}
