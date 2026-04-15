import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  useAssignAmenityToRooms,
  useRooms,
} from "../../hooks/useRoomStore";
import type { RoomAmenity } from "../../types/roomAmenity";

interface Props {
  open: boolean;
  amenity: RoomAmenity | null;
  onClose: () => void;
}

export function AssignRoomAmenityDialog({ open, amenity, onClose }: Props) {
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([]);
  const { data: rooms = [], isLoading } = useRooms();
  const { mutateAsync: assignAmenityToRooms, isPending } = useAssignAmenityToRooms();

  useEffect(() => {
    if (!open || !amenity) return;

    setSelectedRoomIds(
      rooms
        .filter((room) => room.amenities.includes(amenity.key))
        .map((room) => room.id)
    );
  }, [amenity, open, rooms]);

  const handleToggleRoom = (roomId: string) => {
    setSelectedRoomIds((previous) =>
      previous.includes(roomId)
        ? previous.filter((id) => id !== roomId)
        : [...previous, roomId]
    );
  };

  const handleSave = async () => {
    if (!amenity) return;

    await assignAmenityToRooms({
      amenityKey: amenity.key,
      roomIds: selectedRoomIds,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={isPending ? undefined : onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assign to rooms</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <DialogContentText>
            Choose which rooms should include {amenity?.label ?? "this amenity"}.
          </DialogContentText>

          {isLoading ? (
            <Stack alignItems="center" justifyContent="center" minHeight={160}>
              <CircularProgress disableShrink />
            </Stack>
          ) : rooms.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No rooms available.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {rooms.map((room) => (
                <FormControlLabel
                  key={room.id}
                  control={
                    <Checkbox
                      checked={selectedRoomIds.includes(room.id)}
                      onChange={() => handleToggleRoom(room.id)}
                    />
                  }
                  label={`Room ${room.roomNumber} - Floor ${room.floorNumber}`}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isPending || isLoading || !amenity}
          startIcon={isPending ? <CircularProgress size={16} /> : null}
        >
          Save assignment
        </Button>
      </DialogActions>
    </Dialog>
  );
}
