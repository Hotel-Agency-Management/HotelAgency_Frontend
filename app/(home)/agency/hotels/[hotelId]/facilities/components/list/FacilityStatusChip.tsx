import Chip from "@mui/material/Chip";
import { FACILITY_STATUSES } from "../../constants/facilityStatuses";
import type { FacilityStatus } from "../../types/facility";

interface Props {
  status: FacilityStatus;
}

export function FacilityStatusChip({ status }: Props) {
  const { label, color } = FACILITY_STATUSES[status];

  return <Chip label={label} color={color} size="small" />;
}
