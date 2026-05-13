'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/core/context/AuthContext'
import { useActiveBranding } from '@/core/hooks/useActiveBranding'
import { useUserProfile } from '@/app/(home)/profile/hooks/queries/useUserProfile'
import type { ProfileUser } from '@/app/(home)/profile/types/profile'
import { useAdminRoomsByHotel } from '@/app/(home)/agency/hotels/[hotelId]/rooms/hooks/queries/adminRoomQueries'
import { HOTEL_TERMS_STATUSES } from '@/app/(home)/agency/hotels/terms-and-conditions/constants/status'
import { useAdminHotelTermsList } from '@/app/(home)/agency/hotels/terms-and-conditions/hooks/useHotelTermsQueries'
import {
  buildDirectReservationContractData,
  buildDirectReservationInvoiceData,
} from '@/app/(home)/reservations/[hotelId]/utils/buildDirectReservationDocumentData'
import {
  generateContractFile,
  generateInvoiceFile,
} from '@/app/(home)/reservations/[hotelId]/utils/generateReservationPdfs'
import { useAdminCreateReservation } from '@/app/(home)/reservations/[hotelId]/hooks/mutations/adminReservationMutations'
import { useDirectReservationForm } from '@/app/(home)/reservations/[hotelId]/hooks/useDirectReservationForm'
import type { DirectReservationFormValues } from '@/app/(home)/reservations/[hotelId]/schema/directReservationSchema'

interface ReservationPdfFiles {
  contract: File | null
  invoice: File | null
}

export function useAdminDirectReservationCreatePage(hotelId: number) {
  const params = useParams<{ agencyId?: string }>()
  const { user } = useAuth()
  const agencyId = params.agencyId ? Number(params.agencyId) : user?.agencyId
  const { mutateAsync } = useAdminCreateReservation(agencyId as number, hotelId)
  const { data: roomsResponse, isLoading: roomsLoading } = useAdminRoomsByHotel(
    agencyId,
    hotelId,
    { pageSize: 100 }
  )
  const rooms = roomsResponse?.items ?? []
  const { data: profile } = useUserProfile()
  const { data: termsList } = useAdminHotelTermsList(agencyId, hotelId)
  const branding = useActiveBranding()
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
