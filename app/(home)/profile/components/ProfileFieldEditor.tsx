import { TextField, MenuItem, InputAdornment } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import { ProfileFields } from '../types/profile'

type Option = {
  value: string
  label: string
}

type FieldVariant = 'text' | 'date' | 'select' | 'phone'

interface ProfileFieldEditorProps {
  fieldKey: keyof ProfileFields
  label: string
  value: string
  icon: React.ReactNode
  variant: FieldVariant
  options?: readonly Option[]
  onChange: (key: keyof ProfileFields, value: string) => void
}

export function ProfileFieldEditor({
  fieldKey,
  label,
  value,
  icon,
  variant,
  options,
  onChange,
}: ProfileFieldEditorProps) {
  if (variant === 'phone') {
    return (
      <MuiTelInput
        fullWidth
        size='small'
        label={label}
        value={value}
        onChange={(newValue) => onChange('phone', newValue)}
        defaultCountry='US'
        forceCallingCode
        focusOnSelectCountry
      />
    )
  }

  if (variant === 'select') {
    return (
      <TextField
        select
        fullWidth
        size='small'
        label={label}
        value={value}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              {icon}
            </InputAdornment>
          ),
        }}
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )
  }

  return (
    <TextField
      fullWidth
      size='small'
      type={variant === 'date' ? 'date' : 'text'}
      label={label}
      value={value}
      onChange={(e) => onChange(fieldKey, e.target.value)}
      InputLabelProps={variant === 'date' ? { shrink: true } : undefined}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            {icon}
          </InputAdornment>
        ),
      }}
    />
  )
}
