import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

export function NoAgencySelectedState() {
  const { t } = useTranslation()

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={0.5}
      textAlign="center"
      minHeight={240}
      border="1px dashed"
      borderColor="divider"
      borderRadius={2}
    >
      <Typography variant="body1">
        {t('dashboard.agencyOwner.noAgencySelected.title', { defaultValue: 'No agency selected' })}
      </Typography>
      <Typography variant="body2">
        {t('dashboard.agencyOwner.noAgencySelected.subtitle', {
          defaultValue: 'Select an agency to view its data',
        })}
      </Typography>
    </Stack>
  )
}
