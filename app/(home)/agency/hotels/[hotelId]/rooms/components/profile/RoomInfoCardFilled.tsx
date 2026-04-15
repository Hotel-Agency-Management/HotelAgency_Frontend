import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { TFunction } from "i18next";
import Icon from "@/components/icon/Icon";
import { ROOM_TYPES } from "../../constants/roomTypes";
import type { RoomProfile } from "./types";

type InfoRow = [string, string];
type TypeMeta = (typeof ROOM_TYPES)[keyof typeof ROOM_TYPES];

export function RoomInfoCardFilled({
  t,
  room,
  rows,
  tm,
  onEdit,
  onDelete,
}: {
  t: TFunction;
  room: Pick<RoomProfile, "starRating">;
  rows: InfoRow[];
  tm: TypeMeta;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Paper variant="card" sx={{ height: "100%", width: 1 }}>
      <Stack gap={1.75}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
          <Stack direction="row" gap={1} alignItems="center">
            <Icon icon={tm.icon} fontSize="small" />
            <Typography variant="subtitle2" color="text.secondary">
              {t("hotelRooms.profile.type")}
            </Typography>
          </Stack>
          <Typography variant="body1" fontWeight={700} color="text.primary">
            {tm.label}
          </Typography>
        </Stack>
        {rows.map(([label, val]) => (
          <Stack key={label} direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary" textAlign="right">
              {val}
            </Typography>
          </Stack>
        ))}
        <Stack gap={0.5}>
          <Typography variant="body2" color="text.secondary">
            {t("hotelRooms.profile.stars")}
          </Typography>
          <Rating
            value={room.starRating}
            readOnly
            size="small"
            sx={(theme) => ({
              "& .MuiRating-iconFilled": { color: theme.palette.primary.main },
              "& .MuiRating-iconEmpty": { color: theme.palette.secondary.main },
            })}
          />
        </Stack>
        <Stack direction="row" gap={1}>
          <Button fullWidth variant="contained" color="primary" onClick={onEdit}>
            {t("hotelRooms.profile.edit")}
          </Button>
          <Button fullWidth variant="outlined" color="secondary" onClick={onDelete}>
            {t("hotelRooms.profile.delete")}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
