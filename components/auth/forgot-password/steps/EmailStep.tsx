'use client'

import { Stack, TextField, Typography, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import FormFieldWrapper from '@/components/ui/FormFieldWrapper'

interface EmailStepProps {
  email: string
  isLoading: boolean
  onChange: (email: string) => void
  onSend: () => void
  onClose: () => void
}

const EmailStep: React.FC<EmailStepProps> = ({
  email,
  isLoading,
  onChange,
  onSend,
  onClose
}) => {
  const { t } = useTranslation()

  return (
    <Stack spacing={2}>
      <FormFieldWrapper title={t('forgotPassword.email.label')}>
        <TextField
          fullWidth
          placeholder={t('forgotPassword.email.placeholder')}
          value={email}
          onChange={e => onChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Mail size={18} />
              </InputAdornment>
            )
          }}
        />
      </FormFieldWrapper>

      <LoadingButton
        variant='contained'
        fullWidth
        loading={isLoading}
        onClick={onSend}
        loadingPosition='start'
      >
        {t('forgotPassword.email.sendCode')}
      </LoadingButton>

      <Typography
        variant='overline'
        onClick={onClose}
        sx={{
          textDecoration: 'underline',
          textAlign: 'center',
          cursor: 'pointer',
          color: 'text.secondary'
        }}
      >
        {t('forgotPassword.email.backToLogin')}
      </Typography>
    </Stack>
  )
}

export default EmailStep
