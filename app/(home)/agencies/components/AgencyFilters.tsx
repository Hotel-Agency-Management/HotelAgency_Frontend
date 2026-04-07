
import { Stack, TextField, MenuItem, IconButton, Tooltip } from '@mui/material'
import Icon from '@/components/icon/Icon'
import { AGENCY_STATUS_OPTIONS, EMAIL_VERIFIED_OPTIONS } from '../constants/agencyConstants'
import { AgencyFiltersState } from '../types/agency'
import { COUNTRY_OPTIONS } from '../constants/contries'

interface Props {
  filters: AgencyFiltersState
  onFilterChange: <K extends keyof AgencyFiltersState>(key: K, value: AgencyFiltersState[K]) => void
  onReset: () => void
}

export default function AgencyFilters({ filters, onFilterChange, onReset }: Props) {
  return (
    <Stack direction='row' alignItems='center' gap={2} flexWrap='wrap'>

      <TextField
        select
        size='small'
        label='Status'
        value={filters.status}
        onChange={e => onFilterChange('status', e.target.value as AgencyFiltersState['status'])}
        sx={{ width: 160 }}
      >
        {AGENCY_STATUS_OPTIONS.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size='small'
        label='Country'
        value={filters.country}
        onChange={e => onFilterChange('country', e.target.value)}
        sx={{ width: 180 }}
      >
        {COUNTRY_OPTIONS.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size='small'
        label='Email Verified'
        value={String(filters.emailVerified)}
        onChange={e => {
          const val = e.target.value
          onFilterChange('emailVerified', val === 'all' ? 'all' : val === 'true')
        }}
        sx={{ width: 160 }}
      >
        {EMAIL_VERIFIED_OPTIONS.map(option => (
          <MenuItem key={String(option.value)} value={String(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

    <Tooltip title='Reset filters'>
      <IconButton size='small' onClick={onReset}>
        <Icon icon='lucide:x' width={18} height={18} />
      </IconButton>
    </Tooltip>

    </Stack>
  )
}
