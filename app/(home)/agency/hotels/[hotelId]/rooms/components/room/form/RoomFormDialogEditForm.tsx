import {
  Button,
  CircularProgress,
  DialogContent,
  Stack,
} from "@mui/material";
import { TFunction } from "i18next";
import { RoomType } from "../../../../../../../room-types/types/roomType";
import { DialogActionsRoot } from "../../../roomStyle";
import { RoomAmenitiesPicker } from "./RoomAmenitiesPicker";
import { RoomFormFields } from "./RoomFormFields";

interface Props {
  roomTypes: RoomType[];
  onClose: () => void;
  onSubmit: () => void;
  isSaving: boolean;
  t: TFunction;
}

export function RoomFormDialogEditForm({
  roomTypes,
  onClose,
  onSubmit,
  isSaving,
  t,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      <DialogContent dividers>
        <Stack spacing={3}>
          <RoomFormFields roomTypes={roomTypes} section="details" />
          <RoomFormFields roomTypes={roomTypes} section="pricing" />
          <RoomFormFields roomTypes={roomTypes} section="notes" />
          <RoomAmenitiesPicker />
        </Stack>
      </DialogContent>

      <DialogActionsRoot>
        <Button onClick={onClose} disabled={isSaving}>
          {t("hotelRooms.dialog.cancel", { defaultValue: "Cancel" })}
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSaving}
          startIcon={isSaving ? <CircularProgress size={16} /> : null}
        >
          {t("hotelRooms.dialog.saveChanges", { defaultValue: "Save Changes" })}
        </Button>
      </DialogActionsRoot>
    </form>
  );
}
