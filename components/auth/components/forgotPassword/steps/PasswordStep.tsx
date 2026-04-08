'use client'

import { Stack, TextField, Typography, InputAdornment, IconButton } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Eye, EyeOff } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import FormFieldWrapper from '@/components/ui/FormFieldWrapper'
import { createPasswordSchema } from '../schema/password'
import { PasswordFormData } from '../types'

interface PasswordStepProps {
  isLoading: boolean
  onSubmit: (data: PasswordFormData) => void
  onBack: () => void
}

const PasswordStep: React.FC<PasswordStepProps> = ({ isLoading, onSubmit, onBack }) => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)

  const schema = useMemo(() => createPasswordSchema(t), [t])

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordFormData>({
    defaultValues: { newPassword: '', confirmPassword: '' },
    resolver: yupResolver(schema)
  })

  const toggleVisibility = () => setShowPassword(prev => !prev)

  const passwordAdornment = (
    <InputAdornment position='end'>
      <IconButton edge='end' onClick={toggleVisibility} size='small'>
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </IconButton>
    </InputAdornment>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormFieldWrapper title={t('forgotPassword.resetPassword.newPassword')}>
          <Controller
            name='newPassword'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                fullWidth
                size='small'
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                InputProps={{ endAdornment: passwordAdornment }}
              />
            )}
          />
        </FormFieldWrapper>

        <FormFieldWrapper title={t('forgotPassword.resetPassword.confirmPassword')}>
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                fullWidth
                size='small'
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{ endAdornment: passwordAdornment }}
              />
            )}
          />
        </FormFieldWrapper>

        <LoadingButton type='submit' variant='contained' fullWidth loading={isLoading}>
          {t('forgotPassword.resetPassword.submit')}
        </LoadingButton>

        <Typography
          onClick={onBack}
          variant='overline'
          textAlign='center'
          sx={{ color: 'text.secondary', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {t('forgotPassword.resetPassword.backToEmail')}
        </Typography>
      </Stack>
    </form>
  )
}

export default PasswordStep
