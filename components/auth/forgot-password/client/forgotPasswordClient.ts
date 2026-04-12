import apiClient from '@/core/clients/apiClient'
import type {
  ForgotPasswordResponse,
  ResetPasswordRequest,
  VerifyResetCodeRequest
} from '../types'

export async function requestPasswordReset(
  email: string
): Promise<ForgotPasswordResponse> {
  const response = await apiClient.post<ForgotPasswordResponse>(
    '/auth/forgot-password',
    { email }
  )
  return response.data
}

export async function validateResetCode(
  payload: VerifyResetCodeRequest
): Promise<ForgotPasswordResponse> {
  const response = await apiClient.post<ForgotPasswordResponse>(
    '/auth/validate-reset-code',
    payload
  )
  return response.data
}

export async function submitResetPassword(
  payload: ResetPasswordRequest
): Promise<ForgotPasswordResponse> {
  const response = await apiClient.post<ForgotPasswordResponse>(
    '/auth/reset-password',
    payload
  )
  return response.data
}
