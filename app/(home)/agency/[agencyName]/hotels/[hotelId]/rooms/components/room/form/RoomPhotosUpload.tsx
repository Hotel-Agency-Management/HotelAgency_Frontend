import { useEffect, useRef, useState } from "react";
import {
  Button,
  CardMedia,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { RoomPhoto } from "../../../types/room";

interface Props {
  roomId: string;
  existingPhotos: RoomPhoto[];
  onPhotosChange?: (photos: RoomPhoto[]) => void;
}

function PhotoDropSurface({
  children,
  onActivate,
}: {
  children: React.ReactNode;
  onActivate: () => void;
}) {
  return (
    <Paper
      variant="outlined"
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      sx={{
        borderStyle: "dashed",
        p: 4,
        textAlign: "center",
        cursor: "pointer",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      {children}
    </Paper>
  );
}

function PhotoThumb({
  photo,
  onSetPrimary,
  onDelete,
}: {
  photo: RoomPhoto;
  onSetPrimary: () => void;
  onDelete: () => void;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        position: "relative",
        width: 120,
        height: 90,
        overflow: "hidden",
        borderWidth: photo.isPrimary ? 2 : 1,
        borderColor: photo.isPrimary ? "primary.main" : "divider",
        borderStyle: "solid",
      }}
    >
      <CardMedia
        component="img"
        src={photo.url}
        alt=""
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <Stack direction="row" position="absolute" top={2} right={2} gap={0.3}>
        <Tooltip title={photo.isPrimary ? "Primary photo" : "Set as primary"}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onSetPrimary();
            }}
            sx={{
              bgcolor: "rgba(0,0,0,0.5)",
              color: photo.isPrimary ? "warning.light" : "white",
              p: 0.3,
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
          >
            {photo.isPrimary ? (
              <StarIcon sx={{ fontSize: 14 }} />
            ) : (
              <StarBorderIcon sx={{ fontSize: 14 }} />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete photo">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            sx={{
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              p: 0.3,
              "&:hover": { bgcolor: "error.main" },
            }}
          >
            <DeleteIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      </Stack>

      {photo.isPrimary ? (
        <Paper
          elevation={0}
          square
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "primary.main",
            py: 0.3,
            textAlign: "center",
            borderRadius: 0,
          }}
        >
          <Typography variant="caption" color="common.white" fontWeight={600}>
            Primary
          </Typography>
        </Paper>
      ) : null}
    </Paper>
  );
}

function AddPhotoTile({ onActivate }: { onActivate: () => void }) {
  return (
    <Paper
      variant="outlined"
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      sx={{
        width: 120,
        height: 90,
        borderStyle: "dashed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <AddPhotoAlternateIcon sx={{ color: "text.disabled" }} />
    </Paper>
  );
}

export const RoomPhotosUpload = ({
  roomId,
  existingPhotos,
  onPhotosChange,
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
          Room Photos
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
        <PhotoDropSurface onActivate={openFilePicker}>
          <AddPhotoAlternateIcon sx={{ fontSize: 40, color: "text.disabled" }} />
          <Typography variant="body2" color="text.secondary" mt={1}>
            Click to upload room photos
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
        {photos.length} photo{photos.length !== 1 ? "s" : ""} — Star = set as
        primary cover
      </Typography>
    </Stack>
  );
};
