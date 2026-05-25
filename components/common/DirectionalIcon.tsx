'use client'

import Icon from '@/components/icon/Icon'
import useLanguage from '@/core/hooks/useLanguage'
import { ComponentProps } from 'react'

// Icons whose horizontal direction conveys meaning and must be mirrored in RTL.
// Vertical arrows (arrow-up, arrow-down) and diagonal variants are intentionally excluded.
const HORIZONTAL_DIRECTIONAL_PATTERN = /arrow-left|arrow-right|chevron-left|chevron-right/

type IconProps = ComponentProps<typeof Icon>

interface DirectionalIconProps extends IconProps {
  /**
   * When true, the icon is flipped horizontally in RTL mode.
   * Defaults to auto-detection based on the icon name — any icon whose
   * name contains arrow-left, arrow-right, chevron-left, or chevron-right
   * is considered directional and will be auto-flipped.
   */
  flipOnRtl?: boolean
}

/**
 * Drop-in replacement for <Icon> that automatically mirrors horizontally-
 * directional icons (arrows, chevrons) when the active language is Arabic (RTL).
 *
 * Non-directional icons (arrow-up, arrow-down, arrow-up-circle, etc.) are
 * never flipped unless you explicitly pass flipOnRtl={true}.
 */
const DirectionalIcon = ({ flipOnRtl, icon, style, ...rest }: DirectionalIconProps) => {
  const { language } = useLanguage()
  const isRtl = language === 'ar'

  const shouldFlip =
    flipOnRtl !== undefined
      ? flipOnRtl
      : HORIZONTAL_DIRECTIONAL_PATTERN.test(String(icon))

  const transform = isRtl && shouldFlip ? 'scaleX(-1)' : undefined

  return (
    <Icon
      icon={icon}
      style={transform ? { transform, display: 'inline-block', ...style } : style}
      {...rest}
    />
  )
}

export default DirectionalIcon
