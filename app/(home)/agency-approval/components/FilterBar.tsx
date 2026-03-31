import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ArrowUpDown } from 'lucide-react'
import type { FilterState } from '../types/agency'
import { br } from '@/core/utils/themeUtils'
import SearchInput from '@/components/common/SearchInput'
import Badge from '@/components/landing/Badge'
import { STATUS_TABS, SORT_OPTIONS } from '../constants/filter'

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
          <Stack direction='row' spacing={1} flexWrap='wrap'>
            {STATUS_TABS.map(tab => {
              const isActive = filters.status === tab.value

              return (
                <Button
                  key={tab.value}
                  variant={isActive ? 'contained' : 'outlined'}
                  size='small'
                  onClick={() => onFilterChange({ status: tab.value })}
                  sx={{
                    borderRadius: br(theme, 1.5),
                    px: { xs: 1.25, sm: 1.75 },
                    py: 0.625,
                    minWidth: 'fit-content',
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 700 : 500,

                  }}
                >
                  <Stack direction='row' alignItems='center' spacing={0.75}>
                    <Box component='span'>{tab.label}</Box>

                    {tab.value === 'pending' && pendingCount > 0 && (
                      <Badge label={pendingCount.toString()} variant='yellow' />
                    )}
                  </Stack>
                </Button>
              )
            })}
          </Stack>

          {!isMobile && (
            <FormControl size='small' sx={{ minWidth: 140 }}>
              <Select
                value={filters.sortBy}
                onChange={e =>
                  onFilterChange({
                    sortBy: e.target.value as FilterState['sortBy'],
                  })
                }
                displayEmpty
                startAdornment={
                  <InputAdornment position='start'>
                    <ArrowUpDown size={16} color={theme.palette.text.disabled} />
                  </InputAdornment>
                }
                sx={{
                  borderRadius: br(theme, 1.5),
                  fontSize: '0.8rem',
                  '& .MuiSelect-select': {
                    py: 0.875,
                  },
                }}
              >
                {SORT_OPTIONS.map(opt => (
                  <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.82rem' }}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
