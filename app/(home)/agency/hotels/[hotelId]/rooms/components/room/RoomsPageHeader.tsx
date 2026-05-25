import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";

type Props = {
  onOpenAddDialog: () => void;
};

export function RoomsPageHeader({ onOpenAddDialog }: Props) {
  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Typography variant="h5" fontWeight={700} component="h2">
        {t("hotelRooms.page.title", "Rooms Management")}
      </Typography>

      <Button
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        onClick={onOpenAddDialog}
      >
        {t("hotelRooms.page.addRoom", "Add Room")}
      </Button>
    </Stack>
  );
}
