import { useEffect, useMemo, useRef } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack, Typography } from "@mui/material";
import {
  CoverChip,
  CreatePhotoPreview,
  EmptyPhotoIcon,
  PreviewDeleteButton,
  PreviewImage,
} from "../../../roomStyle";
import { PhotoDropSurface } from "../roomPhoto/PhotoDropSurface";

interface RoomCreatePhotosUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export function RoomCreatePhotosUpload({ files, onFilesChange }: RoomCreatePhotosUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previews = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files],
  );

  useEffect(() => {
    return () => {
      previews.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const openFilePicker = () => inputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    if (!selected.length) return;
    onFilesChange([...files, ...selected]);
    event.target.value = "";
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, fileIndex) => fileIndex !== index));
  };

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

      {files.length === 0 ? (
        <PhotoDropSurface onActivate={openFilePicker}>
          <EmptyPhotoIcon />
          <Typography variant="body2" color="text.secondary" mt={1}>
            Click to upload room photos
          </Typography>
        </PhotoDropSurface>
      ) : (
        <Stack direction="row" flexWrap="wrap" gap={1.5}>
          {previews.map(({ file, url }, index) => (
            <CreatePhotoPreview
              key={`${file.name}-${file.lastModified}-${index}`}
            >
              <PreviewImage
                src={url}
                alt={file.name}
              />
              {index === 0 ? (
                <CoverChip
                  label="Cover"
                  size="small"
                  color="primary"
                />
              ) : null}
              <PreviewDeleteButton
                size="small"
                color="error"
                onClick={() => removeFile(index)}
              >
                <DeleteIcon fontSize="small" />
              </PreviewDeleteButton>
            </CreatePhotoPreview>
          ))}
        </Stack>
      )}

      <Typography variant="caption" color="text.secondary">
        {files.length} photo{files.length !== 1 ? "s" : ""} selected. The first photo is used as the cover.
      </Typography>
    </Stack>
  );
}
