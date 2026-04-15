import { Chip, Divider, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Users } from "lucide-react";
import { ROOM_STATUSES } from "../../../../constants/roomStatuses";
import type { RoomStatus } from "../../../../types/room";
import { formatPrice } from "../../../../util/formatters";

export interface RoomCardInfoProps {
  roomNumber: string;
  roomTypeName: string;
  status: RoomStatus;
  pricePerNight: number | undefined;
  capacity: number;
  currency: string;
}

export function RoomCardInfo({
  roomNumber,
  roomTypeName,
  status,
  pricePerNight,
  capacity,
  currency,
}: RoomCardInfoProps) {
  const { t } = useTranslation();
  const { label, color } = ROOM_STATUSES[status];

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={700}>
          {roomNumber}
        </Typography>
        <Chip label={label} color={color} size="small" />
      </Stack>

      <Typography variant="body2">
        {roomTypeName}
      </Typography>

      <Divider />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={0.25}>
          <Typography variant="caption" color="text.secondary">
            {t("hotelRooms.profile.pricePerNight", "Price / night")}
          </Typography>
          <Typography variant="subtitle2" fontWeight={700}>
            {pricePerNight != null ? formatPrice(pricePerNight, currency) : "—"}
          </Typography>
        </Stack>

        <Chip
          icon={<Users size={13} />}
          label={`${capacity} ${t("hotelRooms.profile.guests", "guests")}`}
          size="small"
          variant="outlined"
        />
      </Stack>
    </Stack>
  );
}
