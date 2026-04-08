import { useRef, useState } from 'react'
import { OTP_LENGTH } from '../types'

export const useOtp = () => {
  const [otp, setOtp] = useState('')
  const otpRefs = useRef<Array<HTMLInputElement | null>>([])

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return

    const otpArray = Array.from({ length: OTP_LENGTH }, (_, i) => otp[i] || '')
    otpArray[index] = value
    const nextOtp = otpArray.join('')
    setOtp(nextOtp)

    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH)

    if (!pasted) return

    setOtp(pasted)

    const nextIndex = Math.min(pasted.length, OTP_LENGTH) - 1
    if (nextIndex >= 0) {
      otpRefs.current[nextIndex]?.focus()
    }
  }

  const reset = () => {
    setOtp('')
    otpRefs.current = []
  }

  return { otp, otpRefs, handleChange, handleKeyDown, handlePaste, reset }
}
