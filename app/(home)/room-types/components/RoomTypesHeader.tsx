import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTranslation } from 'react-i18next'

interface RoomTypesHeaderProps {
  count: number
  isLoading: boolean
  onAdd: () => void
}

export function RoomTypesHeader({ count, isLoading, onAdd }: RoomTypesHeaderProps) {
  const { t } = useTranslation()

  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Stack spacing={0.5}>
        <Typography variant='h5' fontWeight={500}>
          {t('roomTypes.title', { defaultValue: 'Room Types' })}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {isLoading ? '...' : t('roomTypes.countConfigured', { count, defaultValue: '{{count}} type(s) configured' })}
        </Typography>
      </Stack>
      <LoadingButton variant='contained' startIcon={<AddIcon />} onClick={onAdd} size='small' loading={isLoading} >
        {t('roomTypes.create', { defaultValue: 'Add Room Type' })}
      </LoadingButton>
    </Stack>
  )
}
