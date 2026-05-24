import { IconButton, Stack } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  id: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const RoomQuickActions = ({ id, onEdit, onDelete }: Props) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={0.5}>
      <IconButton
        size="small"
        aria-label={t("hotelRooms.grid.editRoom", "Edit room")}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(id);
        }}
      >
        <Pencil size={16} />
      </IconButton>

      <IconButton
        size="small"
        color="error"
        aria-label={t("hotelRooms.grid.deleteRoom", "Delete room")}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
      >
        <Trash2 size={16} />
      </IconButton>
    </Stack>
  );
};
