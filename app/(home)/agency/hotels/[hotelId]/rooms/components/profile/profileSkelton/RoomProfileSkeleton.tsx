import Grid from "@mui/material/Grid";
import { RoomAmenitiesList } from "../RoomAmenitiesList";
import { RoomGallery } from "../RoomGallery";
import { RoomInfoCard } from "../RoomInfoCard";
import { RoomNotesSection } from "../RoomNotesSection";
import { RoomProfileHeader } from "../RoomProfileHeader";
import { RoomStatus } from "../../../types/room";
import { ProfileShell } from "../../../roomStyle";

interface RoomProfileSkeletonProps {
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function RoomProfileSkeleton({ onBack, onEdit, onDelete }: RoomProfileSkeletonProps) {
  return (
    <ProfileShell gap={2.5}>
      <RoomProfileHeader title="" status={RoomStatus.Available} onBack={onBack} loading />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RoomGallery photos={[]} loading />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <RoomInfoCard
            room={{ roomTypeName: "", floorNumber: 0, capacity: 0, dailyPrice: 0, weeklyPrice: 0, monthlyPrice: 0, extendPrice: 0, yearlyInsurance: 0, insurancePerReservation: 0 }}
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
    </ProfileShell>
  );
}
