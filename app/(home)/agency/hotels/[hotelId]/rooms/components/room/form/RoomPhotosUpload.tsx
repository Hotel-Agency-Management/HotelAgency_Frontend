import { useEffect, useRef, useState } from "react";
import {
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { RoomPhoto } from "../../../types/room";
import { PhotoDropSurface } from "../roomPhoto/PhotoDropSurface";
import { PhotoThumb } from "../roomPhoto/PhotoThumb";
import { AddPhotoTile } from "../roomPhoto/AddPhotoTile";

interface Props {
  roomId: string;
  existingPhotos: RoomPhoto[];
  onPhotosChange?: (photos: RoomPhoto[]) => void;
  title?: string;
  uploadButtonLabel?: string;
  emptyLabel?: string;
  summaryLabel?: string;
}

export const RoomPhotosUpload = ({
  roomId,
  existingPhotos,
  onPhotosChange,
  title = "Room Photos",
  uploadButtonLabel = "Upload Photos",
  emptyLabel = "Click to upload room photos",
  summaryLabel = "Star = set as primary cover",
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<RoomPhoto[]>(existingPhotos);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPhotos(existingPhotos);
  }, [existingPhotos]);

  useEffect(() => {
    onPhotosChange?.(photos);
  }, [photos, onPhotosChange]);

  const openFilePicker = () => inputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setUploading(true);

    await new Promise((res) => setTimeout(res, 800));

    const newPhotos: RoomPhoto[] = files.map((file, i) => ({
      id: `${Date.now()}-${i}`,
      url: URL.createObjectURL(file),
      isPrimary: photos.length === 0 && i === 0,
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = (id: string) => {
    setPhotos((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      const hasPrimary = filtered.some((p) => p.isPrimary);
      if (!hasPrimary && filtered.length > 0) {
        filtered[0] = { ...filtered[0], isPrimary: true };
      }
      return filtered;
    });
  };

  const handleSetPrimary = (id: string) => {
    setPhotos((prev) => prev.map((p) => ({ ...p, isPrimary: p.id === id })));
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2" fontWeight={600} component="span">
          {title}
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={
            uploading ? <CircularProgress size={14} /> : <AddPhotoAlternateIcon />
          }
          onClick={openFilePicker}
          disabled={uploading}
        >
          {uploadButtonLabel}
        </Button>
      </Stack>

      <input
        key={roomId}
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
      />

      {photos.length === 0 ? (
        <PhotoDropSurface onActivate={openFilePicker}>
          <AddPhotoAlternateIcon sx={{ fontSize: 40, color: "text.disabled" }} />
          <Typography variant="body2" color="text.secondary" mt={1}>
            {emptyLabel}
          </Typography>
        </PhotoDropSurface>
      ) : (
        <Stack direction="row" flexWrap="wrap" gap={1.5}>
          {photos.map((photo) => (
            <PhotoThumb
              key={photo.id}
              photo={photo}
              onSetPrimary={() => handleSetPrimary(photo.id)}
              onDelete={() => handleDelete(photo.id)}
            />
          ))}
          <AddPhotoTile onActivate={openFilePicker} />
        </Stack>
      )}

      <Typography variant="caption" color="text.secondary" component="p" sx={{ m: 0 }}>
        {photos.length} photo{photos.length !== 1 ? "s" : ""} — {summaryLabel}
      </Typography>
    </Stack>
  );
};
