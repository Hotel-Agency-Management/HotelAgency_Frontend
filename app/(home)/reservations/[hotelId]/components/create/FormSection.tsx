import type { ReactNode } from 'react'
import { Divider, Paper, Stack, Typography } from '@mui/material'

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <Paper
      variant='card'>
      <Stack spacing={2.5}>
        <Stack spacing={0.75}>
          <Typography variant='h6' sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {description ? (
            <Typography variant='body2' color='text.secondary'>
              {description}
            </Typography>
          ) : null}
        </Stack>
        <Divider />
        {children}
      </Stack>
    </Paper>
  )
}
