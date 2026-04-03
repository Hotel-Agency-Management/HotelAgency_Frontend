import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { RoomType } from '../../types/roomType'
import { BedDouble, Users } from 'lucide-react'
import { formatCapacity, formatPrice } from '../../util/formatters'
import { SecondaryRate } from './SecondaryRate'

interface RoomTypeCardProps {
  roomType: RoomType
  currency: string
  onEdit: (roomType: RoomType) => void
  onDelete: (roomType: RoomType) => void
}

export function RoomTypeCard({ roomType, currency, onEdit, onDelete }: RoomTypeCardProps) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Stack direction='row' spacing={1.5} justifyContent='space-between' alignItems='center'>
          <Stack direction='row' spacing={0.75} alignItems='center'>
            <BedDouble size={16} />
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ textTransform: 'uppercase', fontWeight: 700 }}
            >
              Room type
            </Typography>
          </Stack>
          <Chip
            icon={<Users size={14} />}
            label={`Up to ${formatCapacity(roomType.capacity)}`}
            size='small'
            variant='outlined'
            color='primary'
            sx={{ p: 1 }}
          />
        </Stack>

        <Typography variant='h6' fontWeight={700}>
          {roomType.name}
        </Typography>

        <Typography variant='body2'>
          {roomType.description || 'Comfortable accommodation prepared for a refined hotel stay.'}
        </Typography>

        <Box>
          <Stack direction='row' alignItems='flex-end' justifyContent='space-between' spacing={2}>
            <Box>
              <Typography variant='caption' sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                Starting from
              </Typography>
              <Typography variant='h5' fontWeight={700}>
                {formatPrice(roomType.dailyPrice, currency)}
              </Typography>
            </Box>
            <Typography variant='body2'>per night</Typography>
          </Stack>

          <Divider sx={{ borderColor: theme => alpha(theme.palette.warning.main, 0.18) }} />

          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <SecondaryRate label='Weekly' value={roomType.weeklyPrice} currency={currency} />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <SecondaryRate label='Monthly' value={roomType.monthlyPrice} currency={currency} />
            </Grid>
          </Grid>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size='small' color='error' onClick={() => onDelete(roomType)}>
          Delete
        </Button>
        <Button size='small' variant='outlined' onClick={() => onEdit(roomType)}>
          Edit room
        </Button>
      </CardActions>
    </Card>
  )
}
