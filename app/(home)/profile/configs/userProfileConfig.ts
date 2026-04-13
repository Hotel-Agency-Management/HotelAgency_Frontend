export interface UserProfile {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  updatedAt: string
  dateOfBirth: string
  gender: string
}

export interface UpdateUserProfileRequest {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  dateOfBirth?: string
  gender?: string
}
