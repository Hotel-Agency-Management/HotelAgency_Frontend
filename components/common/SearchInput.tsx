import { TextField, InputAdornment, TextFieldProps } from '@mui/material'
import { Search } from 'lucide-react'
import { useTheme } from '@mui/material/styles'
import { br } from '@/core/utils/themeUtils'

interface SearchInputProps extends Omit<TextFieldProps, 'onChange'> {
  value: string
  onChange: (value: string) => void
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  ...props
}: SearchInputProps) {
  const theme = useTheme()

  return (
    <TextField
      size='small'
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Search size={18} color={theme.palette.text.disabled} />
          </InputAdornment>
        ),
      }}
      sx={{
        flex: 1,
        '& .MuiOutlinedInput-root': {
          borderRadius: br(theme, 1.5),
        },
        '& input': {
          fontSize: '0.85rem',
        },
      }}
      {...props}
    />
  )
}
