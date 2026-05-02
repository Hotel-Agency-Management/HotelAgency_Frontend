import { memo } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useRoomGallerySelection } from "../../hooks/useRoomGallerySelection";
import { GalleryEmpty, GalleryMainImage, GalleryStack } from "../../StyledComponents";
import type { RoomPhoto } from "../../types/room";
import { RoomGallerySkeleton } from "./profileSkelton/RoomGallerySkeleton";
import { RoomGalleryThumb } from "./RoomGalleryThumb";

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
      <GalleryEmpty alignItems="center" justifyContent="center">
        <Typography color="text.secondary" variant="body2" textAlign="center">
          {t("hotelRooms.profile.noPhotos")}
        </Typography>
      </GalleryEmpty>
    );
  }

  return (
    <GalleryStack gap={1.5}>
      <GalleryMainImage src={ordered[idx]?.url ?? ""} alt="" />
      <Grid container spacing={1.25}>
        {ordered.map((p, i) => (
          <Grid key={p.id} size={{ xs: 4, sm: 3 }}>
            <RoomGalleryThumb url={p.url} active={i === idx} onClick={() => setActive(i)} />
          </Grid>
        ))}
      </Grid>
    </GalleryStack>
  );
});
