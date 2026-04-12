import { User } from "@/core/configs/authConfig"

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
  phone: string
  city: string
  address: string
  currency: string
  managerId: string
  brandColors: string[]
}

export interface ProfilePageData {
  hero: ProfileHeroData
  overview: ProfileFields
  agency?: ProfileAgencyData
  hotel?: ProfileHotelData
}

export type ProfileUser = User & {
  social?: Partial<ProfileSocialLinks>
  location?: string
  bio?: string
}
