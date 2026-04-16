import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link2, Pencil, Trash2 } from "lucide-react";
import {
  ROOM_AMENITY_STATUS,
  type RoomAmenity,
  type RoomAmenityPhoto,
} from "../../../types/roomAmenity";

interface Props {
  amenity: RoomAmenity;
  onEdit: (amenity: RoomAmenity) => void;
  onDelete: (amenity: RoomAmenity) => void;
  onAssign: (amenity: RoomAmenity) => void;
}

function getPrimaryPhoto(photos: RoomAmenityPhoto[]) {
  return photos.find((photo) => photo.isPrimary) ?? photos[0] ?? null;
}

export function RoomAmenityCard({ amenity, onEdit, onDelete, onAssign }: Props) {
  const isActive = amenity.status === ROOM_AMENITY_STATUS.ACTIVE;
  const primaryPhoto = getPrimaryPhoto(amenity.photos);

  return (
    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {primaryPhoto ? (
        <CardMedia
          component="img"
          image={primaryPhoto.url}
          alt={amenity.label}
          sx={{ height: 150, objectFit: "cover" }}
        />
      ) : (
        <Box
          sx={{
            height: 150,
            bgcolor: "action.hover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No photo
          </Typography>
        </Box>
      )}

      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Stack minWidth={0}>
              <Typography variant="subtitle1" fontWeight={700} noWrap>
                {amenity.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {amenity.key}
              </Typography>
            </Stack>

            <Chip
              label={isActive ? "Active" : "Inactive"}
              color={isActive ? "success" : "default"}
              size="small"
            />
          </Stack>

          <Chip label={amenity.category} size="small" variant="outlined" sx={{ alignSelf: "flex-start" }} />

          <Typography variant="body2" color="text.secondary">
            {amenity.description}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", gap: 0.5 }}>
        <Tooltip title="Assign to rooms">
          <IconButton
            size="small"
            aria-label="Assign to rooms"
            onClick={() => onAssign(amenity)}
            sx={{ width: 32, height: 32 }}
          >
            <Link2 size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit amenity">
          <IconButton
            size="small"
            aria-label="Edit amenity"
            onClick={() => onEdit(amenity)}
            sx={{ width: 32, height: 32 }}
          >
            <Pencil size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete amenity">
          <IconButton
            size="small"
            color="error"
            aria-label="Delete amenity"
            onClick={() => onDelete(amenity)}
            sx={{ width: 32, height: 32 }}
          >
            <Trash2 size={16} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
