import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { RoomAmenitiesList } from "../RoomAmenitiesList";
import { RoomGallery } from "../RoomGallery";
import { RoomInfoCard } from "../RoomInfoCard";
import { RoomNotesSection } from "../RoomNotesSection";
import { RoomProfileHeader } from "../RoomProfileHeader";
import { BED_TYPE, ROOM_STATUS } from "../../../types/room";

interface RoomProfileSkeletonProps {
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function RoomProfileSkeleton({ onBack, onEdit, onDelete }: RoomProfileSkeletonProps) {
  return (
    <Stack gap={2.5} sx={{ width: 1, maxWidth: 1120, mx: "auto" }}>
      <RoomProfileHeader title="" status={ROOM_STATUS.AVAILABLE} onBack={onBack} loading />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RoomGallery photos={[]} loading />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <RoomInfoCard
            room={{ type: "single", floorNumber: 0, capacity: 0, bedType: BED_TYPE.SINGLE, pricePerNight: undefined, starRating: 0 }}
            onEdit={onEdit}
            onDelete={onDelete}
            loading
          />
        </Grid>
        <Grid size={12}>
          <RoomAmenitiesList amenities={[]} loading />
        </Grid>
        <Grid size={12}>
          <RoomNotesSection loading />
        </Grid>
      </Grid>
    </Stack>
  );
}
