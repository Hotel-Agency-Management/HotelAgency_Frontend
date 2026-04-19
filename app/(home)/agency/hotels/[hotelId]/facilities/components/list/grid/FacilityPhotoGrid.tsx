import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { AddPhotoTile } from "../../../../rooms/components/room/roomPhoto/AddPhotoTile";
import { PhotoDropSurface } from "../../../../rooms/components/room/roomPhoto/PhotoDropSurface";
import { PhotoThumb } from "../../../../rooms/components/room/roomPhoto/PhotoThumb";
import { FacilityPhoto } from "../../../types/facility";

interface Props {
  photos: FacilityPhoto[];
  onActivate: () => void;
  onSetPrimary: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FacilityPhotoGrid({ photos, onActivate, onSetPrimary, onDelete }: Props) {
  if (photos.length === 0) {
    return (
      <PhotoDropSurface onActivate={onActivate}>
        <AddPhotoAlternateIcon sx={{ fontSize: 40, color: "text.disabled" }} />
        <Typography variant="body2" color="text.secondary">
          Click to upload facility photos
        </Typography>
      </PhotoDropSurface>
    );
  }

  return (
    <Stack direction="row" flexWrap="wrap" gap={1.5}>
      {photos.map((photo) => (
        <PhotoThumb
          key={photo.id}
          photo={photo}
          onSetPrimary={() => onSetPrimary(photo.id)}
          onDelete={() => onDelete(photo.id)}
        />
      ))}
      <AddPhotoTile onActivate={onActivate} />
    </Stack>
  );
}
