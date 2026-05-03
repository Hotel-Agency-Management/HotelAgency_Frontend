import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { TFunction } from "i18next";
import Icon from "@/components/icon/Icon";
import { InfoCardRoot } from "../../roomStyle";

type InfoRow = [string, string];

export function RoomInfoCardFilled({
  t,
  roomTypeName,
  rows,
  onEdit,
  onDelete,
}: {
  t: TFunction;
  roomTypeName: string;
  rows: InfoRow[];
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <InfoCardRoot variant="card">
      <Stack gap={1.75}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
          <Stack direction="row" gap={1} alignItems="center">
            <Icon icon="lucide:bed-double" fontSize="small" />
            <Typography variant="subtitle2" color="text.secondary">
              {t("hotelRooms.profile.type")}
            </Typography>
          </Stack>
          <Typography variant="body1" fontWeight={700} color="text.primary">
            {roomTypeName}
          </Typography>
        </Stack>
        {rows.map(([label, val]) => (
          <Stack key={label} direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2">
              {label}
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary" textAlign="right">
              {val}
            </Typography>
          </Stack>
        ))}
        <Stack direction="row" gap={1}>
          <Button fullWidth variant="contained" color="primary" onClick={onEdit}>
            {t("hotelRooms.profile.edit")}
          </Button>
          <Button fullWidth variant="outlined" color="secondary" onClick={onDelete}>
            {t("hotelRooms.profile.delete")}
          </Button>
        </Stack>
      </Stack>
    </InfoCardRoot>
  );
}
