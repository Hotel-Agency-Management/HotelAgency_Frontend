import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useCreateRoom, useUpdateRoom } from "./useRoomStore";
import { RoomFormValues, roomSchema } from "../schema/roomSchema";
import { Room, RoomPhoto } from "../types/room";
import { roomsApi } from "../api/roomApi";
import { RoomType } from "../../../../../room-types/types/roomType";
import { roomTypesApi } from "../../../../../room-types/api/roomTypeApi";
import { defaultFormValues } from "../constants/roomFormValues";

export interface UseRoomFormDialogArgs {
  open: boolean;
  onClose: () => void;
  room: Room | null | undefined;
  hotelId: string;
}

export function useRoomFormDialog({
  open,
  onClose,
  room,
}: UseRoomFormDialogArgs) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const isEdit = !!room;

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);
  const [createFlowPhotos, setCreateFlowPhotos] = useState<RoomPhoto[]>([]);
  const [isSavingPhotos, setIsSavingPhotos] = useState(false);

  const methods = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: defaultFormValues,
  });

  const { reset, handleSubmit } = methods;

  const { mutate: createRoom, isPending: isCreating } = useCreateRoom();
  const { mutate: updateRoom, isPending: isUpdating } = useUpdateRoom();

  const stepLabels = useMemo(
    () => [
      t("hotelRooms.dialog.stepDetails", { defaultValue: "Room details" }),
      t("hotelRooms.dialog.stepPhotos", { defaultValue: "Photos" }),
    ],
    [t]
  );

  const resetWizardState = useCallback(() => {
    setActiveStep(0);
    setCreatedRoomId(null);
    setCreateFlowPhotos([]);
  }, []);

  const resetAllAndClose = useCallback(() => {
    reset(defaultFormValues);
    resetWizardState();
  }, [reset, resetWizardState]);

  useEffect(() => {
    if (!open) return;
    roomTypesApi.getAll().then(setRoomTypes);
  }, [open]);

  useEffect(() => {
    if (open && !room) {
      resetWizardState();
    }
  }, [open, room, resetWizardState]);

  useEffect(() => {
    if (!open) return;
    if (room) {
      reset({
        roomNumber: room.roomNumber,
        floorNumber: room.floorNumber,
        roomTypeId: room.roomTypeId ?? "",
        status: room.status,
        description: room.description ?? "",
        notes: room.notes ?? "",
        capacity: room.capacity,
        bedType: room.bedType,
        starRating: room.starRating,
        amenities: room.amenities,
        pricePerNight: room.pricePerNight,
      });
    } else {
      reset(defaultFormValues);
    }
  }, [open, room, reset]);

  const handleClose = () => {
    if (isCreating || isUpdating || isSavingPhotos) return;
    onClose();
    resetAllAndClose();
  };

  const onEditSubmit = (values: RoomFormValues) => {
    if (!room) return;
    updateRoom(
      { id: room.id, dto: values },
      {
        onSuccess: () => {
          onClose();
          resetAllAndClose();
        },
      }
    );
  };

  const handleCreateNext = handleSubmit((values: RoomFormValues) => {
    if (createdRoomId) {
      updateRoom(
        { id: createdRoomId, dto: values },
        { onSuccess: () => setActiveStep(1) }
      );
      return;
    }
    createRoom(values, {
      onSuccess: (data) => {
        setCreatedRoomId(data.id);
        setActiveStep(1);
      },
    });
  });

  const handleFinishCreate = async () => {
    if (!createdRoomId) return;
    setIsSavingPhotos(true);
    try {
      await roomsApi.updatePhotos(createdRoomId, createFlowPhotos);
      await queryClient.invalidateQueries({ queryKey: ["rooms"] });
      onClose();
      resetAllAndClose();
    } finally {
      setIsSavingPhotos(false);
    }
  };

  return {
    methods,
    roomTypes,
    isEdit,
    room,
    isCreating,
    isUpdating,
    isSavingPhotos,
    activeStep,
    setActiveStep,
    createdRoomId,
    createFlowPhotos,
    setCreateFlowPhotos,
    handleClose,
    onEditSubmit,
    handleCreateNext,
    handleFinishCreate,
    stepLabels,
    t,
  };
}
