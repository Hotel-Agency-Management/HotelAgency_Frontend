import apiClient from "@/core/clients/apiClient"
import { UserProfile, UpdateUserProfileRequest } from "../configs/userProfileConfig"

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<UserProfile>('/auth/profile')
  return response.data
}

export const updateUserProfile = async (
  data: UpdateUserProfileRequest
): Promise<UserProfile> => {
  const response = await apiClient.patch<UserProfile>('/auth/profile', data)
  return response.data
}
