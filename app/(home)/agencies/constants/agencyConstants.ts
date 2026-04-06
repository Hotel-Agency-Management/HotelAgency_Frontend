import { AgencyStatus, AgencyFiltersState } from "../types/agency";

export const AGENCY_STATUS_OPTIONS: { label: string; value: AgencyStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Approval', value: 'approval' },
  { label: 'Pending', value: 'pending' },
  { label: 'Rejected', value: 'rejected' }
]

export const EMAIL_VERIFIED_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Verified', value: true },
  { label: 'Not Verified', value: false }
]

export const DEFAULT_FILTERS: AgencyFiltersState = {
  status: 'all',
  country: '',
  emailVerified: 'all'
}
export const PLAN_NAMES: Record<number, string> = {
  1: 'Basic',
  2: 'Pro',
  3: 'Enterprise'
}
