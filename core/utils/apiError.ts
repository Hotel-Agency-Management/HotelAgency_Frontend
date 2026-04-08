import axios from 'axios'

interface ApiValidationError {
  message?: string
  detail?: string
  title?: string
  errors?: Record<string, string | string[]>
}

const getValidationMessage = (errors?: Record<string, string | string[]>) => {
  if (!errors) {
    return null
  }

  for (const value of Object.values(errors)) {
    if (Array.isArray(value) && value.length > 0) {
      return value[0]
    }

    if (typeof value === 'string' && value.trim().length > 0) {
      return value
    }
  }

  return null
}

export const getErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong'
): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data

    if (typeof data === 'string') {
      return data
    }

    if (data && typeof data === 'object') {
      const d = data as ApiValidationError
      const validationMessage = getValidationMessage(d.errors)

      return d.message || d.detail || validationMessage || d.title || fallback
    }

    return fallback
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}
