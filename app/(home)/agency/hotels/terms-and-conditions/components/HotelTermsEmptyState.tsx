import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined'
import { useTranslation } from 'react-i18next'

interface HotelTermsEmptyStateProps {
  hotelName: string
  onCreate?: () => void
}

export function HotelTermsEmptyState({ hotelName, onCreate }: HotelTermsEmptyStateProps) {
  const { t } = useTranslation()

  return (
    <Stack>
      <Typography variant='body2' maxWidth={560}>
        {t('terms.emptyState.description', {
          defaultValue:
            '{{hotelName}} does not have a saved Terms & Conditions document yet. Add one now so future contracts and booking agreements can reference it.',
          hotelName
        })}
      </Typography>
      {onCreate ? (
        <Button variant='contained' startIcon={<NoteAddOutlinedIcon />} onClick={onCreate} size='small'>
          {t('terms.emptyState.createButton', { defaultValue: 'Create Terms' })}
        </Button>
      ) : null}
    </Stack>
  )
}
