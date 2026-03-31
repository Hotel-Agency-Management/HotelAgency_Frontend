import {
  Box,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import type { FilterState } from '../types/agency'
import { br } from '@/core/utils/themeUtils'
import SearchInput from '@/components/common/SearchInput'
import { STATUS_TABS, SORT_OPTIONS } from '../constants/filter'
import StatusFilterTabs from './StatusFilterTabs'
import SortSelect from './SortSelect'

interface FilterBarProps {
  filters: FilterState
  pendingCount: number
  onFilterChange: (filters: Partial<FilterState>) => void
}

export default function FilterBar({
  filters,
  pendingCount,
  onFilterChange,
}: FilterBarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5 },
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: br(theme, 2),
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        <SearchInput
          value={filters.search}
          onChange={value => onFilterChange({ search: value })}
          placeholder='Search by agency name, owner, or email…'
        />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.5}
          alignItems={{ xs: 'stretch', md: 'center' }}
        >
          <StatusFilterTabs
            tabs={STATUS_TABS}
            value={filters.status}
            pendingCount={pendingCount}
            onChange={(status) => onFilterChange({ status })}
          />

          {!isMobile && (
            <SortSelect
              value={filters.sortBy}
              options={SORT_OPTIONS}
              onChange={(sortBy) => onFilterChange({ sortBy })}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
