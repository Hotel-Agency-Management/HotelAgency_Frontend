import { z } from 'zod'
import { TFunction } from 'i18next'
import { HOTEL_TERMS_STATUS_VALUES } from '../constants/status'

export const createHotelTermsSchema = (t: TFunction) =>
  z.object({
    title: z
      .string()
      .trim()
      .min(1, t('zodValidation.titleRequired', { defaultValue: 'Title is required' }))
      .max(120, t('zodValidation.titleMax120', { defaultValue: 'Title must be 120 characters or less' })),
    content: z
      .string()
      .trim()
      .min(1, t('zodValidation.termsContentRequired', { defaultValue: 'Terms content is required' }))
      .max(20000, t('zodValidation.termsContentMax20000', { defaultValue: 'Terms content must be 20,000 characters or less' })),
    status: z.enum(HOTEL_TERMS_STATUS_VALUES)
  })

export type HotelTermsFormValues = z.infer<ReturnType<typeof createHotelTermsSchema>>
