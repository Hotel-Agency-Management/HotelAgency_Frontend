'use client'

import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import { MAX_LOGO_SIZE, readFileAsDataUrl } from '../constants/logoDetails'

interface UseLogoCardParams {
  namePrefix?: string
  displayLogo?: string | null
  onLogoUpload?: (file: File, previewUrl: string) => Promise<void> | void
}

export function useLogoCard({
  namePrefix,
  displayLogo,
  onLogoUpload,
}: UseLogoCardParams) {
  const { watch, setValue } = useFormContext()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [logoLoadFailed, setLogoLoadFailed] = useState(false)

  const logoFieldName = namePrefix ? `${namePrefix}.logo` : 'logo'
  const formLogo = watch(logoFieldName) as string | null | undefined
  const logo = formLogo || displayLogo || null

  useEffect(() => {
    setLogoLoadFailed(false)
  }, [logo])

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file.')
      e.target.value = ''
      return
    }

    if (file.size > MAX_LOGO_SIZE) {
      setUploadError('Logo must be 2 MB or less.')
      e.target.value = ''
      return
    }

    try {
      const previousLogo = formLogo ?? displayLogo ?? null
      const previewUrl = await readFileAsDataUrl(file)

      setValue(logoFieldName, previewUrl, { shouldDirty: !onLogoUpload })

      if (onLogoUpload) {
        try {
          await onLogoUpload(file, previewUrl)
        } catch (err) {
          setValue(logoFieldName, previousLogo ?? null, { shouldDirty: false })
          throw err
        }
      }

      setUploadError(null)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      e.target.value = ''
    }
  }

  const handleRemove = () => {
    setValue(logoFieldName, null, { shouldDirty: true })
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  return {
    fileInputRef,
    uploadError,
    logoLoadFailed,
    logo,
    setLogoLoadFailed,
    handleUpload,
    handleRemove,
    openFilePicker,
  }
}
