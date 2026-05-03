export type ViewMode = 'list' | 'grid'

export interface Agency {
  id: number
  ownerId: number
  name: string
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
