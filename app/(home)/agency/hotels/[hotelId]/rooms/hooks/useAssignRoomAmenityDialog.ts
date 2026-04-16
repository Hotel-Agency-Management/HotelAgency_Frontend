import { useCallback, useEffect, useMemo, useState } from "react";
import { useAssignAmenityToRooms, useRooms } from "./useRoomStore";
import type { Room } from "../types/room";
import type { RoomAmenity } from "../types/roomAmenity";

interface UseAssignRoomAmenityDialogArgs {
  open: boolean;
  amenity: RoomAmenity | null;
  onClose: () => void;
}

export function useAssignRoomAmenityDialog({
  open,
  amenity,
  onClose,
}: UseAssignRoomAmenityDialogArgs) {
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([]);
  const { data: rooms = [], isLoading } = useRooms();
  const { mutateAsync: assignAmenityToRooms, isPending } = useAssignAmenityToRooms();

  const selectedRooms = useMemo(
    () => rooms.filter((room) => selectedRoomIds.includes(room.id)),
    [rooms, selectedRoomIds]
  );

  useEffect(() => {
    if (!open || !amenity) return;

    setSelectedRoomIds(
      rooms
        .filter((room) => room.amenities.includes(amenity.key))
        .map((room) => room.id)
    );
  }, [amenity, open, rooms]);

  const handleSelectedRoomsChange = useCallback((selectedOptions: Room[]) => {
    setSelectedRoomIds(selectedOptions.map((room) => room.id));
  }, []);

  const handleSave = useCallback(async () => {
    if (!amenity) return;

    await assignAmenityToRooms({
      amenityKey: amenity.key,
      roomIds: selectedRoomIds,
    });
    onClose();
  }, [amenity, assignAmenityToRooms, onClose, selectedRoomIds]);

  return {
    rooms,
    selectedRooms,
    selectedRoomIds,
    isLoading,
    isPending,
    handleSelectedRoomsChange,
    handleSave,
  };
}
