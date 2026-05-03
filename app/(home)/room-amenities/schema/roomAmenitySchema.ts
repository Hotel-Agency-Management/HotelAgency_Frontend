import { z } from 'zod'

export const roomAmenitySchema = z.object({
  name: z.string().trim().min(1, 'Amenity name is required'),
})

export type RoomAmenityFormValues = z.infer<typeof roomAmenitySchema>
