'use client'

import React, { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export interface CountUpOnViewProps {
  to: number
  from?: number
  duration?: number
  once?: boolean
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  style?: React.CSSProperties
  formatter?: (value: number) => string
}

export default function CountUpOnView({
  to,
  from = 0,
  duration = 2,
  once = true,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  style,
  formatter
}: CountUpOnViewProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const formatValue = (value: number) => {
    if (formatter) return formatter(value)
    return `${prefix}${value.toFixed(decimals)}${suffix}`
  }

  const [displayValue, setDisplayValue] = useState(() =>
    prefersReducedMotion ? formatValue(to) : formatValue(from)
  )

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setDisplayValue(formatValue(to))
      return
    }

    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate: latest => {
        const rounded =
          decimals > 0 ? Number(latest.toFixed(decimals)) : Math.round(latest)
        setDisplayValue(formatValue(rounded))
      }
    })

    return () => controls.stop()
  }, [decimals, duration, from, isInView, prefersReducedMotion, to])

  return (
    <span ref={ref} className={className} style={style}>
      {displayValue}
    </span>
  )
}

CountUpOnView.displayName = 'CountUpOnView'
