import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Edit, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  facilityId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FacilityCardActions({ facilityId, onEdit, onDelete }: Props) {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      <Tooltip title={t("facilities.actions.editFacility", "Edit facility")}>
        <IconButton
          size="small"
          aria-label={t("facilities.actions.editFacility", "Edit facility")}
          onClick={(event) => {
            event.stopPropagation();
            onEdit(facilityId);
          }}
        >
          <Edit size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("facilities.actions.deleteFacility", "Delete facility")}>
        <IconButton
          size="small"
          color="error"
          aria-label={t("facilities.actions.deleteFacility", "Delete facility")}
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
