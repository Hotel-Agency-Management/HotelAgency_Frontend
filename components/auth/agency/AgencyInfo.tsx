'use client'

import { Stack, Typography, TextField, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Building2, MapPin } from 'lucide-react'
import { MuiTelInput } from 'mui-tel-input'
import FormFieldWrapper from '@/components/ui/FormFieldWrapper'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { AgencySignupFormProps } from './types/agency'
import { useAgencyForm } from './hooks/useAgencyForm'
import { fadeInUp, staggerContainer } from '../signUp/constants/signupAnimation'
import FadeIn from '@/components/animation/FadeIn'

const MotionStack = motion.create(Stack)

const AgencyForm: React.FC<AgencySignupFormProps> = ({
  onBack,
  onSubmit: onSubmitProp,
  isLoading = false,
  defaultValues
}) => {
  const { t } = useTranslation()
  const {
    control, errors, isSubmitting, isStepComplete,
    errorMessage, handleSubmit, onSubmit,
  } = useAgencyForm({ onSubmit: onSubmitProp, defaultValues })

  return (
    <MotionStack
      spacing={3}
      variants={staggerContainer}
      initial='hidden'
      animate='show'
      exit='hidden'
    >
      <FadeIn variants={fadeInUp}>
        <Typography variant='h4' textAlign='center'>
          {t('agency.title', 'Agency Details')}
        </Typography>
      </FadeIn>

      <FadeIn variants={fadeInUp}>
        <Typography variant='body2' textAlign='center' color='text.secondary'>
          {t('agency.subtitle', 'Tell us about your agency to complete setup')}
        </Typography>
      </FadeIn>

      <FadeIn variants={fadeInUp}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MotionStack
            spacing={3}
            variants={staggerContainer}
            initial='hidden'
            animate='show'
            exit='hidden'
          >
            <ErrorMessage message={errorMessage} />

            <FadeIn variants={fadeInUp}>
              <FormFieldWrapper title={t('agency.agencyName', 'Agency Name')}>
                <Controller
                  name='agencyName'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size='small'
                      placeholder={t('agency.agencyNamePlaceholder', 'Acme Real Estate')}
                      error={!!errors.agencyName}
                      helperText={errors.agencyName?.message}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <Building2 size={16} style={{ marginRight: 8, flexShrink: 0 }} />
                          )
                        }
                      }}
                    />
                  )}
                />
              </FormFieldWrapper>
            </FadeIn>

            <FadeIn variants={fadeInUp}>
              <FormFieldWrapper title={t('agency.phone', 'Phone')}>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <MuiTelInput
                      {...field}
                      fullWidth
                      size='small'
                      defaultCountry='PS'
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </FormFieldWrapper>
            </FadeIn>

            <FadeIn variants={fadeInUp}>
              <FormFieldWrapper title={t('agency.city', 'City')}>
                <Controller
                  name='city'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size='small'
                      placeholder={t('agency.cityPlaceholder', 'Nablus')}
                      error={!!errors.city}
                      helperText={errors.city?.message}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <MapPin size={16} style={{ marginRight: 8, flexShrink: 0 }} />
                          )
                        }
                      }}
                    />
                  )}
                />
              </FormFieldWrapper>
            </FadeIn>

            <FadeIn variants={fadeInUp}>
              <LoadingButton
                loading={isLoading}
                type='submit'
                variant='contained'
                fullWidth
                disabled={isSubmitting || !isStepComplete}
              >
                {!isLoading && t('agency.continue', 'Continue')}
              </LoadingButton>
            </FadeIn>

            <FadeIn variants={fadeInUp}>
              <Typography variant='body2' textAlign='center'>
                {t('agency.backPrompt', 'Want to change your account info?')}{' '}
                <Button variant='text' onClick={onBack} color='primary'>
                  {t('agency.back', 'Go Back')}
                </Button>
              </Typography>
            </FadeIn>
          </MotionStack>
        </form>
      </FadeIn>
    </MotionStack>
  )
}

export default AgencyForm
