import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export function RoomTypesEmptyState() {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      gap={0.5}
      sx={{
        textAlign: 'center',
        minHeight: 240,
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Typography variant='body1' color='text.secondary'>
        No room types yet
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Add your first room type to get started
      </Typography>
    </Stack>
  )
}
