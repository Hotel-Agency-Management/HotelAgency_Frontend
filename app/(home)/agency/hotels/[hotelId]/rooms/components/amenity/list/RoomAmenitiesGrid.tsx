import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import type { RoomAmenity } from "../../../types/roomAmenity";
import { RoomAmenityCard } from "./RoomAmenityCard";

interface Props {
  amenities: RoomAmenity[];
  isLoading: boolean;
  onEdit: (amenity: RoomAmenity) => void;
  onDelete: (amenity: RoomAmenity) => void;
  onAssign: (amenity: RoomAmenity) => void;
}

export function RoomAmenitiesGrid({ amenities, isLoading, onEdit, onDelete, onAssign }: Props) {
  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <Skeleton variant="rounded" height={220} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (amenities.length === 0) {
    return <Typography color="text.secondary">No room amenities match your filters.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {amenities.map((amenity) => (
        <Grid key={amenity.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <RoomAmenityCard
            amenity={amenity}
            onEdit={onEdit}
            onDelete={onDelete}
            onAssign={onAssign}
          />
        </Grid>
      ))}
    </Grid>
  );
}
