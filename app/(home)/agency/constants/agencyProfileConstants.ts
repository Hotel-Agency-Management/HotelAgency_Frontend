import { AgencyProfile } from '../types/agencyProfile'

export const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, '')

export const EMPTY_PROFILE: AgencyProfile = {
  name: '',
  phone: '',
  country: '',
  city: '',
  files: [],
}
