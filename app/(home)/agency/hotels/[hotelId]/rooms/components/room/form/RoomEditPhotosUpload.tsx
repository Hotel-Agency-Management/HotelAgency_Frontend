import { useEffect, useMemo, useRef } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack, Typography } from "@mui/material";
import {
  EditPhotoPreview,
  EmptyPhotoIcon,
  NewChip,
  PreviewDeleteButton,
  PreviewImage,
} from "../../../StyledComponents";
import type { RoomPhoto } from "../../../types/room";
import { AddPhotoTile } from "../roomPhoto/AddPhotoTile";
import { PhotoDropSurface } from "../roomPhoto/PhotoDropSurface";
import { PhotoThumb } from "../roomPhoto/PhotoThumb";

interface RoomEditPhotosUploadProps {
  existingPhotos: RoomPhoto[];
  newFiles: File[];
  replacementCoverPhoto: File | null;
  onNewFilesChange: (files: File[]) => void;
  onReplaceCoverPhoto: (file: File | null) => void;
  onDeleteExistingPhoto: (photo: RoomPhoto) => void;
}

export function RoomEditPhotosUpload({
  existingPhotos,
  newFiles,
  replacementCoverPhoto,
  onNewFilesChange,
  onReplaceCoverPhoto,
  onDeleteExistingPhoto,
}: RoomEditPhotosUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const previews = useMemo(
    () => newFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [newFiles],
  );
  const replacementPreview = useMemo(
    () => (replacementCoverPhoto ? URL.createObjectURL(replacementCoverPhoto) : null),
    [replacementCoverPhoto],
  );

  useEffect(() => {
    return () => {
      previews.forEach(({ url }) => URL.revokeObjectURL(url));
      if (replacementPreview) URL.revokeObjectURL(replacementPreview);
    };
  }, [previews, replacementPreview]);

  const openFilePicker = () => inputRef.current?.click();
  const openReplacePicker = () => replaceInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    if (!selected.length) return;
    onNewFilesChange([...newFiles, ...selected]);
    event.target.value = "";
  };

  const handleReplaceFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    if (!selected) return;
    onReplaceCoverPhoto(selected);
    event.target.value = "";
  };

  const removeNewFile = (index: number) => {
    onNewFilesChange(newFiles.filter((_, fileIndex) => fileIndex !== index));
  };

  const hasPhotos = existingPhotos.length > 0 || newFiles.length > 0;

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2" fontWeight={600}>
          Room Photos
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={openFilePicker}
        >
          Upload Photos
        </Button>
      </Stack>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
      />

      <input
        ref={replaceInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleReplaceFileChange}
      />

      {!hasPhotos ? (
        <PhotoDropSurface onActivate={openFilePicker}>
          <Stack alignItems="center" spacing={1}>
          <EmptyPhotoIcon />
          <Typography variant="body2" color="text.secondary">
            Click to upload room photos
          </Typography>
          </Stack>
        </PhotoDropSurface>
      ) : (
        <Stack direction="row" flexWrap="wrap" gap={1.5}>
          {existingPhotos.map((photo) => (
            <PhotoThumb
              key={photo.id}
              photo={
                photo.isCoverPhoto && replacementPreview
                  ? { ...photo, url: replacementPreview }
                  : photo
              }
              onSetPrimary={() => undefined}
              onReplace={photo.isCoverPhoto ? openReplacePicker : undefined}
              deleteDisabled={!Number.isFinite(Number(photo.id))}
              onDelete={
                Number.isFinite(Number(photo.id))
                  ? () => onDeleteExistingPhoto(photo)
                  : undefined
              }
            />
          ))}

          {previews.map(({ file, url }, index) => (
            <EditPhotoPreview
              key={`${file.name}-${file.lastModified}-${index}`}
            >
              <PreviewImage
                src={url}
                alt={file.name}
              />
              <NewChip
                label="New"
                size="small"
                color="primary"
              />
              <PreviewDeleteButton
                size="small"
                color="error"
                onClick={() => removeNewFile(index)}
              >
                <DeleteIcon fontSize="small" />
              </PreviewDeleteButton>
            </EditPhotoPreview>
          ))}

          <AddPhotoTile onActivate={openFilePicker} />
        </Stack>
      )}

      <Typography variant="caption" color="text.secondary">
        {existingPhotos.length} existing photo{existingPhotos.length !== 1 ? "s" : ""},{" "}
        {newFiles.length} new photo{newFiles.length !== 1 ? "s" : ""} selected
        {replacementCoverPhoto ? ", cover replacement selected" : ""}
      </Typography>
    </Stack>
  );
}
