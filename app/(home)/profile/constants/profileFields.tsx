import {
  PersonOutlined,
  EmailOutlined,
  PhoneOutlined,
  CakeOutlined,
  WcOutlined,
} from '@mui/icons-material'
import type { TFunction } from 'i18next'
import { ProfileFields } from '../types/profile'

export const getGenderOptions = (t: TFunction) => [
  { value: 'male', label: t('profile.form.male', 'Male') },
  { value: 'female', label: t('profile.form.female', 'Female') },
] as const

/** @deprecated Use getGenderOptions(t) for translated labels */
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
] as const

type FieldVariant = 'text' | 'date' | 'select' | 'phone'

type FieldMeta = {
  key: keyof ProfileFields
  label: string
  icon: React.ReactNode
  variant: FieldVariant
  editable: boolean
  options?: readonly { value: string; label: string }[]
}

export const getFieldsMeta = (t: TFunction): FieldMeta[] => [
  {
    key: 'name',
    label: t('profile.form.fullName', 'Full Name'),
    icon: <PersonOutlined fontSize='small' />,
    variant: 'text',
    editable: true,
  },
  {
    key: 'email',
    label: t('profile.form.emailAddress', 'Email Address'),
    icon: <EmailOutlined fontSize='small' />,
    variant: 'text',
    editable: false,
  },
  {
    key: 'phone',
    label: t('profile.form.phoneNumber', 'Phone Number'),
    icon: <PhoneOutlined fontSize='small' />,
    variant: 'phone',
    editable: true,
  },
  {
    key: 'birthDate',
    label: t('profile.form.dateOfBirth', 'Date of Birth'),
    icon: <CakeOutlined fontSize='small' />,
    variant: 'date',
    editable: true,
  },
  {
    key: 'gender',
    label: t('profile.form.gender', 'Gender'),
    icon: <WcOutlined fontSize='small' />,
    variant: 'select',
    editable: true,
    options: getGenderOptions(t),
  },
]

/** @deprecated Use getFieldsMeta(t) for translated labels */
export const fieldsMeta: FieldMeta[] = [
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
