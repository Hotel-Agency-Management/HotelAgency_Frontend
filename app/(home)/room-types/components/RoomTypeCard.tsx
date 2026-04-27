import { useState, type MouseEvent } from 'react'
import {
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Menu,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { RoomType } from '../types/roomType'
import { BedDouble, MoreVertical, Pencil, Trash2, Users } from 'lucide-react'
import { formatCapacity, formatPrice } from '../../agency/hotels/[hotelId]/rooms/util/formatters'
import MenuItem from '@/components/ui/Menu'
import { RoomTypeCardContent, RoomTypeCardRoot } from '../styles/StyledComponents'
import { SecondaryRate } from './SecondaryRate'

interface RoomTypeCardProps {
  roomType: RoomType
  currency?: string
  onEdit: (roomType: RoomType) => void
  onDelete: (roomType: RoomType) => void
}

export function RoomTypeCard({ roomType, currency = 'USD', onEdit, onDelete }: RoomTypeCardProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)
  const menuOpen = Boolean(menuAnchor)

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setMenuAnchor(null)
  }

  const handleEdit = () => {
    handleCloseMenu()
    onEdit(roomType)
  }

  const handleDelete = () => {
    handleCloseMenu()
    onDelete(roomType)
  }

  return (
    <RoomTypeCardRoot>
      <RoomTypeCardContent>
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
          <Stack direction='row' spacing={1} alignItems='center'>
            <Chip
              icon={<Users size={14} />}
              label={`Up to ${formatCapacity(roomType.capacity)}`}
              size='small'
              variant='outlined'
              color='primary'
              sx={{ p: 1 }}
            />
            <IconButton
              size='small'
              aria-label='Room type actions'
              aria-controls={menuOpen ? `room-type-actions-${roomType.id}` : undefined}
              aria-haspopup='menu'
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={handleOpenMenu}
            >
              <MoreVertical size={18} />
            </IconButton>
          </Stack>
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
            <Grid size={{ xs: 6 }} sx={{ textAlign: 'right' }}>
              <SecondaryRate label='Monthly' value={roomType.monthlyPrice} currency={currency} />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <SecondaryRate label='Extension' value={roomType.extendPrice} currency={currency} />
            </Grid>
          </Grid>
        </Box>
      </RoomTypeCardContent>

      <Menu
        id={`room-type-actions-${roomType.id}`}
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleEdit} variant='default'>
          <Stack direction='row' alignItems='center' gap={1}>
            <Pencil size={16} />
            Edit room type
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleDelete} variant='danger'>
          <Stack direction='row' alignItems='center' gap={1}>
            <Trash2 size={16} />
            Delete
          </Stack>
        </MenuItem>
      </Menu>
    </RoomTypeCardRoot>
  )
}
