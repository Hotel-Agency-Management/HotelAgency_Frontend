import { z } from 'zod'
import { TFunction } from 'i18next'

export const createRoomAmenitySchema = (t: TFunction) =>
  z.object({
    name: z.string().trim().min(1, t('zodValidation.amenityNameRequired', 'Amenity name is required')),
  })

export type RoomAmenityFormValues = z.infer<ReturnType<typeof createRoomAmenitySchema>>
