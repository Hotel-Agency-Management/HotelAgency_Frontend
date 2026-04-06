export type AgencyStatus = 'approval' | 'rejected' | 'pending'

export type ViewMode = 'list' | 'grid'

export interface Agency {
  id: number
  plan_id: number
  owner_id: number
  agency_name: string
  email: string
  phone: string
  country: string
  city: string
  address: string
  logo_url: string
  primary_color: string
  secondary_color: string
  tertiary_color: string
  status: AgencyStatus
  email_verified: boolean
  reviewed_by: number
  created_at: string
  updated_at: string
}

export interface AgencyFiltersState {
  status: AgencyStatus | 'all'
  country: string
  emailVerified: boolean | 'all'
}
