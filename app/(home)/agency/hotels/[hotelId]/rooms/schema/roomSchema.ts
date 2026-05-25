import { z } from 'zod'
import { TFunction } from 'i18next'
import { RoomStatus } from '../types/room'

const ROOM_STATUS_VALUES = Object.values(RoomStatus) as [RoomStatus, ...RoomStatus[]]

export const createRoomSchema = (t: TFunction) =>
  z.object({
    roomNumber: z.string().min(1, t('zodValidation.roomNumberRequired', { defaultValue: 'Room number is required' })),
    floorNumber: z
      .number({ invalid_type_error: t('zodValidation.floorNumberMustBeNumber', { defaultValue: 'Floor number must be a number' }) })
      .min(0, t('zodValidation.floorNumberMin0', { defaultValue: 'Floor number must be 0 or above' })),
    roomTypeId: z
      .number({ invalid_type_error: t('zodValidation.roomTypeRequired', { defaultValue: 'Room type is required' }) })
      .min(1, t('zodValidation.roomTypeRequired', { defaultValue: 'Room type is required' })),
    status: z.enum(ROOM_STATUS_VALUES),
    description: z.string().optional(),
    notes: z.string().optional(),
    capacity: z
      .number({ invalid_type_error: t('zodValidation.capacityMustBeNumber', { defaultValue: 'Capacity must be a number' }) })
      .min(1, t('zodValidation.capacityMin1', { defaultValue: 'Capacity must be at least 1' })),
    amenityIds: z.array(z.number()).default([]),
    dailyPrice: z
      .number({ invalid_type_error: t('zodValidation.dailyPriceMustBeNumber', { defaultValue: 'Daily price must be a number' }) })
      .min(0)
      .default(0),
    weeklyPrice: z
      .number({ invalid_type_error: t('zodValidation.weeklyPriceMustBeNumber', { defaultValue: 'Weekly price must be a number' }) })
      .min(0)
      .default(0),
    monthlyPrice: z
      .number({ invalid_type_error: t('zodValidation.monthlyPriceMustBeNumber', { defaultValue: 'Monthly price must be a number' }) })
      .min(0)
      .default(0),
    extendPrice: z
      .number({ invalid_type_error: t('zodValidation.extendPriceMustBeNumber', { defaultValue: 'Extend price must be a number' }) })
      .min(0)
      .default(0),
    yearlyInsurance: z
      .number({ invalid_type_error: t('zodValidation.insuranceFeeMustBeNumber', { defaultValue: 'Insurance fee must be a number' }) })
      .positive(t('zodValidation.insuranceFeePositive', { defaultValue: 'Insurance fee must be a positive number' })),
    insurancePerReservation: z
      .number({
        invalid_type_error: t(
          'zodValidation.insurancePerReservationMustBeNumber',
          'Insurance per reservation must be a number'
        )
      })
      .min(0)
      .default(0),
    coverPhoto: z.custom<File | null>().optional().nullable()
  })

export type RoomFormValues = z.infer<ReturnType<typeof createRoomSchema>>
