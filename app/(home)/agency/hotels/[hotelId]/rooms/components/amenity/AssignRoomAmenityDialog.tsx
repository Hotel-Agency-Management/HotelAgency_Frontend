import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useAssignRoomAmenityDialog } from "../../hooks/useAssignRoomAmenityDialog";
import type { RoomAmenity } from "../../types/roomAmenity";

interface Props {
  open: boolean;
  amenity: RoomAmenity | null;
  onClose: () => void;
}

export function AssignRoomAmenityDialog({ open, amenity, onClose }: Props) {
  const {
    rooms,
    selectedRooms,
    selectedRoomIds,
    isLoading,
    isPending,
    handleSelectedRoomsChange,
    handleSave,
  } = useAssignRoomAmenityDialog({ open, amenity, onClose });

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
            <Autocomplete
              multiple
              disableCloseOnSelect
              options={rooms}
              value={selectedRooms}
              getOptionLabel={(room) => `Room ${room.roomNumber} - Floor ${room.floorNumber}`}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, selectedOptions) => {
                handleSelectedRoomsChange(selectedOptions);
              }}
              renderOption={(props, room, { selected }) => {
                const { key, ...optionProps } = props;

                return (
                  <ListItem key={key} {...optionProps}>
                    <Checkbox checked={selected} sx={{ mr: 1 }} />
                    {`Room ${room.roomNumber} - Floor ${room.floorNumber}`}
                  </ListItem>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Rooms"
                  placeholder={selectedRooms.length === 0 ? "Select rooms" : undefined}
                />
              )}
            />
          )}

          {!isLoading && rooms.length > 0 ? (
            <Typography variant="caption" color="text.secondary">
              {selectedRoomIds.length} room{selectedRoomIds.length !== 1 ? "s" : ""} selected
            </Typography>
          ) : null}
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
