import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Clock3 } from "lucide-react";
import { FACILITY_STATUSES } from "../../../constants/facilityStatuses";
import type { FacilityStatus } from "../../../types/facility";
import { FacilityDescription } from "./facilityGridViewStyles";

interface Props {
  name: string;
  facilityType: string;
  description: string;
  status: FacilityStatus;
  openAt: string;
  closeAt: string;
}

export function FacilityCardInfo({
  name,
  facilityType,
  description,
  status,
  openAt,
  closeAt,
}: Props) {
  const { label, color } = FACILITY_STATUSES[status];

  return (
    <Stack spacing={1.25}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Stack spacing={0.25}>
          <Typography variant="subtitle1" fontWeight={700}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {facilityType}
          </Typography>
        </Stack>
        <Chip label={label} color={color} size="small" />
      </Stack>

      <FacilityDescription>{description}</FacilityDescription>

      <Divider />

      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography variant="caption" color="text.secondary">
          Working hours
        </Typography>
        <Chip
          icon={<Clock3 size={13} />}
          label={`${openAt.slice(0, 5)} - ${closeAt.slice(0, 5)}`}
          size="small"
          variant="outlined"
          color="primary"
        />
      </Stack>
    </Stack>
  );
}
