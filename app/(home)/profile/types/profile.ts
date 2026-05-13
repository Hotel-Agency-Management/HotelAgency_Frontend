import { User } from "@/core/configs/authConfig"
import type { HotelTheme } from "@/app/(home)/agency/hotels/types/hotel"

export type ActivityType = 'task' | 'review' | 'comment' | 'commit'

export interface ProfileSocialLinks {
  github: string
  linkedin: string
  twitter: string
  website: string
}

export interface ProfileFields {
  name: string
  email: string
  phone: string
  birthDate: string
  gender: string
}

export interface ProfileHeroData {
  name: string
  email: string
  title: string
  bio: string
  location: string
  joinedDate: string
  social: ProfileSocialLinks
}

export interface ProfileAgencyFile {
  id: string
  name: string
  documentType: string
}

export interface ProfileAgencyData {
  name: string
  logo?: string | null
  phone: string
  country?: string
  city: string
}

export interface ProfileHotelData {
  name: string
  logo?: string | null
  phone: string
  country?: string
  city: string
  brandColors?: string[]
}

export interface ProfilePageData {
  hero: ProfileHeroData
  overview: ProfileFields
  agency?: ProfileAgencyData
  hotel?: ProfileHotelData
}

export type ProfileUser = User & {
  hotelTheme?: HotelTheme
  social?: Partial<ProfileSocialLinks>
  location?: string
  bio?: string
  agency?: {
    name?: string
    logo?: string | null
    phone?: string
    country?: string
    city?: string
  }
  hotel?: {
    basicInfo?: {
      name?: string
      phone?: string
      city?: string
      address?: string
      currency?: string
    }
    branding?: {
      colors?: {
        primary?: string
        secondary?: string
        tertiary?: string
      }
    }
    managerId?: string
  }
}
