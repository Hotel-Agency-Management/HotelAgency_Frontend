import { styled, Stack } from '@mui/material'

interface RoomProfileContainerProps {
  isDeleting?: boolean
}

export const RoomProfileContainer = styled(Stack, {
  shouldForwardProp: prop => prop !== 'isDeleting',
})<RoomProfileContainerProps>(({ isDeleting }) => ({
  width: '100%',
  maxWidth: 1120,
  marginInline: 'auto',
  opacity: isDeleting ? 0.6 : 1,
  pointerEvents: isDeleting ? 'none' : 'auto',
}))
