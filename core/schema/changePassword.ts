import { TFunction } from 'i18next'
import * as yup from 'yup'

export const getChangePasswordSchema = (t: TFunction) => yup.object().shape({
  currentPassword: yup
    .string()
    .required(t('validation.currentPasswordRequired', 'Current password is required')),
  newPassword: yup
    .string()
    .min(6, t('validation.passwordMin6', 'Password must be at least 6 characters'))
    .required(t('validation.passwordRequired', 'Password is required')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], t('validation.passwordsDoNotMatch', 'Passwords do not match'))
    .required(t('validation.confirmPasswordRequired', 'Please confirm your password'))
})
