import * as yup from 'yup'
import { TFunction } from 'i18next'

export const createLoginSchema = (t: TFunction) =>
  yup.object({
    email: yup
      .string()
      .email(t('validation.invalidEmail', 'Invalid email address'))
      .required(t('validation.emailRequired', 'Email is required')),
    password: yup
      .string()
      .min(6, t('validation.passwordMin6', 'Password must be at least 6 characters'))
      .required(t('validation.passwordRequired', 'Password is required'))
  })
