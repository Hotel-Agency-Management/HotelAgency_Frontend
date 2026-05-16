"use client";

import { useEffect, useMemo, useState } from "react";
import { INITIAL_FORM } from "../constants/form";
import { HOUSEKEEPING_LOCATION_TYPE } from "../constants/ticket";
import type {
  HousekeepingFacilityOption,
  HousekeepingRoomOption,
} from "./useHousekeepingLocations";
import type {
  HousekeepingLocationType,
  HousekeepingTicket,
  HousekeepingTicketPriority,
  HousekeepingTicketType,
  HousekeepingTicketValues,
} from "../types/ticket";

interface UseCreateTicketDialogFormProps {
  open: boolean;
  employees: string[];
  roomOptions: HousekeepingRoomOption[];
  facilityOptions: HousekeepingFacilityOption[];
  initialValues?: HousekeepingTicket | null;
  onClose: () => void;
  onCreate: (values: HousekeepingTicketValues) => void;
}

export function useCreateTicketDialogForm({
  open,
  employees,
  roomOptions,
  facilityOptions,
  initialValues,
  onClose,
  onCreate,
}: UseCreateTicketDialogFormProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const isEditing = !!initialValues;

  useEffect(() => {
    if (!open) return;

    if (initialValues) {
      setForm({
        ticketType: initialValues.ticketType,
        locationType: initialValues.locationType,
        priority: initialValues.priority,
        title: initialValues.title,
        description: initialValues.description,
        roomId: initialValues.roomId ?? "",
        facilityId: initialValues.facilityId ?? "",
        assignedTo: initialValues.assignedTo,
        deadline: initialValues.deadline ?? "",
      });
      return;
    }

    setForm({
      ...INITIAL_FORM,
      assignedTo: employees[0] ?? "",
    });
  }, [employees, initialValues, open]);

  const isRoomLocation = form.locationType === HOUSEKEEPING_LOCATION_TYPE.ROOM;
  const hasLocation = isRoomLocation ? Boolean(form.roomId) : Boolean(form.facilityId);
  const isSubmitDisabled = !form.title.trim() || !form.assignedTo || !hasLocation || !form.deadline;

  const displayedRoomOptions = useMemo(() => {
    if (!form.roomId || roomOptions.some((room) => room.id === form.roomId)) {
      return roomOptions;
    }

    return [...roomOptions, { id: form.roomId, roomNumber: form.roomId }];
  }, [form.roomId, roomOptions]);

  const displayedFacilityOptions = useMemo(() => {
    if (
      !form.facilityId ||
      facilityOptions.some((facility) => facility.id === form.facilityId)
    ) {
      return facilityOptions;
    }

    return [
      ...facilityOptions,
      {
        id: form.facilityId,
        name: form.facilityId,
      },
    ];
  }, [facilityOptions, form.facilityId]);

  const updateTicketType = (ticketType: HousekeepingTicketType) => {
    setForm((current) => ({ ...current, ticketType }));
  };

  const updatePriority = (priority: HousekeepingTicketPriority) => {
    setForm((current) => ({ ...current, priority }));
  };

  const updateLocationType = (locationType: HousekeepingLocationType) => {
    setForm((current) => ({
      ...current,
      locationType,
      roomId:
        locationType === HOUSEKEEPING_LOCATION_TYPE.ROOM ? current.roomId : "",
      facilityId:
        locationType === HOUSEKEEPING_LOCATION_TYPE.FACILITY
          ? current.facilityId
          : "",
    }));
  };

  const updateRoom = (roomId: string) => {
    setForm((current) => ({ ...current, roomId, facilityId: "" }));
  };

  const updateFacility = (facilityId: string) => {
    setForm((current) => ({ ...current, roomId: "", facilityId }));
  };

  const updateAssignedTo = (assignedTo: string) => {
    setForm((current) => ({ ...current, assignedTo }));
  };

  const updateTitle = (title: string) => {
    setForm((current) => ({ ...current, title }));
  };

  const updateDescription = (description: string) => {
    setForm((current) => ({ ...current, description }));
  };

  const updateDeadline = (deadline: string) => {
    setForm((current) => ({ ...current, deadline }));
  };

  const handleSubmit = () => {
    onCreate({
      ticketType: form.ticketType,
      locationType: form.locationType,
      ...(isRoomLocation
        ? { roomId: form.roomId }
        : { facilityId: form.facilityId }),
      priority: form.priority,
      title: form.title.trim(),
      description: form.description.trim(),
      assignedTo: form.assignedTo,
      deadline: form.deadline,
    });

    onClose();
  };

  return {
    form,
    isEditing,
    isRoomLocation,
    isSubmitDisabled,
    displayedRoomOptions,
    displayedFacilityOptions,
    updateTicketType,
    updatePriority,
    updateLocationType,
    updateRoom,
    updateFacility,
    updateAssignedTo,
    updateTitle,
    updateDescription,
    updateDeadline,
    handleSubmit,
  };
}
