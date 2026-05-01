import { Grid, Paper, Skeleton } from "@mui/material";
import { AmenitiesSkeletonTitle } from "../../../roomStyle";

export function RoomAmenitiesSkeleton() {
  return (
    <Paper variant="card">
      <AmenitiesSkeletonTitle width={120} height={26} />
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_,i) => (
          <Grid key={i} size={{ xs: 6, sm: 4, md: 3 }}>
            <Skeleton variant="rounded" height={64} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
