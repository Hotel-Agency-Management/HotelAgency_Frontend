
import { useState, useMemo } from 'react'
import { DEFAULT_FILTERS } from '../constants/agencyConstants'
import { MOCK_AGENCIES } from '../data/agenciesMock'
import { AgencyFiltersState, ViewMode, Agency } from '../types/agency'

export function useAgencies() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<AgencyFiltersState>(DEFAULT_FILTERS)
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  const filtered = useMemo(() => {
    return MOCK_AGENCIES.filter((agency: Agency) => {
      const matchesSearch =
        agency.name.toLowerCase().includes(search.toLowerCase()) ||
        agency.email.toLowerCase().includes(search.toLowerCase()) ||
        agency.city.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = filters.status === 'all' || agency.status === filters.status
      const matchesCountry = !filters.country || agency.country === filters.country
      const matchesEmailVerified =
        filters.emailVerified === 'all' || agency.email_verified === filters.emailVerified

      return matchesSearch && matchesStatus && matchesCountry && matchesEmailVerified
    })
  }, [search, filters])

  const updateFilter = <K extends keyof AgencyFiltersState>(key: K, value: AgencyFiltersState[K]) => {
    setFilters((prev: AgencyFiltersState) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => setFilters(DEFAULT_FILTERS)

  return {
    search,
    setSearch,
    filters,
    updateFilter,
    resetFilters,
    viewMode,
    setViewMode,
    agencies: filtered,
    totalCount: MOCK_AGENCIES.length,
    filteredCount: filtered.length
  }
}
