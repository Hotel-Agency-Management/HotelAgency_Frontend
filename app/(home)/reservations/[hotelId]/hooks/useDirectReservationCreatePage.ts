'use client'

import { useState } from 'react'
import { useAuth } from '@/core/context/AuthContext'
import { useActiveBranding } from '@/core/hooks/useActiveBranding'
import { useUserProfile } from '@/app/(home)/profile/hooks/queries/useUserProfile'
import type { ProfileUser } from '@/app/(home)/profile/types/profile'
import { useRoomsByHotel } from '@/app/(home)/agency/hotels/[hotelId]/rooms/hooks/queries/roomQueries'
import { HOTEL_TERMS_STATUSES } from '@/app/(home)/agency/hotels/terms-and-conditions/constants/status'
import { useHotelTermsList } from '@/app/(home)/agency/hotels/terms-and-conditions/hooks/useHotelTermsQueries'
import {
  buildDirectReservationContractData,
  buildDirectReservationInvoiceData,
} from '../utils/buildDirectReservationDocumentData'
import {
  generateContractFile,
  generateInvoiceFile,
} from '../utils/generateReservationPdfs'
import { RESERVATION_ROOM_LOOKUP_PAGE_SIZE } from '../constants/pagination'
import { useCreateReservation } from './mutation/useReservation'
import { useDirectReservationForm } from './useDirectReservationForm'
import type { DirectReservationFormValues } from '../schema/directReservationSchema'

interface ReservationPdfFiles {
  contract: File | null
  invoice: File | null
}

export function useDirectReservationCreatePage(hotelId: number) {
  const { mutateAsync } = useCreateReservation(hotelId)
  const { data: roomsResponse, isLoading: roomsLoading } = useRoomsByHotel(hotelId, {
    pageSize: RESERVATION_ROOM_LOOKUP_PAGE_SIZE,
  })
  const rooms = roomsResponse?.items ?? []
  const { data: profile } = useUserProfile()
  const { data: termsList } = useHotelTermsList(hotelId)
  const branding = useActiveBranding()
  const { user } = useAuth()
  const currency = (user as ProfileUser | null)?.hotel?.basicInfo?.currency ?? 'USD'
  const terms =
    termsList?.find(item => item.status === HOTEL_TERMS_STATUSES.ACTIVE) ??
    termsList?.[0] ??
    null

  const [pdfFiles, setPdfFiles] = useState<ReservationPdfFiles>({
    contract: null,
    invoice: null,
  })

  async function handleSubmit(values: DirectReservationFormValues) {
    await mutateAsync({
      ...values,
      contractFile: pdfFiles.contract,
      invoiceFile: pdfFiles.invoice,
    })
  }

  const form = useDirectReservationForm({
    rooms,
    onSubmit: handleSubmit,
  })

  async function handleBeforeNextStep(fromStep: number) {
    if (fromStep !== 3 || !profile) return

    const values = form.getValues()

    try {
      const contractData = buildDirectReservationContractData(values, profile, branding, rooms, terms)
      const invoiceData = buildDirectReservationInvoiceData(values, profile, branding, rooms, currency)

      const [contract, invoice] = await Promise.all([
        generateContractFile(contractData),
        generateInvoiceFile(invoiceData),
      ])

      setPdfFiles({ contract, invoice })
    } catch (err) {
      console.error('PDF generation failed:', err)
      setPdfFiles({ contract: null, invoice: null })
    }
  }

  return {
    ...form,
    rooms,
    roomsLoading,
    hasContract: !!pdfFiles.contract,
    hasInvoice: !!pdfFiles.invoice,
    handleBeforeNextStep,
  }
}
