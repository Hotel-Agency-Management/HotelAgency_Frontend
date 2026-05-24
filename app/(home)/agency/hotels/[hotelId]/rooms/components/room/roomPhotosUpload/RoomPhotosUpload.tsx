import {
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { UploadSummary } from "../../../roomStyle";
import { PhotoDropSurface } from "./PhotoDropSurface";
import { PhotoThumb } from "./PhotoThumb";
import { AddPhotoTile } from "./AddPhotoTile";
import { RoomPhotosUploadProps } from "./types";
import { useRoomPhotosUpload } from "../../../hooks/useRoomPhotosUpload";
import { useTranslation } from "react-i18next";

export function RoomPhotosUpload(props: RoomPhotosUploadProps) {
  const { t } = useTranslation();
  const upload = useRoomPhotosUpload(props);

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2" fontWeight={600} component="span">
          {t("hotelRooms.photos.title", "Room Photos")}
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={
            upload.uploading ? (
              <CircularProgress size={14} />
            ) : (
              <AddPhotoAlternateIcon />
            )
          }
          onClick={upload.openFilePicker}
          disabled={upload.uploading}
        >
          {t("hotelRooms.photos.upload", "Upload Photos")}
        </Button>
      </Stack>

      <input
        key={upload.roomId}
        ref={upload.inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={upload.handleFileChange}
      />

      {upload.photos.length === 0 ? (
        <PhotoDropSurface onActivate={upload.openFilePicker} />
      ) : (
        <Stack direction="row" flexWrap="wrap" gap={1.5}>
          {upload.photos.map((photo) => (
            <PhotoThumb
              key={photo.id}
              photo={photo}
              onSetPrimary={() => upload.handleSetPrimary(photo.id)}
              onDelete={() => upload.handleDelete(photo.id)}
            />
          ))}
          <AddPhotoTile onActivate={upload.openFilePicker} />
        </Stack>
      )}

      <UploadSummary variant="caption" color="text.secondary">
        {t("hotelRooms.photos.uploadSummary", {
          defaultValue: "{{count}} photos - Star = set as primary cover",
          count: upload.photos.length,
        })}
      </UploadSummary>
    </Stack>
  );
}
