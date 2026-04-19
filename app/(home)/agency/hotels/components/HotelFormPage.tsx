'use client'
import { useEffect } from "react"
import { FormProvider } from "react-hook-form"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import { useRouter, useParams } from "next/navigation"
import { useSettings } from "@/core/hooks/useSettings"
import { FormStepper } from "./stepper/FormStepper"
import { BasicInfoStep } from "./steps/BasicInfoStep"
import { BrandingStep } from "./steps/BrandingStep"
import { ManagerStep } from "./steps/ManagerStep"
import { useHotelForm } from "../hooks/useHotelForm"
import { useHotelStepper } from "../hooks/useHotelStepper"
import { useHotelStore } from "../hooks/useHotelStore"
import { useAuth } from "@/core/context/AuthContext"

interface HotelFormPageProps {
  mode: 'add' | 'edit'
}

export function HotelFormPage({ mode }: HotelFormPageProps) {
  const router = useRouter()
  const { hotelId } = useParams<{ hotelId?: string }>()
  const { user } = useAuth()
  const numericHotelId = hotelId ? Number(hotelId) : undefined
  const agencyId = user?.agencyId
  const { settings } = useSettings()

  const { addHotel, updateHotel, hotel, isLoading } = useHotelStore(
    agencyId,
    Number.isFinite(numericHotelId) ? numericHotelId : undefined
  )
  const hotelsPath = '/agency/hotels'

  const existingHotel = mode === 'edit' ? hotel : undefined

  const form = useHotelForm(existingHotel, settings.branding.colors)
  const { activeStep, goNext, goBack, isFirst, isLast } = useHotelStepper()

  const handleSubmit = form.handleSubmit(async (values) => {
    if (mode === 'edit' && hotelId) {
      await updateHotel(hotelId, values)
    } else {
      await addHotel(values)
    }
    router.push(hotelsPath)
  })

  const shouldRedirectToHotels =
    mode === 'edit' && (!hotelId || (!isLoading && !existingHotel))

  useEffect(() => {
    if (!shouldRedirectToHotels) return

    router.replace(hotelsPath)
  }, [hotelsPath, router, shouldRedirectToHotels])

  if (mode === 'edit' && !existingHotel) return null

  const stepProps = { isFirst, isLast, onBack: goBack, mode }

  return (
    <FormProvider {...form} key={hotelId ?? 'new'}>
      <Container maxWidth="md">
        <Stack spacing={3} py={4}>
          <FormStepper activeStep={activeStep} />
          {activeStep === 0 && <BasicInfoStep {...stepProps} onNext={goNext} />}
          {activeStep === 1 && <BrandingStep {...stepProps} onNext={goNext} />}
          {activeStep === 2 && (
            <ManagerStep
              {...stepProps}
              isSubmitting={isLoading}
              onNext={handleSubmit}
            />
          )}
        </Stack>
      </Container>
    </FormProvider>
  )
}
