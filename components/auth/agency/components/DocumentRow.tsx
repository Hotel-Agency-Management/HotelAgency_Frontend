'use client'

import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Stack, Box, TextField, IconButton, InputAdornment, MenuItem, Select, FormControl, FormHelperText } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Trash2, Upload } from 'lucide-react'
import { useRef } from 'react'
import FormFieldWrapper from '@/components/ui/FormFieldWrapper'
import { AgencyDocumentsFormData } from '../types/documents'
import { ACCEPTED_DOCUMENT_TYPES, DOCUMENT_TYPES } from '../constants/documentTypes'

interface DocumentRowProps {
  index: number
  control: Control<AgencyDocumentsFormData>
  errors: FieldErrors<AgencyDocumentsFormData>
  onRemove: (index: number) => void
  onAppend: () => void
  canRemove: boolean
  currentFile: File | null
}

export default function DocumentRow({
  index,
  control,
  errors,
  onRemove,
  canRemove,
}: DocumentRowProps) {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} alignItems='flex-end'>
      <Box flex={1.2} minWidth={0}>
        <FormFieldWrapper title={index === 0 ? t('docs.fileType', 'File Type') : ''}>
          <Controller
            name={`documents.${index}.title`}
            control={control}
            rules={{
              validate: value =>
                value.trim().length > 0 ||
                t('docs.validation.fileTypeRequired', 'File type is required')
            }}
            render={({ field }) => (
              <FormControl fullWidth size='small' error={!!errors.documents?.[index]?.title}>
                <Select
                  {...field}
                  displayEmpty
                  renderValue={value => value || <span style={{ opacity: 0.4, fontSize: '0.875rem' }}>{t('docs.titlePlaceholder', 'Select file type')}</span>}
                >
                  {DOCUMENT_TYPES.map(type => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.documents?.[index]?.title && (
                  <FormHelperText>{errors.documents?.[index]?.title?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </FormFieldWrapper>
      </Box>

      <Box flex={1} minWidth={0}>
        <FormFieldWrapper title={index === 0 ? t('docs.file', 'File') : ''}>
          <Controller
            name={`documents.${index}.file`}
            control={control}
            rules={{
              validate: value => value !== null || t('docs.validation.fileRequired', 'File is required')
            }}
            render={({ field }) => (
              <>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept={ACCEPTED_DOCUMENT_TYPES}
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files?.[0] ?? null
                    field.onChange(file)
                  }}
                />
                <TextField
                  fullWidth
                  size='small'
                  placeholder={t('docs.filePlaceholder', 'Select a file')}
                  value={field.value?.name ?? ''}
                  onClick={() => fileInputRef.current?.click()}
                  error={!!errors.documents?.[index]?.file}
                  helperText={errors.documents?.[index]?.file?.message}
                  slotProps={{
                    input: {
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Upload size={16} />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </>
            )}
          />
        </FormFieldWrapper>
      </Box>

      <IconButton
        size='small'
        color='error'
        disabled={!canRemove}
        onClick={() => onRemove(index)}
        sx={{ opacity: canRemove ? 1 : 0.3 }}
      >
        <Trash2 size={16} />
      </IconButton>
    </Stack>
  )
}
