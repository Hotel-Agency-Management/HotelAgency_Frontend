'use client'

import Link from 'next/link'
import { Button, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import type { VerifyEmailAction } from '../types'

interface VerifyEmailActionsProps {
  actions: VerifyEmailAction[]
}

export default function VerifyEmailActions({ actions }: VerifyEmailActionsProps) {
  if (!actions.length) {
    return null
  }

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      {actions.map(action => {
        const icon = action.icon ? <action.icon size={18} /> : undefined

        if (action.onClick) {
          return (
            <LoadingButton
              key={action.key}
              onClick={action.onClick}
              loading={action.loading}
              disabled={action.disabled}
              variant={action.variant}
              startIcon={icon}
            >
              {action.label}
            </LoadingButton>
          )
        }

        return (
          <Button
            key={action.key}
            component={Link}
            href={action.href ?? '#'}
            variant={action.variant}
          >
            {action.label}
          </Button>
        )
      })}
    </Stack>
  )
}

