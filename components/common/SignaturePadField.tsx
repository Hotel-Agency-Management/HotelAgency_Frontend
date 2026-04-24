'use client'

import type { ReactNode } from 'react'
import { alpha, useTheme } from '@mui/material/styles'
import { Box, Button, FormHelperText, Stack, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import SignatureCanvas from 'react-signature-canvas'
import { useSignaturePadField } from './useSignaturePadField'
import { DEFAULT_SIGNATURE_HEIGHT } from './constants/signature'
import { SignaturePaper } from './styles/SignaturePaper'

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
        <Box>
          <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {description ? <Typography variant='body2'>{description}</Typography> : null}
        </Box>

        <Button
          variant='text'
          size='small'
          disabled={!value}
          onClick={handleClear}
          sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
        >
          {clearLabel}
        </Button>
      </Stack>

      <SignaturePaper
          ref={containerRef}
          elevation={0}
          bgColor={resolvedBackgroundColor}
          sx={Array.isArray(paperSx) ? paperSx : paperSx ? [paperSx] : []}
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
      </SignaturePaper>

      {error ? <FormHelperText error>{error}</FormHelperText> : null}
    </Stack>
  )
}
