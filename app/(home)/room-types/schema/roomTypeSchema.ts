import { z } from 'zod'
import { TFunction } from 'i18next'

export const createRoomTypeSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('zodValidation.nameRequired', { defaultValue: 'Name is required' })),
    description: z.string().min(1, t('zodValidation.descriptionRequired', { defaultValue: 'Description is required' }))
  })

export type RoomTypeFormValues = z.infer<ReturnType<typeof createRoomTypeSchema>>
