import { Stack, MenuItem, ToggleButtonGroup, ToggleButton, Tooltip } from "@mui/material";
import type { ReactNode } from "react";
import { ROOM_STATUSES } from "../../../constants/roomStatuses";
import { RoomFilters, RoomStatus } from "../../../types/room";
import { LayoutGrid, List } from "lucide-react";
import { ToolbarPlaceholder, ToolbarSearchField, ToolbarStatusField } from "../../../roomStyle";

interface Props {
  filters: RoomFilters;
  onFilterChange: (filters: RoomFilters) => void;
  onAddRoom: () => void;
  view: "list" | "cards";
  onViewChange: (view: "list" | "cards") => void;
}

export const RoomsToolbar = ({
  filters,
  onFilterChange,
  view,
  onViewChange,
}: Props) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <ToolbarSearchField
          size="small"
          placeholder="Search room..."
          value={filters.search ?? ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              search: e.target.value,
            })
          }
        />

        <ToolbarStatusField
          select
          size="small"
          value={filters.status ?? ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              status: (e.target.value as RoomStatus) || undefined,
            })
          }
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              const value = selected as string;
              if (!value) {
                return <TextFieldPlaceholder>Status</TextFieldPlaceholder>;
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
        </ToolbarStatusField>

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
          <ToggleButton value="cards">
            <Tooltip title="Grid view" placement="top">
              <LayoutGrid size={15} />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};

function TextFieldPlaceholder({ children }: { children: ReactNode }) {
  return (
    <ToolbarPlaceholder>
      {children}
    </ToolbarPlaceholder>
  );
}
