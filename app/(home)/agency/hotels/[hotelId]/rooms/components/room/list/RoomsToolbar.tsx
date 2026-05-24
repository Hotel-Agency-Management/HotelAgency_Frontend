import {
  MenuItem,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import type { ReactNode } from "react";
import {
  getRoomStatusLabel,
  ROOM_STATUSES,
} from "../../../constants/roomStatuses";
import { RoomFilters, RoomStatus } from "../../../types/room";
import { LayoutGrid, List } from "lucide-react";
import {
  ToolbarPlaceholder,
  ToolbarSearchField,
  ToolbarStatusField,
} from "../../../roomStyle";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <ToolbarSearchField
          size="small"
          placeholder={t(
            "hotelRooms.toolbar.searchPlaceholder",
            "Search room...",
          )}
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
                return (
                  <TextFieldPlaceholder>
                    {t("hotelRooms.toolbar.status", "Status")}
                  </TextFieldPlaceholder>
                );
              }
              return getRoomStatusLabel(t, value);
            },
          }}
        >
          <MenuItem value="">{t("hotelRooms.toolbar.all", "All")}</MenuItem>
          {Object.entries(ROOM_STATUSES).map(([key, { label }]) => (
            <MenuItem key={key} value={key}>
              {getRoomStatusLabel(t, key, label)}
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
            <Tooltip
              title={t("hotelRooms.toolbar.listView", "List view")}
              placement="top"
            >
              <List size={15} />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="cards">
            <Tooltip
              title={t("hotelRooms.toolbar.gridView", "Grid view")}
              placement="top"
            >
              <LayoutGrid size={15} />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};

function TextFieldPlaceholder({ children }: { children: ReactNode }) {
  return <ToolbarPlaceholder>{children}</ToolbarPlaceholder>;
}
