'use client'

import type { Control, FieldErrors } from 'react-hook-form'
import { AdditionalSection } from './AdditionalSection'
import { GuestInformationSection } from './GuestInformationSection'
import { PaymentSection } from './PaymentSection'
import { ReservationConfirmationSection } from './ReservationConfirmationSection'
import { ReservationDetailsSection } from './ReservationDetailsSection'
import type { DirectReservationFormInput } from '../../schema/directReservationSchema'
import type { RoomListItemResponse } from '@/app/(home)/agency/hotels/[hotelId]/rooms/configs/roomConfig'

interface DirectReservationStepContentProps {
  activeStep: number
  control: Control<DirectReservationFormInput>
  errors: FieldErrors<DirectReservationFormInput>
  rooms: RoomListItemResponse[]
  roomsLoading: boolean
  hasContract?: boolean
  hasInvoice?: boolean
  guestFullName?: string
  checkInDate?: string
  checkOutDate?: string
  roomNumbers?: string[]
  totalAmount?: number
}

export function DirectReservationStepContent({
  activeStep,
  control,
  errors,
  rooms,
  roomsLoading,
  hasContract = false,
  hasInvoice = false,
  guestFullName = '',
  checkInDate = '',
  checkOutDate = '',
  roomNumbers = [],
  totalAmount = 0,
}: DirectReservationStepContentProps) {
  switch (activeStep) {
    case 0:
      return <GuestInformationSection control={control} errors={errors} />
    case 1:
      return <ReservationDetailsSection control={control} errors={errors} rooms={rooms} roomsLoading={roomsLoading} />
    case 2:
      return <PaymentSection control={control} errors={errors} />
    case 3:
      return <AdditionalSection control={control} />
    case 4:
    default:
      return (
        <ReservationConfirmationSection
          guestFullName={guestFullName}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          roomNumbers={roomNumbers}
          totalAmount={totalAmount}
          hasContract={hasContract}
          hasInvoice={hasInvoice}
        />
      )
  }
}
