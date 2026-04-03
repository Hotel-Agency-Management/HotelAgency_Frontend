import {
  PersonOutlined,
  EmailOutlined,
  PhoneOutlined,
  CakeOutlined,
  WcOutlined,
} from '@mui/icons-material'
import { ProfileFields } from '../types/profile'

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
] as const

type FieldVariant = 'text' | 'date' | 'select' | 'phone'

export const fieldsMeta: {
  key: keyof ProfileFields
  label: string
  icon: React.ReactNode
  variant: FieldVariant
  editable: boolean
  options?: readonly { value: string; label: string }[]
}[] = [
  {
    key: 'name',
    label: 'Full Name',
    icon: <PersonOutlined fontSize='small' />,
    variant: 'text',
    editable: true,
  },
  {
    key: 'email',
    label: 'Email Address',
    icon: <EmailOutlined fontSize='small' />,
    variant: 'text',
    editable: false,
  },
  {
    key: 'phone',
    label: 'Phone Number',
    icon: <PhoneOutlined fontSize='small' />,
    variant: 'phone',
    editable: true,
  },
  {
    key: 'birthDate',
    label: 'Date of Birth',
    icon: <CakeOutlined fontSize='small' />,
    variant: 'date',
    editable: true,
  },
  {
    key: 'gender',
    label: 'Gender',
    icon: <WcOutlined fontSize='small' />,
    variant: 'select',
    editable: true,
    options: GENDER_OPTIONS,
  },
]
