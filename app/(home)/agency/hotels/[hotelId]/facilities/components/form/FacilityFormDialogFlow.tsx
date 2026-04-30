import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import type { FacilityPhoto } from "../../types/facility";
import { FacilityFormFields } from "./FacilityFormFields";
import { FacilityPhotosUpload } from "./FacilityPhotosUpload";

interface Props {
  activeStep: number;
  stepLabels: string[];
  workingFacilityId: string | null;
  hotelId: string;
  agencyId?: string;
  photos: FacilityPhoto[];
  onPhotosChange: (photos: FacilityPhoto[]) => void;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  onFinish: () => void;
  isCreating: boolean;
  isUpdating: boolean;
  isSavingPhotos: boolean;
}

export function FacilityFormDialogFlow({
  activeStep,
  stepLabels,
  workingFacilityId,
  hotelId,
  agencyId,
  photos,
  onPhotosChange,
  onClose,
  onNext,
  onBack,
  onFinish,
  isCreating,
  isUpdating,
  isSavingPhotos,
}: Props) {
  const detailsBusy = isCreating || isUpdating;

  return (
    <>
      <DialogContent dividers>
        <Stack spacing={3}>
          <Stepper activeStep={activeStep}>
            {stepLabels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 ? <FacilityFormFields /> : null}

          {activeStep === 1 && workingFacilityId ? (
            <FacilityPhotosUpload
              facilityId={workingFacilityId}
              hotelId={hotelId}
              agencyId={agencyId}
              existingPhotos={photos}
              onPhotosChange={onPhotosChange}
            />
          ) : null}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={detailsBusy || isSavingPhotos}>
          Cancel
        </Button>

        {activeStep === 0 ? (
          <Button
            type="button"
            variant="contained"
            onClick={onNext}
            disabled={detailsBusy}
            startIcon={detailsBusy ? <CircularProgress size={16} /> : null}
          >
            Next
          </Button>
        ) : (
          <>
            <Button type="button" onClick={onBack} disabled={isSavingPhotos}>
              Back
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={onFinish}
              disabled={isSavingPhotos}
              startIcon={isSavingPhotos ? <CircularProgress size={16} /> : null}
            >
              Finish
            </Button>
          </>
        )}
      </DialogActions>
    </>
  );
}
