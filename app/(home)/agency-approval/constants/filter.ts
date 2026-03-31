import { FilterState, FilterStatus } from "../types/agency"

type SortBy = FilterState['sortBy']

export const STATUS_TABS: { value: FilterStatus; label: string }[] = [
  { value: 'all',      label: 'All' },
  { value: 'pending',  label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
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
