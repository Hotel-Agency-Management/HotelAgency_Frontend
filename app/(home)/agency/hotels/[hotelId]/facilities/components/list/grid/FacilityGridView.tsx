import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { StaggerGroup, StaggerItem } from "@/components/animation/StaggerGroup";
import type { HotelFacility } from "../../../types/facility";
import { FacilityCard } from "./FacilityCard";
import { FacilityGridLoading } from "./facilityGridViewStyles";

interface Props {
  facilities: HotelFacility[];
  isLoading: boolean;
  onEditFacility: (id: string) => void;
  onDeleteFacility: (id: string) => void;
}

export function FacilityGridView({
  facilities,
  isLoading,
  onEditFacility,
  onDeleteFacility,
}: Props) {
  if (isLoading) {
    return (
      <FacilityGridLoading>
        <CircularProgress disableShrink />
      </FacilityGridLoading>
    );
  }

  if (facilities.length === 0) {
    return (
      <FacilityGridLoading>
        <Typography color="text.secondary">No facilities match your filters.</Typography>
      </FacilityGridLoading>
    );
  }

  return (
    <StaggerGroup staggerDelay={0.06} direction="up" distance={20} style={{ width: "100%" }}>
      <Grid container spacing={2}>
        {facilities.map((facility) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={facility.id}>
            <StaggerItem>
              <FacilityCard
                facility={facility}
                onEdit={onEditFacility}
                onDelete={onDeleteFacility}
              />
            </StaggerItem>
          </Grid>
        ))}
      </Grid>
    </StaggerGroup>
  );
}
