'use client'
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

interface HotelFormPageProps {
  mode: 'add' | 'edit'
}

export function HotelFormPage({ mode }: HotelFormPageProps) {
  const router = useRouter()
  const { agencyName, hotelId } = useParams<{
    agencyName: string
    hotelId?: string
  }>()
  const { settings } = useSettings()

  const { addHotel, updateHotel, getHotelById, isLoading } = useHotelStore()

  const existingHotel = mode === 'edit' && hotelId
  ? getHotelById(hotelId)
  : undefined

  const form = useHotelForm(existingHotel, settings.branding.colors)
  const { activeStep, goNext, goBack, isFirst, isLast } = useHotelStepper()

  const handleSubmit = form.handleSubmit(async (values) => {
    if (mode === 'edit' && hotelId) {
      await updateHotel(hotelId, values)
    } else {
      await addHotel(values)
    }
    router.push(`/agency/${agencyName}/hotels`)
  })

  if (mode === 'edit' && !existingHotel) {
    router.push(`/agency/${agencyName}/hotels`)
    return null
  }

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
