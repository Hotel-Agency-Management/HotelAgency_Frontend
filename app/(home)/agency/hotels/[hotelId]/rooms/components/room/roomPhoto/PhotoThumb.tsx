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
  return (
    <PhotoThumbRoot
      variant="outlined"
      primaryPhoto={photo.isPrimary}
    >
      <PhotoThumbImage
        src={photo.url}
        alt=""
      />

      <PhotoThumbActions direction="row" gap={0.3}>
        <Tooltip title={photo.isPrimary ? "Primary photo" : "Set as primary"}>
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
          <Tooltip title="Replace cover photo">
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
              ? "Photo id is not available for deletion"
              : "Delete photo"
          }
        >
          <Box component='span'>
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
        <PrimaryPhotoLabel
          elevation={0}
          square
        >
          <Typography variant="caption" color="common.white" fontWeight={600}>
            Primary
          </Typography>
        </PrimaryPhotoLabel>
      ) : null}
    </PhotoThumbRoot>
  );
}
