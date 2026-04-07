import { Box, Grid, Skeleton } from "@mui/material";

export function RoomGallerySkeleton() {
  return (
    <Box sx={{ width: 1 }}>
      <Skeleton
        variant="rounded"
        sx={(th) => ({
          height: { xs: 240, md: 380 },
          borderRadius: th.spacing(1.5),
          boxShadow: th.shadows[4],
        })}
      />
      <Grid container spacing={1.25} sx={{ mt: 1.5 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Grid key={i} size={{ xs: 4, sm: 3 }}>
            <Skeleton variant="rounded" sx={{ height: { xs: 64, sm: 72 }, borderRadius: (th) => th.spacing(1) }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
