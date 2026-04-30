
import { Stack, TextField, MenuItem, IconButton, Tooltip } from '@mui/material'
import Icon from '@/components/icon/Icon'
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

      <Tooltip title='Reset filters'>
        <IconButton size='small' onClick={onReset}>
          <Icon icon='lucide:x' width={18} height={18} />
        </IconButton>
      </Tooltip>

    </Stack>
  )
}
