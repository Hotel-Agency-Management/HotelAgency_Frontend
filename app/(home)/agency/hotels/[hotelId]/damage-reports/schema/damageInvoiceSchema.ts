import { z } from 'zod'
import { TFunction } from 'i18next'

export const createDamageInvoiceSchema = (t: TFunction) =>
  z.object({
    customerName: z.string().min(1, t('zodValidation.customerNameRequired', 'Customer name is required')),
    customerEmail: z.string().email(t('zodValidation.invalidEmail', 'Invalid email')).optional(),
    damageAmount: z
      .number({ invalid_type_error: t('zodValidation.mustBeNumber', 'Must be a number') })
      .min(1, t('zodValidation.amountGreaterThanZero', 'Amount must be greater than 0')),
  })

export type DamageInvoiceFormValues = z.infer<ReturnType<typeof createDamageInvoiceSchema>>
