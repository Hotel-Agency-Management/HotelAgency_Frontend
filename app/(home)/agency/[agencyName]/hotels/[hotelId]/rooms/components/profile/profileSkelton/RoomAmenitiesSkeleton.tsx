import { Grid, Paper, Skeleton } from "@mui/material";

export function RoomAmenitiesSkeleton() {
  return (
    <Paper variant="card">
      <Skeleton width={120} height={26} sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {[0, 1, 2, 3].map((i) => (
          <Grid key={i} size={{ xs: 6, sm: 4, md: 3 }}>
            <Skeleton variant="rounded" height={64} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
