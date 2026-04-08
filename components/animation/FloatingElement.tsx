'use client'

import React from 'react'
import { motion } from 'framer-motion'

export interface FloatingElementProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.div>, 'children'> {
  children: React.ReactNode
  x?: number
  y?: number
  rotate?: number
  duration?: number
  delay?: number
}

export default function FloatingElement({
  children,
  x = 0,
  y = -10,
  rotate = 0,
  duration = 3,
  delay = 0,
  style,
  ...rest
}: FloatingElementProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  if (prefersReducedMotion) {
    return (
      <motion.div style={style} {...rest}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      animate={{
        x: x === 0 ? undefined : [0, x, 0],
        y: y === 0 ? undefined : [0, y, 0],
        rotate: rotate === 0 ? undefined : [0, rotate, 0]
      }}
      transition={{
        duration,
        delay,
        ease: 'easeInOut',
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'mirror'
      }}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

FloatingElement.displayName = 'FloatingElement'
