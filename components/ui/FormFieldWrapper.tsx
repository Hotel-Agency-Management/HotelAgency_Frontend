'use client'
import { Box, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface FormFieldWrapperProps {
  title: string
  children: ReactNode
  required?: boolean
}

export default function FormFieldWrapper({ title, children, required }: FormFieldWrapperProps) {
  return (
    <Box>
      {title && (
        <Typography
          variant="body1"
          fontWeight={500}
          sx={{ mb: 0.5 }}
        >
          {title}
          {required && <span style={{ color: 'red' }}> *</span>}
        </Typography>
      )}
      {children}
    </Box>
  )
}
