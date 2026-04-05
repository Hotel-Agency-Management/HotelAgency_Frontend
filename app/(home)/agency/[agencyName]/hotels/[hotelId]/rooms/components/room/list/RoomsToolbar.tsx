import { Stack, TextField, MenuItem, ToggleButtonGroup, ToggleButton, Tooltip } from "@mui/material";
import { ROOM_STATUSES } from "../../../constants/roomStatuses";
import { RoomFilters, RoomStatus } from "../../../types/room";
import { RoomType } from "../../../types/roomType";
import { LayoutGrid, List } from "lucide-react";

interface Props {
  filters: RoomFilters;
  roomTypes?: RoomType[];
  onFilterChange: (filters: RoomFilters) => void;
  onAddRoom: () => void;
  view: "list" | "grid";
  onViewChange: (view: "list" | "grid") => void;
}

export const RoomsToolbar = ({
  filters,
  roomTypes = [],
  onFilterChange,
  view,
  onViewChange,
}: Props) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Search room..."
          value={filters.search ?? ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              search: e.target.value,
            })
          }
          sx={{ width: 400 }}
        />

        <TextField
          select
          size="small"
          value={filters.status ?? ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              status: (e.target.value as RoomStatus) || undefined,
            })
          }
          sx={{ width: 150 }}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              const value = selected as string;
              if (!value) {
                return <span style={{ opacity: 0.7 }}>Status</span>;
              }
              return ROOM_STATUSES[value as keyof typeof ROOM_STATUSES]?.label ?? value;
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          {Object.entries(ROOM_STATUSES).map(([key, { label }]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          value={filters.roomTypeId ?? ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              roomTypeId: e.target.value || undefined,
            })
          }
          sx={{ width: 150 }}
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              const value = selected as string;
              if (!value) {
                return <span style={{ opacity: 0.7 }}>Type</span>;
              }
              return roomTypes.find((roomType) => roomType.id === value)?.name ?? value;
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          {roomTypes.map((roomType) => (
            <MenuItem key={roomType.id} value={roomType.id}>
              {roomType.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, newView) => {
            if (newView !== null) onViewChange(newView);
          }}
          size="small"
        >
          <ToggleButton value="list">
            <Tooltip title="List view" placement="top">
              <List size={15} />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="grid">
            <Tooltip title="Grid view" placement="top">
              <LayoutGrid size={15} />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};
