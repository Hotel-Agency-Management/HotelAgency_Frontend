import { z } from 'zod'
import { TFunction } from 'i18next'

export const createRoomTypeSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('zodValidation.nameRequired', 'Name is required')),
    description: z.string().min(1, t('zodValidation.descriptionRequired', 'Description is required')),
  })

export type RoomTypeFormValues = z.infer<ReturnType<typeof createRoomTypeSchema>>
