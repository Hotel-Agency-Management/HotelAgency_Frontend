'use client'

import { Typography, Button, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import DocumentRow from './components/DocumentRow'
import { AgencyDocumentsFormProps } from './types/documents'
import FadeIn from '@/components/animation/FadeIn'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { fadeInUp } from './constants/animations'
import { useAgencyDocumentsForm } from './hooks/useAgencyDocumentsForm'

const AgencyDocumentsForm: React.FC<AgencyDocumentsFormProps> = ({
  onBack,
  onSubmit: onSubmitProp,
  isLoading = false,
  defaultValues,
  submitLabel
}) => {
  const { t } = useTranslation()
  const {
    control, errors, isSubmitting, fields, append, insert,
    remove, documents, canAddMore, isStepComplete,
    errorMessage, handleSubmit, onSubmit,
  } = useAgencyDocumentsForm({ onSubmit: onSubmitProp, defaultValues })

  return (
    <Stack gap={5}>
      <Stack gap={2}>
        <FadeIn>
          <Typography variant='h4' textAlign='center'>
            {t('docs.title', 'Agency Files')}
          </Typography>
        </FadeIn>

        <FadeIn>
          <Typography variant='body2' textAlign='center'>
            {t('docs.subtitle', 'Add a file type and upload the matching document for your agency.')}
          </Typography>
        </FadeIn>
      </Stack>

      <FadeIn>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <ErrorMessage message={errorMessage} />

            <Stack spacing={3}>
              <AnimatePresence initial={false}>
                {fields.map((field, index) => (
                  <FadeIn
                    key={field.id}
                    variants={fadeInUp}
                    initial='hidden'
                    animate='show'
                    exit='exit'
                    layout
                    once={false}
                    direction='none'
                  >
                    <DocumentRow
                      index={index}
                      control={control}
                      errors={errors}
                      onRemove={remove}
                      onAppend={() => insert(index + 1, { title: '', file: null })}
                      canRemove={fields.length > 1}
                      currentFile={documents[index]?.file ?? null}
                    />
                  </FadeIn>
                ))}
              </AnimatePresence>
            </Stack>

            <Stack spacing={2}>
              <FadeIn>
                <Button
                  variant='outlined'
                  startIcon={<Plus size={16} />}
                  onClick={() => append({ title: '', file: null })}
                  fullWidth
                  disabled={!canAddMore}
                >
                  {t('docs.addDocument', 'Add Document')}
                </Button>
              </FadeIn>

              <FadeIn>
                <LoadingButton
                  type='submit'
                  variant='contained'
                  fullWidth
                  loading={isLoading}
                  disabled={isSubmitting || !isStepComplete}
                >
                  {!isLoading && (submitLabel ?? t('docs.continue', 'Continue'))}
                </LoadingButton>
              </FadeIn>
            </Stack>

            <FadeIn>
              <Typography variant='body2' textAlign='center'>
                {t('docs.backPrompt', 'Need to update agency details?')}{' '}
                <Button variant='text' onClick={onBack} color='primary'>
                  {t('docs.back', 'Go Back')}
                </Button>
              </Typography>
            </FadeIn>
          </Stack>
        </form>
      </FadeIn>
    </Stack>
  )
}

export default AgencyDocumentsForm
