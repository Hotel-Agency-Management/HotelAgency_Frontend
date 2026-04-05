import * as yup from 'yup'

export const buildSignupSchema = (t: (key: string, fallback: string) => string) =>
  yup.object().shape({
    firstName: yup.string().required(t('validation.firstNameRequired', 'First name is required')),
    lastName: yup.string().required(t('validation.lastNameRequired', 'Last name is required')),
    email: yup
      .string()
      .email(t('validation.invalidEmail', 'Invalid email address'))
      .required(t('validation.emailRequired', 'Email is required')),
    phone: yup.string().required(t('validation.phoneRequired', 'Phone is required')),
    role: yup
      .string()
      .required(t('validation.roleRequired', 'Role is required')),
    password: yup
      .string()
      .min(8, t('validation.passwordMin8', 'Password must be at least 8 characters'))
      .required(t('validation.passwordRequired', 'Password is required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('validation.passwordsDoNotMatch', 'Passwords do not match'))
      .required(t('validation.confirmPasswordRequired', 'Please confirm your password'))
  })
