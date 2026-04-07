import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { RoomPhoto } from "../../../../types/room";
import { RoomCardImageArea, RoomCardImg, RoomCardPlaceholder } from "./roomGridViewStyles";

function getPrimaryPhotoUrl(photos: RoomPhoto[]): string | null {
  const primary = photos.find((p) => p.isPrimary);
  if (primary?.url) return primary.url;
  return photos[0]?.url ?? null;
}

export interface RoomCardImageProps {
  photos: RoomPhoto[];
  title: string;
}

export function RoomCardImage({ photos, title }: RoomCardImageProps) {
  const { t } = useTranslation();
  const url = getPrimaryPhotoUrl(photos);

  if (!url) {
    return (
      <RoomCardImageArea>
        <RoomCardPlaceholder>
          <Typography variant="body2" color="text.secondary">
            {t("hotelRooms.grid.noPhoto", "No photo")}
          </Typography>
        </RoomCardPlaceholder>
      </RoomCardImageArea>
    );
  }

  return (
    <RoomCardImageArea>
      <RoomCardImg src={url} alt={title} />
    </RoomCardImageArea>
  );
}
