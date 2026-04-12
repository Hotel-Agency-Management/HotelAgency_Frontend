'use client'

import { Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useOtp } from '../hooks/useOtp'
import { OTP_LENGTH } from '../types'

interface OtpStepProps {
  email: string
  isLoading: boolean
  onVerify: (otp: string) => void
  onBack: () => void
}

const OtpStep: React.FC<OtpStepProps> = ({ email, isLoading, onVerify, onBack }) => {
  const { t } = useTranslation()
  const { otp, otpRefs, handleChange, handleKeyDown, handlePaste } = useOtp()
  const lastSubmittedOtpRef = useRef('')

  useEffect(() => {
    if (otp.length < OTP_LENGTH) {
      lastSubmittedOtpRef.current = ''
      return
    }

    if (isLoading || lastSubmittedOtpRef.current === otp) {
      return
    }

    lastSubmittedOtpRef.current = otp
    onVerify(otp)
  }, [isLoading, onVerify, otp])

  return (
    <Stack spacing={3} alignItems='center'>
      <Typography variant='body2' textAlign='center'>
        {t('forgotPassword.code.sent')} <strong>{email}</strong>
      </Typography>

      <Stack direction='row' spacing={1} justifyContent='center'>
        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
          <TextField
            key={index}
            value={otp[index] || ''}
            onChange={e => handleChange(e.target.value, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            onPaste={handlePaste}
            inputRef={el => {
              otpRefs.current[index] = el
            }}
            inputProps={{
              maxLength: 1,
              inputMode: 'numeric',
              style: {
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 600,
                padding: '10px 0'
              }
            }}
            sx={{
              width: 48,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5
              }
            }}
          />
        ))}
      </Stack>

      <LoadingButton
        variant='contained'
        fullWidth
        loading={isLoading}
        onClick={() => onVerify(otp)}
        disabled={otp.length !== OTP_LENGTH}
      >
        {t('forgotPassword.code.verify')}
      </LoadingButton>

      <Typography
        variant='overline'
        onClick={onBack}
        sx={{
          textDecoration: 'underline',
          textAlign: 'center',
          cursor: 'pointer',
          color: 'text.secondary'
        }}
      >
        {t('forgotPassword.code.backToEmail')}
      </Typography>
    </Stack>
  )
}

export default OtpStep
