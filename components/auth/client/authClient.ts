import apiClient from '@/core/clients/apiClient'
import { AuthResponse, LoginCredentials } from '@/core/configs/authConfig'
import { authConfig } from '@/core/configs/clientConfig'
import { CustomerSignupRequest, SignupResponse, AgencyOwnerSignupRequest, VerifyEmailParams, VerifyEmailResponse, ResendVerificationEmailRequest, ResendVerificationEmailResponse, RefreshTokenRequest, RefreshTokenResponse } from '../configs/authConfig'

export const loginRequest = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    `${authConfig.loginEndpoint}`,
    credentials,
    { timeout: authConfig.requestTimeout }
  )
  return response.data
}

const registerRequest = async (
  payload: CustomerSignupRequest | AgencyOwnerSignupRequest
): Promise<SignupResponse> => {
  const response = await apiClient.post<SignupResponse>(
    `${authConfig.signupEndpoint}`,
    payload,
    { timeout: authConfig.requestTimeout }
  )

  return response.data
}

export const registerCustomerRequest = (payload: CustomerSignupRequest): Promise<SignupResponse> =>
  registerRequest(payload)

export const registerAgencyOwnerRequest = (
  payload: AgencyOwnerSignupRequest
): Promise<SignupResponse> => registerRequest(payload)

export const verifyEmailRequest = async (
  params: VerifyEmailParams
): Promise<VerifyEmailResponse> => {
  const response = await apiClient.get<VerifyEmailResponse>(
    `${authConfig.verifyEmailEndpoint}`,
    {
      params,
      timeout: authConfig.requestTimeout
    }
  )

  return response.data
}

export const resendVerificationEmailRequest = async (
  data: ResendVerificationEmailRequest
): Promise<ResendVerificationEmailResponse> => {
  const response = await apiClient.post<ResendVerificationEmailResponse>(
    `${authConfig.resendVerificationEmailEndpoint}`,
    data,
    { timeout: authConfig.requestTimeout }
  )

  return response.data
}

export const logoutRequest = async (): Promise<void> => {
  await apiClient.post(
    `${authConfig.logoutEndpoint}`,
    null,
    {
      timeout: authConfig.requestTimeout
    }
  )
}

export const refreshTokenRequest = async (
  data: RefreshTokenRequest
): Promise<RefreshTokenResponse> => {
  const response = await apiClient.post<RefreshTokenResponse>(
    `${authConfig.refreshEndpoint}`,
    data,
    { timeout: authConfig.requestTimeout }
  )

  return response.data
}
