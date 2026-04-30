'use client'

import { useRouter } from 'next/navigation'
import { Stack, Typography } from '@mui/material'
import AgencyFilters from './components/AgencyFilters'
import AgencyViewToggle from './components/AgencyViewToggle'
import AgencyListView from './components/AgencyListView'
import AgencyGridView from './components/AgencyGridView'
import { useAgencies } from './hooks/useAgencies'
import SearchInput from '@/components/common/SearchInput'
import FadeIn from '@/components/animation/FadeIn'

export default function AgenciesPage() {
  const router = useRouter()
  const {
    search,
    setSearch,
    filters,
    updateFilter,
    resetFilters,
    viewMode,
    setViewMode,
    agencies,
    totalCount,
    filteredCount
  } = useAgencies()

  const handleAgencyClick = (agencyId: number) => {
    router.push(`/agencies/${agencyId}/hotels`)
  }

  return (
    <Stack gap={3}>
      <FadeIn direction='down' distance={12}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Stack gap={0.5}>
            <Typography variant='h5' fontWeight={700}>
              Agencies
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {filteredCount} of {totalCount} agencies
            </Typography>
          </Stack>
          <AgencyViewToggle value={viewMode} onChange={setViewMode} />
        </Stack>
      </FadeIn>

      <FadeIn direction='up' distance={12} transition={{ delay: 0.1 }}>
        <Stack direction='row' alignItems='center' gap={2} flexWrap='wrap'>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder='Search by name, email, city...'
            sx={{ flex: 2, minWidth: 200 }}
          />
          <AgencyFilters
            filters={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
          />
        </Stack>
      </FadeIn>

      <FadeIn direction='up' distance={16} transition={{ delay: 0.15 }}>
        {viewMode === 'list' ? (
          <AgencyListView agencies={agencies} onAgencyClick={handleAgencyClick} />
        ) : (
          <AgencyGridView agencies={agencies} onAgencyClick={handleAgencyClick} />
        )}
      </FadeIn>

    </Stack>
  )
}
