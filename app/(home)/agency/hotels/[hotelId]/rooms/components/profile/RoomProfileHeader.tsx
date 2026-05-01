import { memo } from "react";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import {
  ProfileBackButton,
  ProfileHeaderRoot,
  ProfileHeaderTitleGroup,
  ProfileTitleSkeleton,
} from "../../roomStyle";
import { RoomStatusBadge } from "./RoomStatusBadge";
import Skeleton from "@mui/material/Skeleton";
import type { LegacyRoomStatus, RoomStatus } from "../../types/room";

export interface RoomProfileHeaderProps {
  title: string;
  status: RoomStatus | LegacyRoomStatus;
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
    <ProfileHeaderRoot
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
    >
      <ProfileHeaderTitleGroup direction="row" alignItems="center" gap={1.5}>
        <ProfileBackButton
          onClick={onBack}
          aria-label={t("hotelRooms.profile.backAria")}
          size="medium"
          color="primary"
        >
          <ArrowBackIcon />
        </ProfileBackButton>
        {loading ? (
          <ProfileTitleSkeleton variant="text" height={40} />
        ) : (
          <Typography variant="h5" component="h1" fontWeight={700} color="text.primary" noWrap>
            {title}
          </Typography>
        )}
      </ProfileHeaderTitleGroup>
      {loading ? <Skeleton variant="rounded" width={108} height={28} /> : <RoomStatusBadge status={status} />}
    </ProfileHeaderRoot>
  );
});
