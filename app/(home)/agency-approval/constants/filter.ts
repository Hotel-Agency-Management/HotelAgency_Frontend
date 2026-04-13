import { FilterState, FilterStatus } from "../types/agency"
import { AGENCY_STATUS } from "@/components/auth/types/authType"

type SortBy = FilterState['sortBy']

export const STATUS_TABS: { value: FilterStatus; label: string }[] = [
  { value: 'all',      label: 'All' },
  { value: AGENCY_STATUS.PENDING,  label: 'Pending' },
  { value: AGENCY_STATUS.APPROVED, label: 'Approved' },
  { value: AGENCY_STATUS.REJECTED, label: 'Rejected' },
]

export const SORT_OPTIONS: { label: string; value: SortBy }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Name', value: 'name' },
]

export const DEFAULT_FILTERS: FilterState = {
  search: '',
  status: 'all',
  sortBy: 'newest',
}
