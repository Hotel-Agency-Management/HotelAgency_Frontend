export type SignupAccountType = 'Customer' | 'AgencyOwner'

interface BaseSignupRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  accountType: SignupAccountType
}

export interface CustomerSignupRequest extends BaseSignupRequest {
  accountType: 'Customer'
}

export interface AgencyOwnerSignupRequest extends BaseSignupRequest {
  accountType: 'AgencyOwner'
  agencyName: string
  city: string
  country: string
  phone: string
}

export type SignupRequest =
  | CustomerSignupRequest
  | AgencyOwnerSignupRequest

export interface SignupResponse {
  userId: number
  email: string
  message: string
}

export interface VerifyEmailParams {
  userId: number
  token: string
}

export interface VerifyEmailResponse {
  message: string
  email?: string
  alreadyVerified?: boolean
}
export interface ResendVerificationEmailRequest {
  email: string
}

export interface ResendVerificationEmailResponse {
  success: boolean
  message: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}
