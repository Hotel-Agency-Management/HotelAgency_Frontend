import { IconButton, Stack, Tooltip } from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface RoomCardActionsProps {
  roomId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function RoomCardActions({ roomId, onEdit, onDelete }: RoomCardActionsProps) {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      <Tooltip title={t("hotelRooms.grid.editRoom", "Edit room")}>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(roomId);
          }}
          aria-label={t("hotelRooms.grid.editRoom", "Edit room")}
        >
          <Edit size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("hotelRooms.grid.deleteRoom", "Delete room")}>
        <IconButton
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(roomId);
          }}
          aria-label={t("hotelRooms.grid.deleteRoom", "Delete room")}
        >
          <Trash2 size={18} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
