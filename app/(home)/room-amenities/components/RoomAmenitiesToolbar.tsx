import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type { RoomAmenityFilters } from "../types/roomAmenity";

interface Props {
  filters: RoomAmenityFilters;
  onFilterChange: (filters: RoomAmenityFilters) => void;
}

export function RoomAmenitiesToolbar({
  filters,
  onFilterChange,
}: Props) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      alignItems={{ md: "center" }}
      justifyContent="space-between"
    >
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          size="small"
          placeholder="Search amenities"
          value={filters.search ?? ""}
          onChange={(event) =>
            onFilterChange({ ...filters, search: event.target.value || undefined })
          }
          sx={{ minWidth: { md: 380 } }}
        />
      </Stack>
    </Stack>
  );
}
