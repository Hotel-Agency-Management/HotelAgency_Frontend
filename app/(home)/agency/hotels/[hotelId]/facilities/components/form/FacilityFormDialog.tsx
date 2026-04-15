import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { FormProvider } from "react-hook-form";
import { useFacilityFormDialog } from "../../hooks/useFacilityFormDialog";
import type { HotelFacility } from "../../types/facility";
import { FacilityFormDialogFlow } from "./FacilityFormDialogFlow";
import { FacilityFormDialogTitleBar } from "./FacilityFormDialogTitleBar";

interface Props {
  open: boolean;
  onClose: () => void;
  facility?: HotelFacility | null;
  facilityId?: string | null;
  isLoading?: boolean;
  hotelId: string;
}

export function FacilityFormDialog({
  open,
  onClose,
  facility,
  facilityId,
  isLoading = false,
  hotelId,
}: Props) {
  const dialogState = useFacilityFormDialog({
    open,
    onClose,
    facility: facility ?? null,
    facilityId,
    hotelId,
  });

  return (
    <Dialog open={open} onClose={dialogState.handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <FacilityFormDialogTitleBar
          isEdit={dialogState.isEdit}
          facility={dialogState.facility}
          onClose={dialogState.handleClose}
          busy={dialogState.busy}
        />
      </DialogTitle>

      <FormProvider {...dialogState.methods}>
        {isLoading && dialogState.isEdit && !facility ? (
          <DialogContent dividers>
            <Stack alignItems="center" justifyContent="center" minHeight={240}>
              <CircularProgress disableShrink />
            </Stack>
          </DialogContent>
        ) : (
          <FacilityFormDialogFlow
            activeStep={dialogState.activeStep}
            stepLabels={dialogState.stepLabels}
            workingFacilityId={dialogState.workingFacilityId}
            photos={dialogState.flowPhotos}
            onPhotosChange={dialogState.setFlowPhotos}
            onClose={dialogState.handleClose}
            onNext={dialogState.handleDetailsNext}
            onBack={() => dialogState.setActiveStep(0)}
            onFinish={dialogState.handleFinish}
            isCreating={dialogState.isCreating}
            isUpdating={dialogState.isUpdating}
            isSavingPhotos={dialogState.isSavingPhotos}
          />
        )}
      </FormProvider>
    </Dialog>
  );
}
