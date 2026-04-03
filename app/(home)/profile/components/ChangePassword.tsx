'use client'

import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { getPasswordStrength } from '../util/password'
import { ChangePasswordValues } from '../types/changePassword'
import { getFields } from '../constants/changePassword'
import { getChangePasswordSchema } from '@/core/schema/changePassword'
import { useChangePassword } from '../hooks/useChangePassword'

function ChangePassword() {
  const { t } = useTranslation()

  const [show, setShow] = useState({
    current: false,
    newPass: false,
    confirm: false
  })

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    resolver: yupResolver(getChangePasswordSchema(t))
  })

  const password = watch('newPassword')
  const { strengthLabel, strengthColor } = getPasswordStrength(password, t)
  const { mutateAsync: changePassword, isPending } = useChangePassword()

  const toggle = (key: keyof typeof show) => {
    setShow(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const onSubmit = async (data: ChangePasswordValues) => {
    try {
      await changePassword({
        current_password: data.currentPassword,
        new_password: data.newPassword
      })

      toast.success(t('changePassword.toast.success'))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || t('changePassword.toast.failed'))
      }
    }
  }

  return (
    <Container maxWidth='lg'>
      <Stack spacing={2}>
        <Stack spacing={2}>
          <Typography variant='h6'>
            {t('changePassword.page.title')}
          </Typography>

          <Typography variant='body1'>
            {t('changePassword.page.subtitle')}
          </Typography>
        </Stack>

        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <Paper variant='outlined' sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Stack spacing={3} sx={{ p: { xs: 2, sm: 3 } }}>
              <Stack alignItems='center'>
                <Stack
                  spacing={3}
                  sx={{
                    width: '100%',
                    maxWidth: 900,
                    pt: 3
                  }}
                >
                  <Stack spacing={2}>
                    <Typography variant='h6'>
                      {t('changePassword.section.title')}
                    </Typography>

                    <Typography variant='body1'>
                      {t('changePassword.section.subtitle')}
                    </Typography>
                  </Stack>

                  <Stack spacing={3}>
                    {getFields(t).map(({ name, label, key }) => (
                      <Stack key={name} spacing={1}>
                        <Controller
                          control={control}
                          name={name}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              size='small'
                              label={label}
                              type={show[key] ? 'text' : 'password'}
                              error={!!errors[name]}
                              helperText={errors[name]?.message}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      size='small'
                                      onClick={() => toggle(key)}
                                      edge='end'
                                    >
                                      {show[key] ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }}
                            />
                          )}
                        />

                        {name === 'newPassword' && password && (
                          <Typography
                            variant='caption'
                            sx={{ color: strengthColor }}
                          >
                            {strengthLabel}
                          </Typography>
                        )}
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Stack>

              <Divider />

              <Stack alignItems='center'>
                <Stack
                  direction='row'
                  justifyContent='flex-end'
                  spacing={1.5}
                  sx={{
                    width: '100%',
                    maxWidth: 900,
                    py: 2
                  }}
                >
                  <Button variant='outlined' size='small'>
                    {t('common.cancel')}
                  </Button>

                  <LoadingButton
                    loadingPosition='start'
                    variant='contained'
                    disableElevation
                    size='small'
                    type='submit'
                    loading={isPending}
                  >
                    {!isPending && t('changePassword.page.updateButton')}
                  </LoadingButton>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Container>
  )
}

export default ChangePassword
