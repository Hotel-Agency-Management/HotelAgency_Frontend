import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

interface RoomProfileErrorProps {
  error: unknown;
}

export function RoomProfileError({ error }: RoomProfileErrorProps) {
  const { t } = useTranslation();
  return (
    <Stack sx={{ maxWidth: 1120, mx: "auto", width: 1 }}>
      <Alert severity="error">
        {error instanceof Error ? error.message : t("hotelRooms.profile.loadError")}
      </Alert>
    </Stack>
  );
}
