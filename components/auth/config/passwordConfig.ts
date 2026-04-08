export interface ForgetPassResponse {
  success: boolean
  message: string
}
export interface VerifyCodeRequest {
  email: string,
  code: string
}
export interface ResetPassRequest{
  email: string,
  code: string,
  newPassword : string
}
