import * as yup from 'yup'
import type { TFunction } from 'i18next'

export const getAgencySchema = (t: TFunction) =>
  yup.object({
    agencyName: yup
      .string()
      .required(t('validation.agencyNameRequired', { defaultValue: 'Agency name is required' })),
    phone: yup
      .string()
      .required(t('validation.phoneRequired', { defaultValue: 'Phone is required' })),
    city: yup
      .string()
      .required(t('validation.cityRequired', { defaultValue: 'City is required' })),
  })
