
import { useState, useMemo } from 'react'
import { DEFAULT_FILTERS } from '../constants/agencyConstants'
import { AgencyFiltersState, ViewMode, Agency } from '../types/agency'
import { useAdminAgencies } from './queries/useAdminAgencies'

export function useAgencies() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<AgencyFiltersState>(DEFAULT_FILTERS)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const { data, isLoading } = useAdminAgencies()

  const filtered = useMemo(() => {
    return (data ?? []).filter((agency: Agency) => {
      const matchesSearch =
        agency.name.toLowerCase().includes(search.toLowerCase()) ||
        agency.phone.toLowerCase().includes(search.toLowerCase()) ||
        agency.email.toLowerCase().includes(search.toLowerCase()) ||
        agency.city.toLowerCase().includes(search.toLowerCase())

      const matchesCountry = !filters.country || agency.country === filters.country

      return matchesSearch && matchesCountry
    })
  }, [data, search, filters])

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
    isLoading,
    totalCount: data?.length ?? 0,
    filteredCount: filtered.length,
  }
}
