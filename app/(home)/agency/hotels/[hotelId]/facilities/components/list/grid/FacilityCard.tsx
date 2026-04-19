import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import type { HotelFacility } from "../../../types/facility";
import { FacilityCardActions } from "./FacilityCardActions";
import { FacilityCardImage } from "./FacilityCardImage";
import { FacilityCardInfo } from "./FacilityCardInfo";

interface Props {
  facility: HotelFacility;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FacilityCard({ facility, onEdit, onDelete }: Props) {
  return (
    <Card variant="outlined">
      <Stack spacing={2}>
        <FacilityCardImage photos={facility.photos} title={facility.name} />
        <Stack spacing={2} sx={{ px: 2, pb: 2 }}>
          <FacilityCardInfo
            name={facility.name}
            facilityType={facility.facilityType}
            description={facility.description}
            status={facility.status}
            openAt={facility.openAt}
            closeAt={facility.closeAt}
          />
          <FacilityCardActions
            facilityId={facility.id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Stack>
      </Stack>
    </Card>
  );
}
