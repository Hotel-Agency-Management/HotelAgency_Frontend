import axios from 'axios'

interface AuthErrorResponse {
  message?: string
}

export const getAuthErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError(error)) {
    const message = (error.response?.data as AuthErrorResponse | undefined)?.message
    if (message) {
      return message
    }
  }

  return fallbackMessage
}
