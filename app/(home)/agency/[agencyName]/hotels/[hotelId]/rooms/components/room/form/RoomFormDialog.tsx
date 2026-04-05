import { Dialog, DialogTitle } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { useRoomFormDialog } from "../../../hooks/useRoomFormDialog";
import { Room } from "../../../types/room";
import { RoomFormDialogCreateFlow } from "./RoomFormDialogCreateFlow";
import { RoomFormDialogEditForm } from "./RoomFormDialogEditForm";
import { RoomFormDialogTitleBar } from "./RoomFormDialogTitleBar";

interface Props {
  open: boolean;
  onClose: () => void;
  room?: Room | null;
  hotelId: string;
}

export const RoomFormDialog = ({ open, onClose, room, hotelId }: Props) => {
  const ctx = useRoomFormDialog({
    open,
    onClose,
    room: room ?? null,
    hotelId,
  });

  const busy = ctx.isCreating || ctx.isUpdating || ctx.isSavingPhotos;

  return (
    <Dialog open={open} onClose={ctx.handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <RoomFormDialogTitleBar
          isEdit={ctx.isEdit}
          room={ctx.room}
          onClose={ctx.handleClose}
          busy={busy}
          t={ctx.t}
        />
      </DialogTitle>

      <FormProvider {...ctx.methods}>
        {ctx.isEdit && ctx.room ? (
          <RoomFormDialogEditForm
            methods={ctx.methods}
            roomTypes={ctx.roomTypes}
            room={ctx.room}
            onClose={ctx.handleClose}
            onSubmit={ctx.onEditSubmit}
            isCreating={ctx.isCreating}
            isUpdating={ctx.isUpdating}
            t={ctx.t}
          />
        ) : (
          <RoomFormDialogCreateFlow
            activeStep={ctx.activeStep}
            stepLabels={ctx.stepLabels}
            roomTypes={ctx.roomTypes}
            createdRoomId={ctx.createdRoomId}
            createFlowPhotos={ctx.createFlowPhotos}
            onPhotosChange={ctx.setCreateFlowPhotos}
            onClose={ctx.handleClose}
            onNext={ctx.handleCreateNext}
            onBack={() => ctx.setActiveStep(0)}
            onFinish={ctx.handleFinishCreate}
            isCreating={ctx.isCreating}
            isUpdating={ctx.isUpdating}
            isSavingPhotos={ctx.isSavingPhotos}
            t={ctx.t}
          />
        )}
      </FormProvider>
    </Dialog>
  );
};
