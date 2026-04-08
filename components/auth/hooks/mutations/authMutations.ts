import { useMutation } from '@tanstack/react-query'
import { LoginCredentials, AuthResponse } from '@/core/configs/authConfig'
import {
  loginRequest,
  logoutRequest,
  registerAgencyOwnerRequest,
  registerCustomerRequest,
  refreshTokenRequest,
  resendVerificationEmailRequest
} from '@/components/auth/client/authClient'
import { SignupResponse, CustomerSignupRequest, AgencyOwnerSignupRequest, ResendVerificationEmailResponse, ResendVerificationEmailRequest, RefreshTokenResponse, RefreshTokenRequest } from '@/components/auth/config/authConfig'

export const useLoginMutation = () =>
  useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: loginRequest
  })

export const useSignUpCustomerMutation = () =>
  useMutation<SignupResponse, Error, CustomerSignupRequest>({
    mutationFn: registerCustomerRequest
  })

export const useSignUpAgencyOwnerMutation = () =>
  useMutation<SignupResponse, Error, AgencyOwnerSignupRequest>({
    mutationFn: registerAgencyOwnerRequest
  })

export const useResendVerificationEmailMutation = () =>
  useMutation<
    ResendVerificationEmailResponse,
    Error,
    ResendVerificationEmailRequest
  >({
    mutationFn: resendVerificationEmailRequest
  })

export const useLogoutMutation = () =>
  useMutation<void, Error, void>({
    mutationFn: logoutRequest
  })

export const useRefreshTokenMutation = () =>
  useMutation<RefreshTokenResponse, Error, RefreshTokenRequest>({
    mutationFn: refreshTokenRequest
  })
