import { useEffect, useRef, useState } from "react";
import {
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { RoomPhoto } from "../../../types/room";
import { PhotoDropSurface } from "./PhotoDropSurface";
import { PhotoThumb } from "./PhotoThumb";
import { AddPhotoTile } from "./AddPhotoTile";
import { RoomPhotosUploadProps } from "./types";

export function RoomPhotosUpload({
  roomId,
  existingPhotos,
  onPhotosChange,
}: RoomPhotosUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<RoomPhoto[]>(existingPhotos);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPhotos(existingPhotos);
  }, [existingPhotos]);

  useEffect(() => {
    onPhotosChange?.(photos);
  }, [photos, onPhotosChange]);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setUploading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setPhotos((prev) => {
      const newPhotos: RoomPhoto[] = files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        isPrimary: prev.length === 0 && index === 0,
      }));

      return [...prev, ...newPhotos];
    });

    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = (id: string) => {
    setPhotos((prev) => {
      const filteredPhotos = prev.filter((photo) => photo.id !== id);
      const hasPrimary = filteredPhotos.some((photo) => photo.isPrimary);

      if (!hasPrimary && filteredPhotos.length > 0) {
        filteredPhotos[0] = {
          ...filteredPhotos[0],
          isPrimary: true,
        };
      }

      return filteredPhotos;
    });
  };

  const handleSetPrimary = (id: string) => {
    setPhotos((prev) =>
      prev.map((photo) => ({
        ...photo,
        isPrimary: photo.id === id,
      }))
    );
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2" fontWeight={600} component="span">
          Room Photos
        </Typography>

        <Button
          size="small"
          variant="outlined"
          startIcon={
            uploading ? (
              <CircularProgress size={14} />
            ) : (
              <AddPhotoAlternateIcon />
            )
          }
          onClick={openFilePicker}
          disabled={uploading}
        >
          Upload Photos
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
        <PhotoDropSurface onActivate={openFilePicker} />
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

      <Typography
        variant="caption"
        color="text.secondary"
        component="p"
        sx={{ m: 0 }}
      >
        {photos.length} photo{photos.length !== 1 ? "s" : ""} — Star = set as
        primary cover
      </Typography>
    </Stack>
  );
}
