import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

export function RoomTypesLoadingGrid() {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3].map(i => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
          <Skeleton variant='rounded' height={280} />
        </Grid>
      ))}
    </Grid>
  )
}
