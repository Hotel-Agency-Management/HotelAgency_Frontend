export interface UserProfileHotel {
  hotelName: string
  hotelLogo: string | null
  hotelCountry: string
  hotelCity: string
  phone: string
}

export interface UserProfileAgency {
  name: string
  logo: string | null
  phone: string
  email: string
  city: string
}

export interface UserProfile {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  updatedAt: string
  dateOfBirth: string
  gender: string
  hotel?: UserProfileHotel
  agency?: UserProfileAgency
}

export interface UpdateUserProfileRequest {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  dateOfBirth?: string
  gender?: string
}
