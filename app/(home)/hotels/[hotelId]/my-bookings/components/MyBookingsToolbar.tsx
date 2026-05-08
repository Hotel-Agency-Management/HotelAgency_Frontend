'use client'

import { Chip, Stack, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material'
import { LayoutGrid, List } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { BookingsView } from '../types'

interface MyBookingsToolbarProps {
  count: number
  isLoading: boolean
  view: BookingsView
  onViewChange: (view: BookingsView) => void
}

export function MyBookingsToolbar({
  count,
  isLoading,
  view,
  onViewChange,
}: MyBookingsToolbarProps) {
  const { t } = useTranslation()

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Typography variant="h5" fontWeight={700}>
          {t('myBookings.title')}
        </Typography>
        {!isLoading && <Chip label={count} size="small" color="primary" />}
      </Stack>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, nextView) => {
          if (nextView !== null) onViewChange(nextView)
        }}
        size="small"
      >
        <ToggleButton value="cards">
          <Tooltip title={t('myBookings.cardView')} placement="top">
            <LayoutGrid size={16} />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="list">
          <Tooltip title={t('myBookings.listView')} placement="top">
            <List size={16} />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  )
}
