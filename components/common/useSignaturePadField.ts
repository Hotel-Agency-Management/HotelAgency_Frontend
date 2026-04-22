'use client'

import { useEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

interface UseSignaturePadFieldOptions {
  value: string
  onChange: (value: string) => void
}

export function useSignaturePadField({ value, onChange }: UseSignaturePadFieldOptions) {
  const signatureRef = useRef<SignatureCanvas | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const skipNextValueSyncRef = useRef(false)
  const [canvasWidth, setCanvasWidth] = useState(0)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const updateWidth = () => {
      setCanvasWidth(Math.max(Math.floor(container.clientWidth), 1))
    }

    updateWidth()

    const resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const signaturePad = signatureRef.current

    if (!signaturePad || canvasWidth === 0) {
      return
    }

    if (skipNextValueSyncRef.current) {
      skipNextValueSyncRef.current = false
      return
    }

    if (!value) {
      signaturePad.clear()
      return
    }

    signaturePad.clear()
    signaturePad.fromDataURL(value)
  }, [canvasWidth, value])

  const handleClear = () => {
    signatureRef.current?.clear()
    skipNextValueSyncRef.current = true
    onChange('')
  }

  const handleEnd = () => {
    const signaturePad = signatureRef.current

    if (!signaturePad || signaturePad.isEmpty()) {
      skipNextValueSyncRef.current = true
      onChange('')
      return
    }

    skipNextValueSyncRef.current = true
    onChange(signaturePad.getTrimmedCanvas().toDataURL('image/png'))
  }

  return {
    canvasWidth,
    containerRef,
    handleClear,
    handleEnd,
    signatureRef,
  }
}
