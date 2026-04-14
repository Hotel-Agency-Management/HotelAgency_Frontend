import { Stack, TextField, Button, InputAdornment, IconButton, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff } from 'lucide-react'
import { MuiTelInput } from 'mui-tel-input'
import FormFieldWrapper from '@/components/ui/FormFieldWrapper'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { SIGNUP_UI_ACCOUNT_TYPE, type SignupUiAccountType, type SignupFormData } from '../types/signup'
import { staggerContainer, fadeInUp } from '../constants/signupAnimation'
import FadeIn from '@/components/animation/FadeIn'

interface AccountStepProps {
  control: Control<SignupFormData>
  errors: FieldErrors<SignupFormData>
  isLoading: boolean
  isSubmitting: boolean
  showPassword: boolean
  errorMessage: string
  accountType: SignupUiAccountType
  onTogglePassword: () => void
  onSwitchToLogin: () => void
}

const MotionStack = motion.create(Stack)

const AccountStep: React.FC<AccountStepProps> = ({
  control,
  errors,
  isLoading,
  isSubmitting,
  showPassword,
  errorMessage,
  accountType,
  onTogglePassword,
  onSwitchToLogin
}) => {
  const { t } = useTranslation()

  return (
    <MotionStack spacing={3} variants={staggerContainer} initial='hidden' animate='show' exit='hidden'>
      <ErrorMessage message={errorMessage} />

      <MotionStack
        direction={{ xs: 'column', sm: 'row' }}
        gap={2}
        variants={staggerContainer}
        initial='hidden'
        animate='show'
        exit='hidden'
      >
        <FadeIn variants={fadeInUp} sx={{ width: '100%' }}>
          <FormFieldWrapper title={t('signup.firstName', 'First Name')}>
            <Controller
              name='firstName'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  placeholder={t('signup.firstNamePlaceholder', 'John')}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </FormFieldWrapper>
        </FadeIn>

        <FadeIn variants={fadeInUp} sx={{ width: '100%' }}>
          <FormFieldWrapper title={t('signup.lastName', 'Last Name')}>
            <Controller
              name='lastName'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  placeholder={t('signup.lastNamePlaceholder', 'Doe')}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </FormFieldWrapper>
        </FadeIn>
      </MotionStack>

      <FadeIn variants={fadeInUp}>
        <FormFieldWrapper title={t('signup.email', 'Email')}>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size='small'
                placeholder={t('signup.emailPlaceholder', 'your@email.com')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </FormFieldWrapper>
      </FadeIn>

      <FadeIn variants={fadeInUp}>
        <FormFieldWrapper title={t('signup.phone', 'Phone')}>
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
        <FormFieldWrapper title={t('signup.password', 'Password')}>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size='small'
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={onTogglePassword}
                          onMouseDown={e => e.preventDefault()}
                          size='small'
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
            )}
          />
        </FormFieldWrapper>
      </FadeIn>

      <FadeIn variants={fadeInUp}>
        <FormFieldWrapper title={t('signup.confirmPassword', 'Confirm Password')}>
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size='small'
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
          disabled={isSubmitting}
        >
          {!isLoading && (
            accountType === SIGNUP_UI_ACCOUNT_TYPE.AGENCY_OWNER
              ? t('signup.continue', 'Continue')
              : t('signup.create', 'Create Account')
          )}
        </LoadingButton>
      </FadeIn>

      <FadeIn variants={fadeInUp}>
        <Typography variant='body2' textAlign='center' color='text.secondary'>
          {t('signup.alreadyHaveAccount', 'Already have an account?')}{' '}
          <Button variant='text' onClick={onSwitchToLogin} color='primary'>
            {t('signup.signIn', 'Sign In')}
          </Button>
        </Typography>
      </FadeIn>
    </MotionStack>
  )
}

export default AccountStep
