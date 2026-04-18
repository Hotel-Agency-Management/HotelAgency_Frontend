import apiClient from "@/core/clients/apiClient"
import { ChangePasswordRequest, ChangePasswordResponse } from "../configs/changePasswordConfig"

export const changePassword = async (
  data: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  const response = await apiClient.post<ChangePasswordResponse>('/auth/change-password', data)
  return response.data
}
