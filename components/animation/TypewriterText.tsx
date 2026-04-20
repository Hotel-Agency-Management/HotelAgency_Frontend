'use client'

import { useEffect, useState } from 'react'
import Typography, { type TypographyProps } from '@mui/material/Typography'

interface TypewriterTextProps extends Omit<TypographyProps, 'children'> {
  text: string
  speed?: number
  startDelay?: number
  cursor?: string
}

export default function TypewriterText({
  text,
  speed = 45,
  startDelay = 250,
  cursor = '|',
  style,
  ...typographyProps
}: TypewriterTextProps) {
  const [visibleText, setVisibleText] = useState('')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleText(text)
      return
    }

    setVisibleText('')
  }, [prefersReducedMotion, text])

  useEffect(() => {
    if (prefersReducedMotion || visibleText.length >= text.length) return

    const timeout = window.setTimeout(
      () => setVisibleText(text.slice(0, visibleText.length + 1)),
      visibleText.length === 0 ? startDelay : speed
    )

    return () => window.clearTimeout(timeout)
  }, [prefersReducedMotion, speed, startDelay, text, visibleText])

  const isTyping = visibleText.length < text.length

  return (
    <Typography
      {...typographyProps}
      aria-label={text}
      style={{ position: 'relative', display: 'block', ...style }}
    >
      <span aria-hidden style={{ visibility: 'hidden' }}>
        {text}
      </span>
      <span aria-hidden style={{ position: 'absolute', inset: 0 }}>
        {visibleText}
        {isTyping ? cursor : null}
      </span>
    </Typography>
  )
}
