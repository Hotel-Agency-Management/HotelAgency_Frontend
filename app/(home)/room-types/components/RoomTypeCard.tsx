import { useState, type MouseEvent } from 'react'
import {
  IconButton,
  Menu,
  Stack,
  Typography,
} from '@mui/material'
import { RoomType } from '../types/roomType'
import { BedDouble, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import MenuItem from '@/components/ui/Menu'
import { RoomTypeCardContent, RoomTypeCardRoot } from '../styles/StyledComponents'

interface RoomTypeCardProps {
  roomType: RoomType
  onEdit: (roomType: RoomType) => void
  onDelete: (roomType: RoomType) => void
}

export function RoomTypeCard({ roomType, onEdit, onDelete }: RoomTypeCardProps) {
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
