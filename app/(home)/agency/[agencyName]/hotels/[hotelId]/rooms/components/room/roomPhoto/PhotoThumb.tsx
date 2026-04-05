import { Paper, CardMedia, Stack, Tooltip, IconButton, Typography } from "@mui/material";
import { RoomPhoto } from "../../../types/room";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
export function PhotoThumb({
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
