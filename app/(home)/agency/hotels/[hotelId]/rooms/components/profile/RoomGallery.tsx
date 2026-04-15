import { memo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useRoomGallerySelection } from "../../hooks/useRoomGallerySelection";
import type { RoomPhoto } from "../../types/room";
import { RoomGallerySkeleton } from "./profileSkelton/RoomGallerySkeleton";
import { RoomGalleryThumb } from "./RoomGalleryThumb";
import { RoomGalleryMainImage } from "./RoomGalleryMainImage";

export interface RoomGalleryProps {
  photos: RoomPhoto[];
  loading?: boolean;
}

export const RoomGallery = memo(function RoomGallery({ photos, loading }: RoomGalleryProps) {
  const { t } = useTranslation();
  const { ordered, idx, setActive } = useRoomGallerySelection(photos);

  if (loading) return <RoomGallerySkeleton />;

  if (!ordered.length) {
    return (
      <Box sx={{ minHeight: { xs: 240, md: 320 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography color="text.secondary" variant="body2" textAlign="center">
          {t("hotelRooms.profile.noPhotos")}
        </Typography>
      </Box>
    );
  }

  return (
    <Stack gap={1.5} sx={{ width: 1 }}>
      <RoomGalleryMainImage url={ordered[idx]?.url ?? ""} />
      <Grid container spacing={1.25}>
        {ordered.map((p, i) => (
          <Grid key={p.id} size={{ xs: 4, sm: 3 }}>
            <RoomGalleryThumb url={p.url} active={i === idx} onClick={() => setActive(i)} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
});
