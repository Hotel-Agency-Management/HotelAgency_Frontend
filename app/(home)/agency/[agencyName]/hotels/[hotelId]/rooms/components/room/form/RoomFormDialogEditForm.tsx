import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { TFunction } from "i18next";
import { RoomFormValues } from "../../../schema/roomSchema";
import { Room } from "../../../types/room";
import { RoomType } from "../../../types/roomType";
import { RoomAmenitiesPicker } from "./RoomAmenitiesPicker";
import { RoomFormFields } from "./RoomFormFields";
import { RoomPhotosUpload } from "./RoomPhotosUpload";

interface Props {
  methods: UseFormReturn<RoomFormValues>;
  roomTypes: RoomType[];
  room: Room;
  onClose: () => void;
  onSubmit: (values: RoomFormValues) => void;
  isCreating: boolean;
  isUpdating: boolean;
  t: TFunction;
}

export function RoomFormDialogEditForm({
  methods,
  roomTypes,
  room,
  onClose,
  onSubmit,
  isCreating,
  isUpdating,
  t,
}: Props) {
  const { handleSubmit } = methods;
  const pending = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers>
        <Stack spacing={3}>
          <RoomFormFields roomTypes={roomTypes} />
          <RoomAmenitiesPicker />
          <RoomPhotosUpload roomId={room.id} existingPhotos={room.photos} />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={pending}>
          {t("hotelRooms.dialog.cancel", { defaultValue: "Cancel" })}
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={pending}
          startIcon={pending ? <CircularProgress size={16} /> : null}
        >
          {t("hotelRooms.dialog.saveChanges", { defaultValue: "Save Changes" })}
        </Button>
      </DialogActions>
    </form>
  );
}
