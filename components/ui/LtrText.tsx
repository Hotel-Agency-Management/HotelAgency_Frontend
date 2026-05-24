'use client'

import { ElementType, ReactNode } from 'react'
import { Typography } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'

interface LtrTextProps {
  children: ReactNode
  /**
   * The root element type. Defaults to 'span' so it can be nested
   * safely inside Typography or table cells.
   */
  component?: ElementType
  sx?: SxProps<Theme>
}

/**
 * Renders children with forced LTR text direction and unicode-bidi isolation.
 *
 * Use this for content that is inherently left-to-right regardless of the
 * active document direction: phone numbers, email addresses, reference codes,
 * numeric IDs, URLs, etc.
 *
 * The isolation prevents surrounding RTL text from bleeding into the value.
 *
 * @example
 * <LtrText>{user.phoneNumber}</LtrText>
 * <InfoRow label={t('phone')} value={<LtrText>{reservation.guestPhone}</LtrText>} />
 */
const LtrText = ({ children, component = 'span', sx }: LtrTextProps) => {
  return (
    <Typography
      component={component}
      dir="ltr"
      sx={{ unicodeBidi: 'isolate', display: 'inline', ...sx }}
    >
      {children}
    </Typography>
  )
}

export default LtrText
