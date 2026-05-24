import { Tooltip, Typography } from "@mui/material";
import { RoomPhoto } from "../../../types/room";
import {
  PhotoThumbActionButton,
  PhotoThumbActions,
  PhotoThumbDeleteButton,
  PhotoThumbImage,
  PhotoThumbRoot,
  PrimaryPhotoLabel,
  TinyDeleteIcon,
  TinyStarBorderIcon,
  TinyStarIcon,
} from "../../../roomStyle";
import { useTranslation } from "react-i18next";

interface PhotoThumbProps {
  photo: RoomPhoto;
  onSetPrimary: () => void;
  onDelete: () => void;
}

export function PhotoThumb({
  photo,
  onSetPrimary,
  onDelete,
}: PhotoThumbProps) {
  const { t } = useTranslation();

  return (
    <PhotoThumbRoot variant="photoThumb" primaryPhoto={photo.isPrimary}>
      <PhotoThumbImage src={photo.url} alt="" />
      <PhotoThumbActions direction="row" gap={0.3}>
        <Tooltip
          title={
            photo.isPrimary
              ? t("hotelRooms.photos.primaryPhoto", "Primary photo")
              : t("hotelRooms.photos.setAsPrimary", "Set as primary")
          }
        >
          <PhotoThumbActionButton
            size="small"
            primaryPhoto={photo.isPrimary}
            onClick={(e) => {
              e.stopPropagation();
              onSetPrimary();
            }}
          >
            {photo.isPrimary ? (
              <TinyStarIcon />
            ) : (
              <TinyStarBorderIcon />
            )}
          </PhotoThumbActionButton>
        </Tooltip>
        <Tooltip title={t("hotelRooms.photos.deletePhoto", "Delete photo")}>
          <PhotoThumbDeleteButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <TinyDeleteIcon />
          </PhotoThumbDeleteButton>
        </Tooltip>
      </PhotoThumbActions>
      {photo.isPrimary && (
        <PrimaryPhotoLabel variant="photoBadge" elevation={0} square>
          <Typography variant="caption" color="common.white" fontWeight={600}>
            {t("hotelRooms.photos.primary", "Primary")}
          </Typography>
        </PrimaryPhotoLabel>
      )}
    </PhotoThumbRoot>
  );
}
