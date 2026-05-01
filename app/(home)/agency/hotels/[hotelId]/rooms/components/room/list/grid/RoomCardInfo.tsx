import { Chip, Divider, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Users } from "lucide-react";
import { ROOM_STATUSES } from "../../../../constants/roomStatuses";
import type { LegacyRoomStatus, RoomStatus } from "../../../../types/room";
import { formatPrice } from "../../../../util/formatters";

export interface RoomCardInfoProps {
  roomNumber: string;
  roomTypeName: string;
  floorNumber?: number;
  status: RoomStatus | LegacyRoomStatus;
  pricePerNight?: number;
  capacity?: number;
  currency?: string;
}

export function RoomCardInfo({
  roomNumber,
  roomTypeName,
  floorNumber,
  status,
  pricePerNight,
  capacity,
  currency = "USD",
}: RoomCardInfoProps) {
  const { t } = useTranslation();
  const { label, color } = ROOM_STATUSES[status] ?? { label: status, color: "default" as const };
  const hasPricing = pricePerNight != null || capacity != null;

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={700}>
          {roomNumber}
        </Typography>
        <Chip label={label} color={color} size="small" />
      </Stack>

      <Typography variant="body2" color="text.secondary">
        {roomTypeName}
      </Typography>

      <Divider />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {hasPricing ? (
          <>
            <Stack spacing={0.25}>
              <Typography variant="caption" color="text.secondary">
                {t("hotelRooms.profile.pricePerNight", "Price / night")}
              </Typography>
              <Typography variant="subtitle2" fontWeight={700}>
                {pricePerNight != null ? formatPrice(pricePerNight, currency) : "—"}
              </Typography>
            </Stack>
            {capacity != null ? (
              <Chip
                icon={<Users size={13} />}
                label={`${capacity} ${t("hotelRooms.profile.guests", "guests")}`}
                size="small"
                variant="outlined"
              />
            ) : null}
          </>
        ) : (
          <>
            <Typography variant="caption" color="text.secondary">
              {t("hotelRooms.profile.floor", "Floor")}
            </Typography>
            <Typography variant="subtitle2" fontWeight={700}>
              {floorNumber ?? "—"}
            </Typography>
          </>
        )}
      </Stack>
    </Stack>
  );
}
