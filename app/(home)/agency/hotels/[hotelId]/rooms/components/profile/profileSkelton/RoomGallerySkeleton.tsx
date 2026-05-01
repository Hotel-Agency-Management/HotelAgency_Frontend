import Grid from "@mui/material/Grid";
import {
  GallerySkeletonGrid,
  GallerySkeletonMain,
  GallerySkeletonRoot,
  GallerySkeletonThumb,
} from "../../../roomStyle";

export function RoomGallerySkeleton() {
  return (
    <GallerySkeletonRoot>
      <GallerySkeletonMain variant="rounded" />
      <GallerySkeletonGrid container spacing={1.25}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Grid key={i} size={{ xs: 4, sm: 3 }}>
            <GallerySkeletonThumb variant="rounded" />
          </Grid>
        ))}
      </GallerySkeletonGrid>
    </GallerySkeletonRoot>
  );
}
