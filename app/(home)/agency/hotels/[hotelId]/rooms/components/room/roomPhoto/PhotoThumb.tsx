import { Box, Tooltip, Typography } from "@mui/material";
import { RoomPhoto } from "../../../types/room";
import {
  PhotoThumbActionButton,
  PhotoThumbActions,
  PhotoThumbDeleteButton,
  PhotoThumbImage,
  PhotoThumbReplaceButton,
  PhotoThumbRoot,
  PrimaryPhotoLabel,
  TinyDeleteIcon,
  TinyReplaceIcon,
  TinyStarBorderIcon,
  TinyStarIcon,
} from "../../../roomStyle";
import { useTranslation } from "react-i18next";

export function PhotoThumb({
  photo,
  onSetPrimary,
  onDelete,
  onReplace,
  deleteDisabled = false,
}: {
  photo: RoomPhoto;
  onSetPrimary: () => void;
  onDelete?: () => void;
  onReplace?: () => void;
  deleteDisabled?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <PhotoThumbRoot variant="outlined" primaryPhoto={photo.isPrimary}>
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

        {onReplace ? (
          <Tooltip
            title={t("hotelRooms.photos.replaceCover", "Replace cover photo")}
          >
            <PhotoThumbReplaceButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onReplace();
              }}
            >
              <TinyReplaceIcon />
            </PhotoThumbReplaceButton>
          </Tooltip>
        ) : null}

        <Tooltip
          title={
            deleteDisabled
              ? t(
                  "hotelRooms.photos.deleteUnavailable",
                  "Photo id is not available for deletion",
                )
              : t("hotelRooms.photos.deletePhoto", "Delete photo")
          }
        >
          <Box component="span">
            <PhotoThumbDeleteButton
              size="small"
              disabled={deleteDisabled}
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
            >
              <TinyDeleteIcon />
            </PhotoThumbDeleteButton>
          </Box>
        </Tooltip>
      </PhotoThumbActions>

      {photo.isPrimary ? (
        <PrimaryPhotoLabel elevation={0} square>
          <Typography variant="caption" color="common.white" fontWeight={600}>
            {t("hotelRooms.photos.primary", "Primary")}
          </Typography>
        </PrimaryPhotoLabel>
      ) : null}
    </PhotoThumbRoot>
  );
}
