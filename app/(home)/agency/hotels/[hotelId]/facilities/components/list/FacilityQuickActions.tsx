import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  id: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FacilityQuickActions({ id, onEdit, onDelete }: Props) {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={0.5}>
      <Tooltip title={t("facilities.actions.editFacility", "Edit facility")}>
        <IconButton
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            onEdit(id);
          }}
        >
          <Pencil size={16} />
        </IconButton>
      </Tooltip>

      <Tooltip title={t("facilities.actions.deleteFacility", "Delete facility")}>
        <IconButton
          size="small"
          color="error"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(id);
          }}
        >
          <Trash2 size={16} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
