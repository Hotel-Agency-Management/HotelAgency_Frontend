import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Edit, Trash2 } from "lucide-react";

interface Props {
  facilityId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FacilityCardActions({ facilityId, onEdit, onDelete }: Props) {
  return (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      <Tooltip title="Edit facility">
        <IconButton
          size="small"
          aria-label="Edit facility"
          onClick={(event) => {
            event.stopPropagation();
            onEdit(facilityId);
          }}
        >
          <Edit size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete facility">
        <IconButton
          size="small"
          color="error"
          aria-label="Delete facility"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(facilityId);
          }}
        >
          <Trash2 size={18} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
