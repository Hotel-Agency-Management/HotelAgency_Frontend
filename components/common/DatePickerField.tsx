'use client'

import type { ComponentProps } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { type Dayjs } from 'dayjs'
import { CalendarDays } from 'lucide-react'

type PickerIconProps = Omit<ComponentProps<typeof CalendarDays>, 'size'> & {
  ownerState?: unknown
}

function PickerCalendarIcon({ ownerState: _ownerState, ...props }: PickerIconProps) {
  return <CalendarDays {...props} size={18} />
}

interface DatePickerFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  minDate?: string
  maxDate?: string
  format?: string
  fullWidth?: boolean
  size?: 'small' | 'medium'
  disabled?: boolean
}

export function DatePickerField({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  format = 'DD/MM/YYYY',
  fullWidth = true,
  size = 'small',
  disabled = false,
}: DatePickerFieldProps) {
  const pickerValue = value ? dayjs(value) : null
  const pickerMinDate = minDate ? dayjs(minDate) : undefined
  const pickerMaxDate = maxDate ? dayjs(maxDate) : undefined

  const handleDateChange = (nextValue: Dayjs | null) => {
    if (!nextValue || !nextValue.isValid()) {
      onChange('')
      return
    }

    onChange(nextValue.format('YYYY-MM-DD'))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={pickerValue}
        onChange={handleDateChange}
        minDate={pickerMinDate}
        maxDate={pickerMaxDate}
        format={format}
        disabled={disabled}
        slots={{ openPickerIcon: PickerCalendarIcon }}
        slotProps={{
          textField: {
            fullWidth,
            size,
          },
        }}
      />
    </LocalizationProvider>
  )
}
