import { FilterState, FilterStatus } from "../types/agency";

export const STATUS_TABS: { value: FilterStatus; label: string }[] = [
  { value: 'all',      label: 'All' },
  { value: 'pending',  label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name',   label: 'Agency Name' },
]

export const DEFAULT_FILTERS: FilterState = {
  search:  '',
  status:  'all',
  sortBy:  'newest',
}
