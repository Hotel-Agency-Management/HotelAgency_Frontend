export const SIGNUP_API_ACCOUNT_TYPE = {
  CUSTOMER: 'Customer',
  AGENCY_OWNER: 'AgencyOwner',
} as const

export type SignupApiAccountType =
  (typeof SIGNUP_API_ACCOUNT_TYPE)[keyof typeof SIGNUP_API_ACCOUNT_TYPE]

interface BaseSignupRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  accountType: SignupApiAccountType
}

export interface CustomerSignupRequest extends BaseSignupRequest {
  accountType: typeof SIGNUP_API_ACCOUNT_TYPE.CUSTOMER
}

export interface AgencyOwnerSignupRequest extends BaseSignupRequest {
  accountType: typeof SIGNUP_API_ACCOUNT_TYPE.AGENCY_OWNER
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
  token: string
  refreshToken: string
}
