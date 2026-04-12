'use client'

import { Stack, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, ArrowLeft, Mail } from 'lucide-react'
import FormFieldWrapper from '@/components/ui/FormFieldWrapper'
import ErrorMessage from '@/components/ui/ErrorMessage'
import useLanguage from '@/core/hooks/useLanguage'
import FadeIn from '@/components/animation/FadeIn'
import EmailVerificationDialog from '@/components/auth/login/components/EmailVerificationDialog'
import { createLoginSchema } from './schema/loginSchema'
import { useLoginForm } from './hooks/useLoginForm'
import ForgotPasswordDialog from '../forgot-password/ForgotPasswordDialog'

interface LoginFormData {
  email: string
  password: string
  [key: string]: unknown
}

interface LoginFormProps {
  showEmailForm: boolean
  setShowEmailForm: (show: boolean) => void
  onSwitchToSignup: () => void
  fillTrigger?: number
}

const LoginForm: React.FC<LoginFormProps> = ({
  showEmailForm,
  setShowEmailForm,
  onSwitchToSignup,
  fillTrigger
}) => {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

  const {
    isLoading,
    isResendPending,
    errorMessage,
    verificationDialogOpen,
    verificationEmail,
    verificationDialogError,
    verificationDialogSuccess,
    login,
    handleCloseVerificationDialog,
    handleResendVerificationEmail
  } = useLoginForm()

  const schema = createLoginSchema(t)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const emailValue = watch('email')

  useEffect(() => {
    if (fillTrigger) {
      setValue('email', 'admin@test.com')
      setValue('password', 'password123')
    }
  }, [fillTrigger, setValue])

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (data: LoginFormData) => {
    await login({
      email: data.email,
      password: data.password
    })
  }

  return (
    <>
      <Stack spacing={showEmailForm ? 3 : 4}>
        <FadeIn>
          <Typography variant='h4' textAlign='center' mb={1}>
            {t('login.brand', 'Welcome Back')}
          </Typography>
        </FadeIn>

        <FadeIn>
          <Typography
            variant='body2'
            textAlign='center'
            color='text.secondary'
            mb={showEmailForm ? 1 : 0}
          >
            {t('login.subtitle', 'Sign in to continue to your account')}
          </Typography>
        </FadeIn>

        <FadeIn>
          {!showEmailForm ? (
            <Stack spacing={3}>
              <FadeIn>
                <Button
                  variant='contained'
                  fullWidth
                  startIcon={<Mail size={18} />}
                  onClick={() => setShowEmailForm(true)}
                >
                  {t('login.signInWithEmail', 'Sign in with Email')}
                </Button>
              </FadeIn>

              <FadeIn>
                <Typography variant='body2' textAlign='center' color='text.secondary' sx={{ mt: 3 }}>
                  {t('login.dontHaveAccount', "Don't have an account?")}{' '}
                  <Button
                    variant='text'
                    color='primary'
                    onClick={() => {
                      setShowEmailForm(false)
                      onSwitchToSignup()
                    }}
                  >
                    {t('login.signUp', 'Sign Up')}
                  </Button>
                </Typography>
              </FadeIn>
            </Stack>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <ErrorMessage message={errorMessage} />

                <FadeIn>
                  <FormFieldWrapper title={t('login.email', 'Email')}>
                    <Controller
                      name='email'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size='small'
                          placeholder={t('login.emailPlaceholder', 'your@email.com')}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </FormFieldWrapper>
                </FadeIn>

                <FadeIn>
                  <FormFieldWrapper title={t('login.password', 'Password')}>
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
                                    onClick={handleTogglePasswordVisibility}
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

                <FadeIn>
                  <Button
                    type='button'
                    variant='text'
                    size='small'
                    sx={{ alignSelf: 'flex-end', mt: -2 }}
                    onClick={() => setForgotPasswordOpen(true)}
                  >
                    {t('login.forgotPassword', 'Forgot password?')}
                  </Button>
                </FadeIn>

                <FadeIn>
                  <LoadingButton
                    loading={isLoading}
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    {!isLoading && t('login.signIn', 'Sign In')}
                  </LoadingButton>
                </FadeIn>

                <FadeIn>
                  <Button
                    type='button'
                    variant='text'
                    size='small'
                    onClick={() => setShowEmailForm(false)}
                    startIcon={
                      <ArrowLeft
                        size={16}
                        style={{ transform: language === 'ar' ? 'rotate(180deg)' : 'none' }}
                      />
                    }
                  >
                    {t('login.backToSocial', 'Back to social login')}
                  </Button>
                </FadeIn>
              </Stack>
            </form>
          )}
        </FadeIn>
      </Stack>

      <EmailVerificationDialog
        open={verificationDialogOpen}
        email={verificationEmail}
        isLoading={isResendPending}
        errorMessage={verificationDialogError}
        successMessage={verificationDialogSuccess}
        onClose={handleCloseVerificationDialog}
        onResend={handleResendVerificationEmail}
      />

      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        initialEmail={typeof emailValue === 'string' ? emailValue : ''}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </>
  )
}

export default LoginForm
