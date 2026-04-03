import {
  CardMedia,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { RoomPhoto } from "../../../types/room";

interface PhotoThumbProps {
  photo: RoomPhoto;
  onSetPrimary: () => void;
  onDelete: () => void;
}
const actionBtnSx = {
  bgcolor: "rgba(0,0,0,0.5)",
  color: "common.white",
  p: 0.3,
} as const;

export function PhotoThumb({
  photo,
  onSetPrimary,
  onDelete,
}: PhotoThumbProps) {
  return (
    <Paper
      variant="photoThumb"
      sx={{
        borderWidth: photo.isPrimary ? 2 : 1,
        borderColor: photo.isPrimary ? "primary.main" : "divider",
      }}
    >
      <CardMedia
        component="img"
        src={photo.url}
        alt=""
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <Stack
        direction="row"
        position="absolute"
        top={2}
        right={2}
        gap={0.3}
      >
        <Tooltip title={photo.isPrimary ? "Primary photo" : "Set as primary"}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onSetPrimary();
            }}
            sx={{
              ...actionBtnSx,
              color: photo.isPrimary ? "warning.light" : "common.white",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
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
              ...actionBtnSx,
              "&:hover": {
                bgcolor: "error.main",
              },
            }}
          >
            <DeleteIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      </Stack>

      {photo.isPrimary && (
        <Paper variant="photoBadge" elevation={0} square>
          <Typography variant="caption" color="common.white" fontWeight={600}>
            Primary
          </Typography>
        </Paper>
      )}
    </Paper>
  );
}
