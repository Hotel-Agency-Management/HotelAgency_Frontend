import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";

interface Props {
  onOpenAddDialog: () => void;
}

export function FacilitiesPageHeader({ onOpenAddDialog }: Props) {
  const { t } = useTranslation();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <Stack spacing={0.5}>
        <Typography variant="h5" fontWeight={700} component="h2">
          {t("facilities.title", "Hotel facilities")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("facilities.subtitle", "Manage guest-facing spaces, services, availability, and photos.")}
        </Typography>
      </Stack>

      <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={onOpenAddDialog}>
        {t("facilities.addFacility", "Add facility")}
      </Button>
    </Stack>
  );
}
