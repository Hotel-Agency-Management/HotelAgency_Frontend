import { CardMedia, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { RoomPhoto } from "../../../../types/room";
import {
  roomCardImageAreaSx,
  roomCardImageMediaSx,
  roomCardPlaceholderSx,
} from "./roomGridViewStyles";

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
      <Stack sx={roomCardImageAreaSx}>
        <Stack sx={roomCardPlaceholderSx}>
          <Typography variant="body2" color="text.secondary">
            {t("hotelRooms.grid.noPhoto", "No photo")}
          </Typography>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack sx={roomCardImageAreaSx}>
      <CardMedia
        component="img"
        image={url}
        alt={title}
        sx={roomCardImageMediaSx}
      />
    </Stack>
  );
}
