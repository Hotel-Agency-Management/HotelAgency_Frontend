'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface RevealHeightProps {
  open: boolean
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  duration?: number
}

export default function RevealHeight({
  open,
  children,
  className,
  style,
  duration = 0.28
}: RevealHeightProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  if (prefersReducedMotion) {
    return open ? (
      <div className={className} style={style}>
        {children}
      </div>
    ) : null
  }

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key='content'
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration, ease: 'easeInOut' }}
          style={{ overflow: 'hidden', ...style }}
          className={className}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

RevealHeight.displayName = 'RevealHeight'
