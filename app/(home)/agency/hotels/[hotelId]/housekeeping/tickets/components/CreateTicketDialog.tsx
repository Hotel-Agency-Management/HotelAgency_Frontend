"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PRIORITY_LABELS } from "../constants/ticketChip";
import type {
  HousekeepingFacilityOption,
  HousekeepingRoomOption,
} from "../hooks/useHousekeepingLocations";
import { useCreateTicketDialogForm } from "../hooks/useCreateTicketDialogForm";
import type {
  HousekeepingTicket,
  HousekeepingLocationType,
  HousekeepingTicketPriority,
  HousekeepingTicketValues,
  HousekeepingTicketType,
} from "../types/ticket";
import { HOUSEKEEPING_LOCATION_TYPE, HOUSEKEEPING_TICKET_TYPE, HOUSEKEEPING_TICKET_PRIORITY } from "../constants/ticket";
import { TICKET_TYPE_LABELS, LOCATION_TYPE_LABELS } from "../constants/ticketLabel";

interface CreateTicketDialogProps {
  open: boolean;
  employees: string[];
  roomOptions: HousekeepingRoomOption[];
  facilityOptions: HousekeepingFacilityOption[];
  locationsLoading?: boolean;
  initialValues?: HousekeepingTicket | null;
  onClose: () => void;
  onCreate: (values: HousekeepingTicketValues) => void;
}

export function CreateTicketDialog({
  open,
  employees,
  roomOptions,
  facilityOptions,
  locationsLoading = false,
  initialValues,
  onClose,
  onCreate,
}: CreateTicketDialogProps) {
  const {
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
    handleSubmit,
  } = useCreateTicketDialogForm({
    open,
    employees,
    roomOptions,
    facilityOptions,
    initialValues,
    onClose,
    onCreate,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? "Edit Ticket" : "Create Ticket"}</DialogTitle>
      <DialogContent>
        <Stack gap={2.5}>
          <Typography variant="body2">
            {isEditing
              ? "Update the ticket details and assignment."
              : "Create a new ticket and assign it to the right staff member."}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="create-ticket-type-label">Ticket Type</InputLabel>
                <Select
                  labelId="create-ticket-type-label"
                  label="Ticket Type"
                  value={form.ticketType}
                  onChange={(event) =>
                    updateTicketType(event.target.value as HousekeepingTicketType)
                  }
                >
                  {Object.values(HOUSEKEEPING_TICKET_TYPE).map((ticketType) => (
                    <MenuItem key={ticketType} value={ticketType}>
                      {TICKET_TYPE_LABELS[ticketType]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="create-ticket-priority-label">Priority</InputLabel>
                <Select
                  labelId="create-ticket-priority-label"
                  label="Priority"
                  value={form.priority}
                  onChange={(event) =>
                    updatePriority(event.target.value as HousekeepingTicketPriority)
                  }
                >
                  {Object.values(HOUSEKEEPING_TICKET_PRIORITY).map((priority) => (
                    <MenuItem key={priority} value={priority}>
                      {PRIORITY_LABELS[priority]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="create-ticket-location-type-label">
                  Location Type
                </InputLabel>
                <Select
                  labelId="create-ticket-location-type-label"
                  label="Location Type"
                  value={form.locationType}
                  onChange={(event) =>
                    updateLocationType(event.target.value as HousekeepingLocationType)
                  }
                >
                  {Object.values(HOUSEKEEPING_LOCATION_TYPE).map((locationType) => (
                    <MenuItem key={locationType} value={locationType}>
                      {LOCATION_TYPE_LABELS[locationType]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              {isRoomLocation ? (
                <FormControl fullWidth size="small" required>
                  <InputLabel id="create-ticket-room-label">Room</InputLabel>
                  <Select
                    labelId="create-ticket-room-label"
                    label="Room"
                    value={form.roomId}
                    disabled={locationsLoading}
                    onChange={(event) =>
                      updateRoom(event.target.value)
                    }
                  >
                    {displayedRoomOptions.map((room) => (
                      <MenuItem key={room.id} value={room.id}>
                        Room {room.roomNumber}
                      </MenuItem>
                    ))}
                    {!displayedRoomOptions.length && (
                      <MenuItem disabled value="">
                        No rooms available
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              ) : (
                <FormControl fullWidth size="small" required>
                  <InputLabel id="create-ticket-facility-label">Facility</InputLabel>
                  <Select
                    labelId="create-ticket-facility-label"
                    label="Facility"
                    value={form.facilityId}
                    disabled={locationsLoading}
                    onChange={(event) =>
                      updateFacility(event.target.value)
                    }
                  >
                    {displayedFacilityOptions.map((facility) => (
                      <MenuItem key={facility.id} value={facility.id}>
                        {facility.name}
                        {facility.category ? ` - ${facility.category}` : ""}
                      </MenuItem>
                    ))}
                    {!displayedFacilityOptions.length && (
                      <MenuItem disabled value="">
                        No facilities available
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              )}
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="create-ticket-employee-label">Assigned To</InputLabel>
                <Select
                  labelId="create-ticket-employee-label"
                  fullWidth
                  label="Assigned To"
                  value={form.assignedTo}
                  onChange={(event) =>
                    updateAssignedTo(event.target.value)
                  }
                >
                  {employees.map((employee) => (
                    <MenuItem key={employee} value={employee}>
                      {employee}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                size="small"
                label="Title"
                value={form.title}
                onChange={(event) =>
                  updateTitle(event.target.value)
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                size="small"
                label="Description"
                value={form.description}
                onChange={(event) =>
                  updateDescription(event.target.value)
                }
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          {isEditing ? "Save Changes" : "Create Ticket"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
