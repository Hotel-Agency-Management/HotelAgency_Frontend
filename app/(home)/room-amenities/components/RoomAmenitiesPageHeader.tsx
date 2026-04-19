import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus } from "lucide-react";

interface Props {
  count: number;
  isLoading: boolean;
  onAdd: () => void;
}

export function RoomAmenitiesPageHeader({ count, isLoading, onAdd }: Props) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <Stack spacing={0.5}>
        <Typography variant="h6" fontWeight={700}>
          Room amenities
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage room amenity titles.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {isLoading ? "Loading amenities..." : `${count} amenities configured`}
        </Typography>
      </Stack>

      <Button variant="contained" startIcon={<Plus size={16} />} onClick={onAdd}>
        Add amenity
      </Button>
    </Stack>
  );
}
