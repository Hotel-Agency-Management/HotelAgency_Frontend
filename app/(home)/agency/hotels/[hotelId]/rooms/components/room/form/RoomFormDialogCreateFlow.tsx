import {
  Button,
  CircularProgress,
  DialogContent,
  Step,
  StepLabel,
} from "@mui/material";
import { TFunction } from "i18next";
import { RoomType } from "../../../../../../../room-types/types/roomType";
import type { RoomPhoto } from "../../../types/room";
import { DialogActionsRoot, DialogStepper } from "../../../roomStyle";
import { renderRoomFormStep } from "./roomFormStepFactory";

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
  const isBusy = isCreating || isSavingPhotos;
  const isLastStep = activeStep === stepLabels.length - 1;

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

        {renderRoomFormStep(activeStep, {
          isEdit,
          roomTypes,
          photos,
          replacementCoverPhoto,
          existingPhotos,
          onDeleteExistingPhoto,
          onPhotosChange,
          onReplaceCoverPhoto,
        })}
      </DialogContent>

      <DialogActionsRoot>
        <Button onClick={onClose} disabled={isBusy}>
          {t("hotelRooms.dialog.cancel", { defaultValue: "Cancel" })}
        </Button>

        {activeStep > 0 && (
          <Button type="button" onClick={onBack} disabled={isBusy}>
            {t("hotelRooms.dialog.back", { defaultValue: "Back" })}
          </Button>
        )}

        {isLastStep ? (
          <Button
            type="button"
            variant="contained"
            onClick={onFinish}
            disabled={isBusy}
            startIcon={isBusy ? <CircularProgress size={16} /> : null}
          >
            {t("hotelRooms.dialog.finish", { defaultValue: "Finish" })}
          </Button>
        ) : (
          <Button
            type="button"
            variant="contained"
            onClick={onNext}
            disabled={isCreating}
          >
            {t("hotelRooms.dialog.next", { defaultValue: "Next" })}
          </Button>
        )}
      </DialogActionsRoot>
    </>
  );
}
