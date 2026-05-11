import { Dialog, DialogTitle } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { useRoomFormDialog } from "../../../hooks/useRoomFormDialog";
import type { RoomRouteScope } from "../../../types/room";
import { RoomFormDialogCreateFlow } from "./RoomFormDialogCreateFlow";
import { RoomFormDialogTitleBar } from "./RoomFormDialogTitleBar";

interface Props {
  open: boolean;
  onClose: () => void;
  roomId: number | null;
  scope: RoomRouteScope;
}

export const RoomFormDialog = ({ open, onClose, roomId, scope }: Props) => {
  const dialog = useRoomFormDialog({
    open,
    onClose,
    roomId,
    scope,
  });

  return (
    <Dialog open={open} onClose={dialog.handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <RoomFormDialogTitleBar
          isEdit={dialog.isEdit}
          room={dialog.room}
          onClose={dialog.handleClose}
          busy={dialog.isSaving}
          t={dialog.t}
        />
      </DialogTitle>
      <FormProvider {...dialog.methods}>
        <RoomFormDialogCreateFlow
          isEdit={dialog.isEdit}
          activeStep={dialog.activeStep}
          stepLabels={dialog.stepLabels}
          roomTypes={dialog.roomTypes}
          photos={dialog.createPhotos}
          replacementCoverPhoto={dialog.replacementCoverPhoto}
          existingPhotos={dialog.existingPhotos}
          onDeleteExistingPhoto={dialog.handleDeleteExistingPhoto}
          onPhotosChange={dialog.setCreatePhotos}
          onReplaceCoverPhoto={dialog.setReplacementCoverPhoto}
          onClose={dialog.handleClose}
          onNext={dialog.handleCreateNext}
          onBack={() => dialog.setActiveStep((current) => Math.max(current - 1, 0))}
          onFinish={dialog.isEdit ? dialog.handleFinishEdit : dialog.handleFinishCreate}
          isCreating={dialog.isSaving || dialog.isLoadingRoom}
          isSavingPhotos={dialog.isSavingPhotos}
          t={dialog.t}
        />
      </FormProvider>
    </Dialog>
  );
};
