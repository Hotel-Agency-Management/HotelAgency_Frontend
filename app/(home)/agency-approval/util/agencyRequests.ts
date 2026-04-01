import { AgencyRequest, FilterState } from "../components"

export function filterAndSort(
  requests: AgencyRequest[],
  filters: FilterState,
): AgencyRequest[] {
  let result = [...requests]

  if (filters.status !== 'all') {
    result = result.filter(r => r.status === filters.status)
  }

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      r =>
        r.agencyName.toLowerCase().includes(q) ||
        r.ownerName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q),
    )
  }

  result.sort((a, b) => {
    if (filters.sortBy === 'newest') return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    if (filters.sortBy === 'oldest') return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
    return a.agencyName.localeCompare(b.agencyName)
  })

  return result
}
