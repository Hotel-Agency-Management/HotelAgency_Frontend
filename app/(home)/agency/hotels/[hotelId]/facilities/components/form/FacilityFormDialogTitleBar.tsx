import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { HotelFacility } from "../../types/facility";

interface Props {
  isEdit: boolean;
  facility: HotelFacility | null;
  onClose: () => void;
  busy: boolean;
}

export function FacilityFormDialogTitleBar({ isEdit, facility, onClose, busy }: Props) {
  const { t } = useTranslation();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <Stack spacing={0.25}>
        <Typography variant="h6" component="span">
          {isEdit ? t("facilities.form.editTitle", "Edit facility") : t("facilities.form.createTitle", "Create facility")}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="span">
          {facility?.name ?? t("facilities.form.createSubtitle", "Main information first, photos second")}
        </Typography>
      </Stack>

      <IconButton size="small" onClick={onClose} disabled={busy} aria-label="Close dialog">
        <X size={18} />
      </IconButton>
    </Stack>
  );
}
