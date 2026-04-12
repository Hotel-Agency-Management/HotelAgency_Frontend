import { AGENCY_STATUS, AgencyStatus } from "@/components/auth/types/authType";
import { AgencyFiltersState } from "../types/agency";

export const AGENCY_STATUS_OPTIONS: { label: string; value: AgencyStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Approved', value: AGENCY_STATUS.APPROVED },
  { label: 'Pending', value: AGENCY_STATUS.PENDING },
  { label: 'Rejected', value: AGENCY_STATUS.REJECTED },
  { label: 'Incomplete', value: AGENCY_STATUS.INCOMPLETE }
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
