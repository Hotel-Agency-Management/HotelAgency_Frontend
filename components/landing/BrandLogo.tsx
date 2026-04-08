'use client'

import { Box, Typography } from '@mui/material'
import { useSettings } from '@/core/hooks/useSettings'

type Props = { size?: 'sm' | 'md' | 'lg' }

const fontSizes = { sm: '1.1rem', md: '1.4rem', lg: '1.7rem' }
const logoHeights = { sm: 28, md: 34, lg: 42 }

export default function BrandLogo({ size = 'md' }: Props) {
  const { settings } = useSettings()
  const customLogo = settings.branding.logo

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      {customLogo ? (
        <Box
          component='img'
          src={customLogo}
          alt='Brand logo'
          sx={{
            display: 'block',
            width: logoHeights[size],
            height: logoHeights[size],
            objectFit: 'contain',
            borderRadius: 1.5,
            flexShrink: 0
          }}
        />
      ) : null}
      <Typography
        component='span'
        sx={{ fontWeight: 800, fontSize: fontSizes[size], color: 'text.primary', lineHeight: 1 }}
      >
        <Box component='span' sx={{ color: 'primary.main' }}>.</Box>HotelAgency
      </Typography>
    </Box>
  )
}
