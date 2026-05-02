import { z } from 'zod'

export const roomTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
})

export type RoomTypeFormValues = z.infer<typeof roomTypeSchema>
