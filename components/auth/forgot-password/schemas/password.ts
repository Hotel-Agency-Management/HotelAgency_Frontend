import * as yup from 'yup'

export const createPasswordSchema = (t: (key: string) => string) =>
  yup.object({
    newPassword: yup
      .string()
      .min(6, t('forgotPassword.validation.minLength'))
      .required(t('forgotPassword.validation.newRequired')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], t('forgotPassword.validation.mustMatch'))
      .required(t('forgotPassword.validation.confirmRequired'))
  })
