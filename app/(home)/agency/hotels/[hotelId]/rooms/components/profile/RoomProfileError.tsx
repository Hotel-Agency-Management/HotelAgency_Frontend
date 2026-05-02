import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import { ProfileErrorShell } from "../../StyledComponents";

interface RoomProfileErrorProps {
  error: unknown;
}

export function RoomProfileError({ error }: RoomProfileErrorProps) {
  const { t } = useTranslation();
  return (
    <ProfileErrorShell>
      <Alert severity="error">
        {error instanceof Error ? error.message : t("hotelRooms.profile.loadError")}
      </Alert>
    </ProfileErrorShell>
  );
}
