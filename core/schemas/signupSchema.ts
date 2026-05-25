import type { TFunction } from 'i18next'
import * as yup from 'yup'

export const buildSignupSchema = (t: TFunction) =>
  yup.object().shape({
    firstName: yup.string().required(t('validation.firstNameRequired', { defaultValue: 'First name is required' })),
    lastName: yup.string().required(t('validation.lastNameRequired', { defaultValue: 'Last name is required' })),
    email: yup
      .string()
      .email(t('validation.invalidEmail', { defaultValue: 'Invalid email address' }))
      .required(t('validation.emailRequired', { defaultValue: 'Email is required' })),
    phone: yup.string().required(t('validation.phoneRequired', { defaultValue: 'Phone is required' })),
    role: yup
      .string()
      .required(t('validation.roleRequired', { defaultValue: 'Role is required' })),
    password: yup
      .string()
      .min(8, t('validation.passwordMin8', { defaultValue: 'Password must be at least 8 characters' }))
      .required(t('validation.passwordRequired', { defaultValue: 'Password is required' })),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('validation.passwordsDoNotMatch', { defaultValue: 'Passwords do not match' }))
      .required(t('validation.confirmPasswordRequired', { defaultValue: 'Please confirm your password' }))
  })
