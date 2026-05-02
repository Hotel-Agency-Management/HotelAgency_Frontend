import Grid from '@mui/material/Grid'
import { RoomType } from '../types/roomType'
import { RoomTypeCard } from './RoomTypeCard'

interface RoomTypesGridProps {
  roomTypes: RoomType[]
  onEdit: (roomType: RoomType) => void
  onDelete: (roomType: RoomType) => void
}

export function RoomTypesGrid({ roomTypes, onEdit, onDelete }: RoomTypesGridProps) {
  return (
    <Grid container spacing={2}>
      {roomTypes.map(roomType => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={roomType.id}>
          <RoomTypeCard roomType={roomType} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  )
}
