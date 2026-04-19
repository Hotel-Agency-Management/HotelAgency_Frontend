import Typography from "@mui/material/Typography";
import type { FacilityPhoto } from "../../../types/facility";
import {
  FacilityCardImageArea,
  FacilityCardImg,
  FacilityCardPlaceholder,
} from "./facilityGridViewStyles";

function getPrimaryPhotoUrl(photos: FacilityPhoto[]): string | null {
  const primary = photos.find((photo) => photo.isPrimary);
  if (primary?.url) return primary.url;

  return photos[0]?.url ?? null;
}

interface Props {
  photos: FacilityPhoto[];
  title: string;
}

export function FacilityCardImage({ photos, title }: Props) {
  const url = getPrimaryPhotoUrl(photos);

  if (!url) {
    return (
      <FacilityCardImageArea>
        <FacilityCardPlaceholder>
          <Typography variant="body2" color="text.secondary">
            No photo
          </Typography>
        </FacilityCardPlaceholder>
      </FacilityCardImageArea>
    );
  }

  return (
    <FacilityCardImageArea>
      <FacilityCardImg src={url} alt={title} />
    </FacilityCardImageArea>
  );
}
