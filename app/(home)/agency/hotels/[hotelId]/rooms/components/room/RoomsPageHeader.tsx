import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  onOpenAddDialog: () => void;
};

export function RoomsPageHeader({ onOpenAddDialog }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Typography variant="h5" fontWeight={700} component="h2">
        Rooms Management
      </Typography>

      <Button
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        onClick={onOpenAddDialog}
      >
        Add Room
      </Button>
    </Stack>
  );
}
