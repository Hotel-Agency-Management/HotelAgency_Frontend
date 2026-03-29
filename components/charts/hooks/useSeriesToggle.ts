'use client'

import { useState, useCallback } from 'react'

export interface UseSeriesToggleResult {
  /** Set of labels that are currently hidden */
  hiddenLabels: Set<string>
  /** Toggle visibility of a single label */
  toggle: (label: string) => void
  /** Returns true when the given label is hidden */
  isHidden: (label: string) => boolean
  /** Restore all labels to visible */
  reset: () => void
}

/**
 * Manages which chart series / slices are hidden by the user.
 *
 * Single responsibility: owns the hidden-label Set and exposes stable
 * toggle / query callbacks. Has no knowledge of chart rendering or MUI.
 *
 * @example
 * const { hiddenLabels, toggle, isHidden } = useSeriesToggle()
 * const visible = series.filter(s => !isHidden(s.label))
 */
export function useSeriesToggle(): UseSeriesToggleResult {
  const [hiddenLabels, setHiddenLabels] = useState<Set<string>>(new Set())

  const toggle = useCallback((label: string) => {
    setHiddenLabels(prev => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }, [])

  const isHidden = useCallback(
    (label: string) => hiddenLabels.has(label),
    [hiddenLabels]
  )

  const reset = useCallback(() => setHiddenLabels(new Set()), [])

  return { hiddenLabels, toggle, isHidden, reset }
}
