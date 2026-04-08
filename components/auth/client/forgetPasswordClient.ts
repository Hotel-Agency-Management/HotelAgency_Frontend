import apiClient from '@/core/clients/apiClient'
import {
  ForgetPassResponse,
  ResetPassRequest,
  VerifyCodeRequest
} from '../config/passwordConfig'

export async function forgetPassword(email: string): Promise<ForgetPassResponse> {
  const response = await apiClient.post<ForgetPassResponse>(
    '/auth/forgot-password',
    { email }
  )
  return response.data
}

export async function validateResetCode(
  payload: VerifyCodeRequest
): Promise<ForgetPassResponse> {
  const response = await apiClient.post<ForgetPassResponse>(
    '/auth/validate-reset-code',
    payload
  )
  return response.data
}

export async function submitResetPassword(
  payload: ResetPassRequest
): Promise<ForgetPassResponse> {
  const response = await apiClient.post<ForgetPassResponse>(
    '/auth/reset-password',
    payload
  )
  return response.data
}
