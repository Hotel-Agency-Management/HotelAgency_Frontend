import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  onOpenAddDialog: () => void;
}

export function FacilitiesPageHeader({ onOpenAddDialog }: Props) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <Stack spacing={0.5}>
        <Typography variant="h5" fontWeight={700} component="h2">
          Hotel facilities
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage guest-facing spaces, services, availability, and photos.
        </Typography>
      </Stack>

      <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={onOpenAddDialog}>
        Add facility
      </Button>
    </Stack>
  );
}
