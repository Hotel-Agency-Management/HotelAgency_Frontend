'use client'

import { Toaster } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { useSettings } from '@/core/hooks/useSettings'

export default function AppToaster() {
  const theme = useTheme()
  const { settings } = useSettings()

  return (
    <Toaster
      position={settings.toastPosition}
      toastOptions={{
        duration: 3500,
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[8]
        },
        success: {
          iconTheme: {
            primary: theme.palette.success.main,
            secondary: theme.palette.background.paper
          }
        },
        error: {
          iconTheme: {
            primary: theme.palette.error.main,
            secondary: theme.palette.background.paper
          }
        }
      }}
    />
  )
}
