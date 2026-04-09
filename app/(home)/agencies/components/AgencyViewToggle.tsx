
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import Icon from '@/components/icon/Icon'
import { ViewMode } from '../types/agency'

interface Props {
  value: ViewMode
  onChange: (value: ViewMode) => void
}

export default function AgencyViewToggle({ value, onChange }: Props) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      size='small'
      onChange={(_, newValue) => { if (newValue) onChange(newValue) }}
    >
      <ToggleButton value='list'>
        <Icon icon='lucide:list' width={18} height={18} />
      </ToggleButton>
      <ToggleButton value='grid'>
        <Icon icon='lucide:layout-grid' width={18} height={18} />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
