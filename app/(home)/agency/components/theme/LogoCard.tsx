'use client'

import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ImageIcon, Trash2, Upload } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLogoCard } from '../../hooks/useLogoCard'

interface LogoCardProps {
  namePrefix?: string
  displayLogo?: string | null
  onLogoUpload?: (file: File, previewUrl: string) => Promise<void> | void
  isUploading?: boolean
}

export function LogoCard({
  namePrefix,
  displayLogo,
  onLogoUpload,
  isUploading = false,
}: LogoCardProps) {
  const { fileInputRef, uploadError, logoLoadFailed, logo, setLogoLoadFailed, handleUpload, handleRemove, openFilePicker } =
    useLogoCard({
      namePrefix,
      displayLogo,
      onLogoUpload,
    })
  const { t } = useTranslation()

  return (
    <Paper elevation={0} variant="card">
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={500}>
          {t('agencySettings.theme.brandIdentityTitle', 'Brand identity')}
        </Typography>
        <Typography variant="body2">
          {t('agencySettings.theme.uploadLogoHint', 'Upload a custom logo for your agency.')}
        </Typography>
      </Stack>

      <Divider />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2.5}
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        <Avatar
          src={logoLoadFailed ? undefined : (logo ?? undefined)}
          variant="rounded"
          sx={{ width: 96, height: 96 }}
          imgProps={{
            onError: () => setLogoLoadFailed(true),
            style: { objectFit: 'contain' },
          }}
        >
          <Stack spacing={0.75} alignItems="center">
            <ImageIcon size={20} />
            <Typography variant="caption" color="text.disabled">
              {t('agencySettings.theme.noLogo', 'No logo')}
            </Typography>
          </Stack>
        </Avatar>

        <Stack spacing={1.5} flex={1}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Button
              size="small"
              variant="contained"
              disableElevation
              disabled={isUploading}
              startIcon={
                isUploading ? (
                  <CircularProgress size={13} color="inherit" />
                ) : (
                  <Upload size={15} />
                )
              }
              onClick={openFilePicker}
            >
              {t('agencySettings.theme.upload', 'Upload')}
            </Button>

            <Button
              size="small"
              variant="outlined"
              color="inherit"
              startIcon={<Trash2 size={15} />}
              disabled={!logo || isUploading || Boolean(onLogoUpload)}
              onClick={handleRemove}
              sx={{ borderColor: 'divider' }}
            >
              {t('agencySettings.theme.remove', 'Remove')}
            </Button>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            {t('agencySettings.theme.logoFileTypes', 'PNG, JPG, SVG or WEBP · max 2 MB')}
          </Typography>

          <input
            ref={fileInputRef}
            hidden
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            onChange={handleUpload}
          />

          {uploadError && (
            <Alert severity="error" sx={{ py: 0.25 }}>
              {uploadError}
            </Alert>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}
