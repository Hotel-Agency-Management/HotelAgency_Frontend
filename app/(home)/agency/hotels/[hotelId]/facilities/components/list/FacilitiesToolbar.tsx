import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { LayoutGrid, List } from "lucide-react";
import { FACILITY_STATUSES } from "../../constants/facilityStatuses";
import { FACILITY_TYPES } from "../../constants/facilityTypes";
import type { FacilityFilters, FacilityStatus } from "../../types/facility";
import { Box } from "@mui/material";

interface Props {
  filters: FacilityFilters;
  view: "list" | "cards";
  onFilterChange: (filters: FacilityFilters) => void;
  onViewChange: (view: "list" | "cards") => void;
}

export function FacilitiesToolbar({
  filters,
  view,
  onFilterChange,
  onViewChange,
}: Props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <TextField
          sx={{ minWidth: 280 }}
          size="small"
          placeholder="Search facility..."
          value={filters.search ?? ""}
          onChange={(event) =>
            onFilterChange({
              ...filters,
              search: event.target.value,
            })
          }
        />

        <TextField
          select
          size="small"
          value={filters.status ?? ""}
          onChange={(event) =>
            onFilterChange({
              ...filters,
              status: (event.target.value as FacilityStatus) || undefined,
            })
          }
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              const value = selected as string;
              if (!value) return <span style={{ opacity: 0.7 }}>Status</span>;
              return FACILITY_STATUSES[value as FacilityStatus]?.label ?? value;
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          {Object.entries(FACILITY_STATUSES).map(([value, { label }]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          value={filters.facilityType ?? ""}
          onChange={(event) =>
            onFilterChange({
              ...filters,
              facilityType: event.target.value || undefined,
            })
          }
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected) => {
              const value = selected as string;
              return value || <Box component="span" sx={{ opacity: 0.7 }}>Type</Box>
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          {FACILITY_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, nextView) => {
          if (nextView !== null) onViewChange(nextView);
        }}
        size="small"
      >
        <ToggleButton value="list">
          <Tooltip title="List view" placement="top">
            <List size={15} />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="cards">
          <Tooltip title="Cards view" placement="top">
            <LayoutGrid size={15} />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
