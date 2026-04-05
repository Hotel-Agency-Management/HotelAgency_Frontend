import { IconButton, Stack } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  id: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const RoomQuickActions = ({ id, onEdit, onDelete }: Props) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <IconButton
        size="small"
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
