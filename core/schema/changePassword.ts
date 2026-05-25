import { TFunction } from 'i18next'
import * as yup from 'yup'

export const getChangePasswordSchema = (t: TFunction) => yup.object().shape({
  currentPassword: yup
    .string()
    .required(t('validation.currentPasswordRequired', { defaultValue: 'Current password is required' })),
  newPassword: yup
    .string()
    .min(6, t('validation.passwordMin6', { defaultValue: 'Password must be at least 6 characters' }))
    .required(t('validation.passwordRequired', { defaultValue: 'Password is required' })),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], t('validation.passwordsDoNotMatch', { defaultValue: 'Passwords do not match' }))
    .required(t('validation.confirmPasswordRequired', { defaultValue: 'Please confirm your password' }))
})
