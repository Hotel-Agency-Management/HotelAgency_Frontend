import { z } from 'zod'

export const damageInvoiceSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email').optional(),
  damageAmount: z
    .number({ invalid_type_error: 'Must be a number' })
    .min(1, 'Amount must be greater than 0'),
})

export type DamageInvoiceFormValues = z.infer<typeof damageInvoiceSchema>
