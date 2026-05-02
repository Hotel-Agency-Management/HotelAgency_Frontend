import {
  Button,
  CircularProgress,
  DialogContent,
  Stack,
  Step,
  StepLabel,
} from "@mui/material";
import { TFunction } from "i18next";
import { RoomType } from "../../../../../../../room-types/types/roomType";
import type { RoomPhoto } from "../../../types/room";
import { DialogActionsRoot, DialogStepper } from "../../../StyledComponents";
import { RoomAmenitiesPicker } from "./RoomAmenitiesPicker";
import { RoomCreatePhotosUpload } from "./RoomCreatePhotosUpload";
import { RoomEditPhotosUpload } from "./RoomEditPhotosUpload";
import { RoomFormFields } from "./RoomFormFields";

interface Props {
  isEdit: boolean;
  activeStep: number;
  stepLabels: string[];
  roomTypes: RoomType[];
  photos: File[];
  replacementCoverPhoto?: File | null;
  existingPhotos?: RoomPhoto[];
  onDeleteExistingPhoto?: (photo: RoomPhoto) => void;
  onPhotosChange: (photos: File[]) => void;
  onReplaceCoverPhoto?: (file: File | null) => void;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  onFinish: () => void;
  isCreating: boolean;
  isSavingPhotos: boolean;
  t: TFunction;
}

export function RoomFormDialogCreateFlow({
  isEdit,
  activeStep,
  stepLabels,
  roomTypes,
  photos,
  replacementCoverPhoto = null,
  existingPhotos = [],
  onDeleteExistingPhoto,
  onPhotosChange,
  onReplaceCoverPhoto,
  onClose,
  onNext,
  onBack,
  onFinish,
  isCreating,
  isSavingPhotos,
  t,
}: Props) {
  return (
    <>
      <DialogContent>
        <DialogStepper activeStep={activeStep}>
          {stepLabels.map((label, index) => (
            <Step key={`${label}-${index}`}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </DialogStepper>

        {activeStep === 0 && (
          <Stack spacing={3}>
            <RoomFormFields roomTypes={roomTypes} />
            <RoomAmenitiesPicker />
          </Stack>
        )}

        {activeStep === 1 ? (
          isEdit ? (
            <RoomEditPhotosUpload
              existingPhotos={existingPhotos}
              newFiles={photos}
              replacementCoverPhoto={replacementCoverPhoto}
              onNewFilesChange={onPhotosChange}
              onReplaceCoverPhoto={onReplaceCoverPhoto ?? (() => undefined)}
              onDeleteExistingPhoto={onDeleteExistingPhoto ?? (() => undefined)}
            />
          ) : (
            <RoomCreatePhotosUpload files={photos} onFilesChange={onPhotosChange} />
          )
        ) : null}
      </DialogContent>

      <DialogActionsRoot>
        <Button onClick={onClose} disabled={isCreating || isSavingPhotos}>
          {t("hotelRooms.dialog.cancel", { defaultValue: "Cancel" })}
        </Button>

        {activeStep === 0 ? (
          <Button
            type="button"
            variant="contained"
            onClick={onNext}
            disabled={isCreating}
          >
            {t("hotelRooms.dialog.next", { defaultValue: "Next" })}
          </Button>
        ) : (
          <>
            <Button type="button" onClick={onBack} disabled={isCreating || isSavingPhotos}>
              {t("hotelRooms.dialog.back", { defaultValue: "Back" })}
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={onFinish}
              disabled={isCreating || isSavingPhotos}
              startIcon={isCreating || isSavingPhotos ? <CircularProgress size={16} /> : null}
            >
              {t("hotelRooms.dialog.finish", { defaultValue: "Finish" })}
            </Button>
          </>
        )}
      </DialogActionsRoot>
    </>
  );
}
