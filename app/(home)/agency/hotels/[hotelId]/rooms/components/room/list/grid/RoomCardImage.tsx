import { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { RoomPhoto } from "../../../../types/room";
import { RoomCardImageArea, RoomCardImg, RoomCardPlaceholder } from "./roomGridViewStyles";

function getPhotoCandidates(photos: RoomPhoto[]): string[] {
  const primary = photos.find((p) => p.isPrimary)?.url;
  const ordered = primary
    ? [primary, ...photos.map((photo) => photo.url).filter((url) => url !== primary)]
    : photos.map((photo) => photo.url);

  return Array.from(new Set(ordered.filter(Boolean)));
}

export interface RoomCardImageProps {
  photos: RoomPhoto[];
  title: string;
}

export function RoomCardImage({ photos, title }: RoomCardImageProps) {
  const { t } = useTranslation();
  const candidates = useMemo(() => getPhotoCandidates(photos), [photos]);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [candidates]);

  const url = candidates[imageIndex] ?? null;

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
      <RoomCardImg
        src={url}
        alt={title}
        onError={() => {
          setImageIndex((current) => current + 1);
        }}
      />
    </RoomCardImageArea>
  );
}
