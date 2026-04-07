import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { RoomStatusBadge } from "./RoomStatusBadge";
import type { RoomStatus } from "../../types/room";

export interface RoomProfileHeaderProps {
  title: string;
  status: RoomStatus;
  onBack: () => void;
  loading?: boolean;
}

export const RoomProfileHeader = memo(function RoomProfileHeader({
  title,
  status,
  onBack,
  loading,
}: RoomProfileHeaderProps) {
  const { t } = useTranslation();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      sx={{ borderBottom: 1, borderColor: "divider"}}
    >
      <Stack direction="row" alignItems="center" gap={1.5} sx={{ minWidth: 0, flex: 1 }}>
        <IconButton
          onClick={onBack}
          aria-label={t("hotelRooms.profile.backAria")}
          size="medium"
          color="primary"
          sx={{ flexShrink: 0 }}
        >
          <ArrowBackIcon />
        </IconButton>
        {loading ? (
          <Skeleton variant="text" sx={{ flex: 1, maxWidth: 320 }} height={40} />
        ) : (
          <Typography variant="h5" component="h1" fontWeight={700} color="text.primary" noWrap>
            {title}
          </Typography>
        )}
      </Stack>
      {loading ? <Skeleton variant="rounded" width={108} height={28} /> : <RoomStatusBadge status={status} />}
    </Stack>
  );
});
