export type ViewMode = 'list' | 'grid'

export interface Agency {
  id: number
  ownerId: number
  name: string
  plan_id: number
  email: string
  phone: string
  country: string
  city: string
  logoUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface AgencyFiltersState {
  country: string
}

export interface AgencyTheme {
  primaryColor: string
  secondaryColor: string
  tertiaryColor: string
  logoUrl: string
}
