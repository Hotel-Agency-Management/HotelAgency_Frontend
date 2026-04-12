import { getErrorMessage } from '@/core/utils/apiError'
import axios from 'axios'

export const isUnconfirmedEmailError = (error: unknown): boolean => {
  if (!axios.isAxiosError(error)) return false

  const message = getErrorMessage(error, '').toLowerCase()

  return (
    error.response?.status === 403 &&
    message.includes('not confirmed')
  )
}

export const isEmailAlreadyRegisteredError = (error: unknown): boolean => {
  const message = getErrorMessage(error, '').toLowerCase()

  return message.includes('email') && (
    message.includes('already registered') ||
    message.includes('already exists')
  )
}

export const isAgencyAlreadyExistsError = (error: unknown): boolean => {
  const message = getErrorMessage(error, '').toLowerCase()

  return message.includes('agency') && (
    message.includes('already exists') ||
    message.includes('already registered')
  )
}
