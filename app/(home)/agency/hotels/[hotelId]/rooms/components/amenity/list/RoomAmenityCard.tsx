import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button size="small" onClick={() => onAssign(amenity)}>
          Assign to rooms
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(amenity)}>
          Delete
        </Button>
        <Button size="small" variant="outlined" onClick={() => onEdit(amenity)}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
