import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'

interface RoomTypesHeaderProps {
  count: number
  isLoading: boolean
  onAdd: () => void
}

export function RoomTypesHeader({ count, isLoading, onAdd }: RoomTypesHeaderProps) {
  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Stack spacing={0.5}>
        <Typography variant='h5' fontWeight={500}>
          Room types
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {isLoading ? '...' : `${count} type${count !== 1 ? 's' : ''} configured`}
        </Typography>
      </Stack>

      <Button variant='contained' startIcon={<AddIcon />} onClick={onAdd}>
        Add room type
      </Button>
    </Stack>
  )
}
