'use client'

import type { ReactNode } from 'react'
import { alpha, styled, useTheme } from '@mui/material/styles'
import { Button, FormHelperText, Paper, Stack, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import SignatureCanvas from 'react-signature-canvas'
import { useSignaturePadField } from './useSignaturePadField'

const DEFAULT_SIGNATURE_HEIGHT = 190

const ClearSignatureButton = styled(Button)(({ theme }) => ({
  alignSelf: 'flex-start',
  [theme.breakpoints.up('sm')]: {
    alignSelf: 'center',
  },
}))

interface SignaturePadFieldProps {
  value: string
  onChange: (value: string) => void
  error?: string
  title?: ReactNode
  description?: ReactNode
  clearLabel?: ReactNode
  height?: number
  penColor?: string
  backgroundColor?: string
  paperSx?: SxProps<Theme>
}

export function SignaturePadField({
  value,
  onChange,
  error,
  title = 'Signature',
  description,
  clearLabel = 'Clear',
  height = DEFAULT_SIGNATURE_HEIGHT,
  penColor,
  backgroundColor,
  paperSx,
}: SignaturePadFieldProps) {
  const theme = useTheme()
  const { canvasWidth, containerRef, handleClear, handleEnd, signatureRef } = useSignaturePadField({
    value,
    onChange,
  })

  const resolvedBackgroundColor = backgroundColor ?? alpha(theme.palette.common.white, 0.96)
  const resolvedPenColor = penColor ?? theme.palette.common.black

  return (
    <Stack spacing={1.25}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems={{ sm: 'center' }}
        justifyContent='space-between'
      >
        <Stack>
          <Typography variant='subtitle2' fontWeight={700}>
            {title}
          </Typography>
          {description ? <Typography variant='body2'>{description}</Typography> : null}
        </Stack>

        <ClearSignatureButton variant='text' size='small' disabled={!value} onClick={handleClear}>
          {clearLabel}
        </ClearSignatureButton>
      </Stack>

      <Paper
        ref={containerRef}
        elevation={0}
        sx={[
          {
            bgcolor: resolvedBackgroundColor,
            position: 'relative',
            overflow: 'hidden',
          },
          ...(Array.isArray(paperSx) ? paperSx : paperSx ? [paperSx] : []),
        ]}
      >
        {canvasWidth > 0 ? (
          <SignatureCanvas
            ref={signatureRef}
            penColor={resolvedPenColor}
            minWidth={1.2}
            maxWidth={2.2}
            onEnd={handleEnd}
            canvasProps={{
              width: canvasWidth,
              height,
              style: {
                display: 'block',
                width: '100%',
                height: `${height}px`,
                cursor: 'crosshair',
              },
            }}
          />
        ) : null}
      </Paper>

      {error ? <FormHelperText error>{error}</FormHelperText> : null}
    </Stack>
  )
}
