import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TFunction } from "i18next";
import type { RoomResponse } from "../../../types/room";

interface Props {
  isEdit: boolean;
  room: RoomResponse | null | undefined;
  onClose: () => void;
  busy: boolean;
  t: TFunction;
}

export function RoomFormDialogTitleBar({
  isEdit,
  room,
  onClose,
  busy,
  t,
}: Props) {
  const title = isEdit
    ? t("hotelRooms.dialog.editTitle", {
        defaultValue: "Edit Room — #{{number}}",
        number: room?.roomNumber ?? "",
      })
    : t("hotelRooms.dialog.addTitle", { defaultValue: "Add New Room" });

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h6">{title}</Typography>
      <IconButton onClick={onClose} disabled={busy} size="small" aria-label="close">
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}
