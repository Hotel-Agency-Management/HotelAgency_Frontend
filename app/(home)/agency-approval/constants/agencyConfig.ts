import { User, Mail, Phone, MapPin } from 'lucide-react'

export const AGENCY_INFO_FIELDS = [
  { key: 'ownerName', icon: User },
  { key: 'email', icon: Mail },
  { key: 'phone', icon: Phone },
  { key: 'location', icon: MapPin },
] as const
