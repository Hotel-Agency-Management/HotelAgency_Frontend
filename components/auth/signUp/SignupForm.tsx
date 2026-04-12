'use client'

import { Stack, Typography, Box } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import AgencyForm from '@/components/auth/agency/AgencyInfo'
import AgencyDocumentsForm from '@/components/auth/agency/AgencyFile'
import { useSignupForm } from './hooks/useSignupForm'
import AccountTypeToggle from './components/AccountTypeToggle'
import AccountStep from './components/AccountStep'
import SignupStepper from './components/SignupStepper'
import FadeIn from '@/components/animation/FadeIn'
import type { SignupFormProps } from './types/signup'
import { fadeInUp, slideInFromLeft, slideInFromRight, slideTransition, staggerContainer } from './constants/signupAnimation'

const defaultDocumentValues = {
  documents: [{ title: '', file: null }]
}

const MotionStack = motion.create(Stack)

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin, initialStep = 0 }) => {
  const { t } = useTranslation()
  const {
    showPassword,
    errorMessage,
    accountType,
    activeStep,
    agencyValues,
    isLoading,
    form,
    togglePasswordVisibility,
    handleAccountTypeChange,
    onAccountSubmit,
    onAgencyInfoSubmit,
    onAgencyDocumentsSubmit,
    setActiveStep
  } = useSignupForm({ initialStep }) 

  const { control, handleSubmit, formState: { errors, isSubmitting } } = form

  const stepLabels = [
    t('signup.steps.account', 'Account'),
    t('signup.steps.agency', 'Agency'),
    t('signup.steps.files', 'Files')
  ]

  return (
    <Box>
      <AnimatePresence mode='wait'>

        {activeStep === 0 && (
          <FadeIn
            key='account-step'
            {...slideInFromLeft}
            transition={slideTransition}
            direction='none'
          >
            <MotionStack
              spacing={2}
              variants={staggerContainer}
              initial='hidden'
              animate='show'
            >
              <FadeIn variants={fadeInUp}>
                <Typography variant='h4' textAlign='center'>
                  {t('signup.title', 'Create Account')}
                </Typography>
              </FadeIn>

              <FadeIn variants={fadeInUp}>
                <AccountTypeToggle
                  accountType={accountType}
                  activeStep={activeStep}
                  stepLabels={stepLabels}
                  onChange={handleAccountTypeChange}
                />
              </FadeIn>

              <form onSubmit={handleSubmit(onAccountSubmit)}>
                <AccountStep
                  control={control}
                  errors={errors}
                  isLoading={isLoading}
                  isSubmitting={isSubmitting}
                  showPassword={showPassword}
                  errorMessage={errorMessage}
                  accountType={accountType}
                  onTogglePassword={togglePasswordVisibility}
                  onSwitchToLogin={onSwitchToLogin}
                />
              </form>
            </MotionStack>
          </FadeIn>
        )}

        {activeStep === 1 && (
          <FadeIn
            key='agency-step'
            {...slideInFromRight}
            transition={slideTransition}
            direction='none'
          >
            <Stack spacing={3}>
              <SignupStepper activeStep={activeStep} labels={stepLabels} />
              <AgencyForm
                defaultValues={agencyValues}
                onBack={() => setActiveStep(0)}
                onSubmit={onAgencyInfoSubmit}
              />
            </Stack>
          </FadeIn>
        )}

        {activeStep === 2 && (
          <FadeIn
            key='documents-step'
            {...slideInFromRight}
            transition={slideTransition}
            direction='none'
          >
            <Stack spacing={3}>
              <SignupStepper activeStep={activeStep} labels={stepLabels} />
              <AgencyDocumentsForm
                defaultValues={defaultDocumentValues}
                onBack={() => setActiveStep(1)}
                onSubmit={onAgencyDocumentsSubmit}
                submitLabel={t('signup.createAgency', 'Create Agency Account')}
                isLoading={isLoading}
              />
            </Stack>
          </FadeIn>
        )}

      </AnimatePresence>
    </Box>
  )
}

export default SignupForm
