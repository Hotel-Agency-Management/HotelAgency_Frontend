import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { LayoutGrid, List } from "lucide-react";
import {
  ROOM_AMENITY_CATEGORY_VALUES,
  ROOM_AMENITY_STATUS,
  type RoomAmenityFilters,
  type RoomAmenityCategory,
  type RoomAmenityStatus,
} from "../../types/roomAmenity";

interface Props {
  filters: RoomAmenityFilters;
  view: "list" | "cards";
  onFilterChange: (filters: RoomAmenityFilters) => void;
  onViewChange: (view: "list" | "cards") => void;
}

export function RoomAmenitiesToolbar({
  filters,
  view,
  onFilterChange,
  onViewChange,
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
          sx={{ minWidth: { md: 280 } }}
        />

        <TextField
          select
          size="small"
          label="Category"
          value={filters.category ?? ""}
          onChange={(event) =>
            onFilterChange({
              ...filters,
              category: (event.target.value || undefined) as
                | RoomAmenityCategory
                | undefined,
            })
          }
          sx={{ minWidth: { md: 180 } }}
        >
          <MenuItem value="">All categories</MenuItem>
          {ROOM_AMENITY_CATEGORY_VALUES.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Status"
          value={filters.status ?? ""}
          onChange={(event) =>
            onFilterChange({
              ...filters,
              status: (event.target.value || undefined) as
                | RoomAmenityStatus
                | undefined,
            })
          }
          sx={{ minWidth: { md: 160 } }}
        >
          <MenuItem value="">All statuses</MenuItem>
          <MenuItem value={ROOM_AMENITY_STATUS.ACTIVE}>Active</MenuItem>
          <MenuItem value={ROOM_AMENITY_STATUS.INACTIVE}>Inactive</MenuItem>
        </TextField>
      </Stack>

      <ToggleButtonGroup
        exclusive
        size="small"
        value={view}
        onChange={(_, nextView) => {
          if (nextView) onViewChange(nextView);
        }}
      >
        <ToggleButton value="list" aria-label="List view">
          <Tooltip title="List view">
            <List size={16} />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="cards" aria-label="Card view">
          <Tooltip title="Card view">
            <LayoutGrid size={16} />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
