export type ViewMode = 'list' | 'grid'

export type { AgencyDTO as Agency, PaginatedAgencyDTO } from '@/app/(home)/agency/configs/agencyProfileConfig'

export interface AgencyFiltersState {
  country: string
}

export interface AgencyTheme {
  primaryColor: string
  secondaryColor: string
  tertiaryColor: string
  logoUrl: string
}
