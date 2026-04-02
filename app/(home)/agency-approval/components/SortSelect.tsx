import {
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  useTheme,
} from '@mui/material'
import { ArrowUpDown } from 'lucide-react'
import { br } from '@/core/utils/themeUtils'

interface SortOption<T> {
  label: string
  value: T
}

interface SortSelectProps<T> {
  value: T
  options: SortOption<T>[]
  onChange: (value: T) => void
}

export default function SortSelect<T extends string>({
  value,
  options,
  onChange,
}: SortSelectProps<T>) {
  const theme = useTheme()

  return (
    <FormControl size='small' sx={{ minWidth: 140 }}>
      <Select
        value={value}
        onChange={e => onChange(e.target.value as T)}
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
        {options.map(opt => (
          <MenuItem
            key={String(opt.value)}
            value={opt.value}
            sx={{ fontSize: '0.82rem' }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
