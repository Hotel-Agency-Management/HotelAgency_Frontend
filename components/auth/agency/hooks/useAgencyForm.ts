'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { getAgencySchema } from '@/core/schemas/agencySchema'
import { AgencyFormData, AgencySignupFormProps } from '../types/agency'

export function useAgencyForm({
  onSubmit: onSubmitProp,
  defaultValues,
}: Pick<AgencySignupFormProps, 'onSubmit' | 'defaultValues'>) {
  const { t } = useTranslation()
  const [errorMessage, setErrorMessage] = useState('')
  const agencySchema = getAgencySchema(t)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid }
  } = useForm<AgencyFormData>({
    defaultValues: defaultValues ?? {
      agencyName: '',
      phone: '',
      city: ''
    },
    resolver: yupResolver(agencySchema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const values = watch()
  const isStepComplete =
    (values.agencyName ?? '').trim().length > 0 &&
    (values.phone ?? '').trim().length > 0 &&
    (values.city ?? '').trim().length > 0 &&
    isValid

  const onSubmit = async (data: AgencyFormData) => {
    setErrorMessage('')
    try {
      await onSubmitProp(data)
    } catch (err) {
      setErrorMessage(
        typeof err === 'string' ? err : t('agency.submitError', 'Something went wrong')
      )
    }
  }

  return {
    control,
    errors,
    isSubmitting,
    isStepComplete,
    errorMessage,
    handleSubmit,
    onSubmit,
  }
}
