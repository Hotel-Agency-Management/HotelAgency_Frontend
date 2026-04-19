'use client'

import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getErrorMessage } from '@/core/utils/apiError'
import { AgencyDocumentsFormData, AgencyDocumentsFormProps } from '../types/documents'

export function useAgencyDocumentsForm({
  onSubmit: onSubmitProp,
  defaultValues,
}: Pick<AgencyDocumentsFormProps, 'onSubmit' | 'defaultValues'>) {
  const { t } = useTranslation()
  const [errorMessage, setErrorMessage] = useState('')

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid }
  } = useForm<AgencyDocumentsFormData>({
    defaultValues: defaultValues ?? {
      documents: [{ title: '', file: null }]
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const { fields, append, insert, remove } = useFieldArray({
    control,
    name: 'documents'
  })

  const documents = watch('documents') ?? []

  const lastDocument = documents[documents.length - 1]
  const canAddMore = (lastDocument?.title ?? '').trim().length > 0 && lastDocument?.file !== null

  const isStepComplete =
    documents.length > 0 &&
    documents.every(doc => (doc.title ?? '').trim().length > 0 && doc.file !== null) &&
    isValid

  const onSubmit = async (data: AgencyDocumentsFormData) => {
    setErrorMessage('')
    try {
      await onSubmitProp(data)
    } catch (error) {
      setErrorMessage(getErrorMessage(error, t('docs.submitError', 'Something went wrong')))
    }
  }

  return {
    control,
    errors,
    isSubmitting,
    fields,
    append,
    insert,
    remove,
    documents,
    canAddMore,
    isStepComplete,
    errorMessage,
    handleSubmit,
    onSubmit,
  }
}
