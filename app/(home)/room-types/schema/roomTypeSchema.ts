import { z } from 'zod'

export const roomTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  capacity: z
    .number({ invalid_type_error: 'Capacity is required' })
    .min(1, 'Minimum capacity is 1'),
  dailyPrice: z
    .number({ invalid_type_error: 'Daily price is required' })
    .min(0, 'Price must be 0 or more'),
  weeklyPrice: z
    .number({ invalid_type_error: 'Weekly price is required' })
    .min(0, 'Price must be 0 or more'),
    monthlyPrice: z
    .number({ invalid_type_error: 'Monthly price is required' })
    .min(0, 'Price must be 0 or more'),
  extendPrice: z
    .number({ invalid_type_error: 'Extension price is required' })
    .min(0, 'Price must be 0 or more'),
})

export type RoomTypeFormValues = z.infer<typeof roomTypeSchema>
