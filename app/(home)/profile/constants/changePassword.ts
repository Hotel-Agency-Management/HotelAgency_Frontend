import { TFunction } from 'i18next'
import { ChangePasswordValues } from '../types/changePassword'

export const getFields = (t: TFunction): {
  name: keyof ChangePasswordValues
  label: string
  key: 'current' | 'newPass' | 'confirm'
}[] => [
  { name: 'currentPassword', label: t('changePassword.fields.current'), key: 'current' },
  { name: 'newPassword', label: t('changePassword.fields.new'), key: 'newPass' },
  { name: 'confirmPassword', label: t('changePassword.fields.confirm'), key: 'confirm' },
]
