import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { TFunction } from "i18next";
import { RoomPhoto } from "../../../types/room";
import { RoomType } from "../../../../../../../room-types/types/roomType";
import { RoomAmenitiesPicker } from "./RoomAmenitiesPicker";
import { RoomFormFields } from "./RoomFormFields";
import { RoomPhotosUpload } from "./RoomPhotosUpload";

interface Props {
  activeStep: number;
  stepLabels: string[];
  roomTypes: RoomType[];
  createdRoomId: string | null;
  createFlowPhotos: RoomPhoto[];
  onPhotosChange: (photos: RoomPhoto[]) => void;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  onFinish: () => void;
  isCreating: boolean;
  isUpdating: boolean;
  isSavingPhotos: boolean;
  t: TFunction;
}

export function RoomFormDialogCreateFlow({
  activeStep,
  stepLabels,
  roomTypes,
  createdRoomId,
  createFlowPhotos,
  onPhotosChange,
  onClose,
  onNext,
  onBack,
  onFinish,
  isCreating,
  isUpdating,
  isSavingPhotos,
  t,
}: Props) {
  const stepBusy = isCreating || isUpdating;

  return (
    <>
      <DialogContent dividers>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {stepLabels.map((label, index) => (
            <Step key={`${label}-${index}`}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Stack spacing={3}>
            <RoomFormFields roomTypes={roomTypes} />
            <RoomAmenitiesPicker />
          </Stack>
        )}

        {activeStep === 1 && createdRoomId ? (
          <RoomPhotosUpload
            roomId={createdRoomId}
            existingPhotos={createFlowPhotos}
            onPhotosChange={onPhotosChange}
          />
        ) : null}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={stepBusy || isSavingPhotos}>
          {t("hotelRooms.dialog.cancel", { defaultValue: "Cancel" })}
        </Button>

        {activeStep === 0 ? (
          <Button
            type="button"
            variant="contained"
            onClick={onNext}
            disabled={stepBusy}
            startIcon={stepBusy ? <CircularProgress size={16} /> : null}
          >
            {t("hotelRooms.dialog.next", { defaultValue: "Next" })}
          </Button>
        ) : (
          <>
            <Button type="button" onClick={onBack} disabled={isSavingPhotos}>
              {t("hotelRooms.dialog.back", { defaultValue: "Back" })}
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={onFinish}
              disabled={isSavingPhotos}
              startIcon={isSavingPhotos ? <CircularProgress size={16} /> : null}
            >
              {t("hotelRooms.dialog.finish", { defaultValue: "Finish" })}
            </Button>
          </>
        )}
      </DialogActions>
    </>
  );
}
