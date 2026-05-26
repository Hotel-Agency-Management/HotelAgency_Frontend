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
import { useTranslation } from "react-i18next";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getPriorityLabels } from "../constants/ticketChip";
import type {
  HousekeepingFacilityOption,
  HousekeepingRoomOption,
} from "../hooks/useHousekeepingLocations";
import type { AssignableEmployee } from "../hooks/useAssignableEmployees";
import { useCreateTicketDialogForm } from "../hooks/useCreateTicketDialogForm";
import type {
  HousekeepingTicket,
  HousekeepingLocationType,
  HousekeepingTicketPriority,
  HousekeepingTicketValues,
  HousekeepingTicketType,
} from "../types/ticket";
import { HOUSEKEEPING_LOCATION_TYPE, HOUSEKEEPING_TICKET_TYPE, HOUSEKEEPING_TICKET_PRIORITY } from "../constants/ticket";
import { getTicketTypeLabels, getLocationTypeLabels } from "../constants/ticketLabel";

interface CreateTicketDialogProps {
  open: boolean;
  employees: AssignableEmployee[];
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
  const { t } = useTranslation();
  const ticketTypeLabels = getTicketTypeLabels(t);
  const locationTypeLabels = getLocationTypeLabels(t);
  const priorityLabels = getPriorityLabels(t);
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
    updateDeadline,
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
      <DialogTitle>{isEditing ? t("housekeeping.tickets.dialog.editTitle", "Edit Ticket") : t("housekeeping.tickets.dialog.createTitle", "Create Ticket")}</DialogTitle>
      <DialogContent>
        <Stack gap={2.5}>
          <Typography variant="body2">
            {isEditing
              ? t("housekeeping.tickets.dialog.editSubtitle", "Update the ticket details and assignment.")
              : t("housekeeping.tickets.dialog.createSubtitle", "Create a new ticket and assign it to the right staff member.")}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="create-ticket-type-label">{t("housekeeping.tickets.dialog.ticketType", "Ticket Type")}</InputLabel>
                <Select
                  labelId="create-ticket-type-label"
                  label={t("housekeeping.tickets.dialog.ticketType", "Ticket Type")}
                  value={form.ticketType}
                  onChange={(event) =>
                    updateTicketType(event.target.value as HousekeepingTicketType)
                  }
                >
                  {Object.values(HOUSEKEEPING_TICKET_TYPE).map((ticketType) => (
                    <MenuItem key={ticketType} value={ticketType}>
                      {ticketTypeLabels[ticketType]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="create-ticket-priority-label">{t("housekeeping.tickets.dialog.priority", "Priority")}</InputLabel>
                <Select
                  labelId="create-ticket-priority-label"
                  label={t("housekeeping.tickets.dialog.priority", "Priority")}
                  value={form.priority}
                  onChange={(event) =>
                    updatePriority(event.target.value as HousekeepingTicketPriority)
                  }
                >
                  {Object.values(HOUSEKEEPING_TICKET_PRIORITY).map((priority) => (
                    <MenuItem key={priority} value={priority}>
                      {priorityLabels[priority]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="create-ticket-location-type-label">
                  {t("housekeeping.tickets.dialog.locationType", "Location Type")}
                </InputLabel>
                <Select
                  labelId="create-ticket-location-type-label"
                  label={t("housekeeping.tickets.dialog.locationType", "Location Type")}
                  value={form.locationType}
                  onChange={(event) =>
                    updateLocationType(event.target.value as HousekeepingLocationType)
                  }
                >
                  {Object.values(HOUSEKEEPING_LOCATION_TYPE).map((locationType) => (
                    <MenuItem key={locationType} value={locationType}>
                      {locationTypeLabels[locationType]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              {isRoomLocation ? (
                <FormControl fullWidth size="small" required>
                  <InputLabel id="create-ticket-room-label">{t("housekeeping.tickets.dialog.room", "Room")}</InputLabel>
                  <Select
                    labelId="create-ticket-room-label"
                    label={t("housekeeping.tickets.dialog.room", "Room")}
                    value={form.roomId}
                    disabled={locationsLoading}
                    onChange={(event) =>
                      updateRoom(event.target.value)
                    }
                  >
                    {displayedRoomOptions.map((room) => (
                      <MenuItem key={room.id} value={room.id}>
                        {t("housekeeping.tickets.dialog.roomPrefix", "Room {{number}}", { number: room.roomNumber })}
                      </MenuItem>
                    ))}
                    {!displayedRoomOptions.length && (
                      <MenuItem disabled value="">
                        {t("housekeeping.tickets.dialog.noRoomsAvailable", "No rooms available")}
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              ) : (
                <FormControl fullWidth size="small" required>
                  <InputLabel id="create-ticket-facility-label">{t("housekeeping.tickets.dialog.facility", "Facility")}</InputLabel>
                  <Select
                    labelId="create-ticket-facility-label"
                    label={t("housekeeping.tickets.dialog.facility", "Facility")}
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
                        {t("housekeeping.tickets.dialog.noFacilitiesAvailable", "No facilities available")}
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              )}
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="create-ticket-employee-label">{t("housekeeping.tickets.dialog.assignedTo", "Assigned To")}</InputLabel>
                <Select
                  labelId="create-ticket-employee-label"
                  fullWidth
                  label={t("housekeeping.tickets.dialog.assignedTo", "Assigned To")}
                  value={form.assignedToId ?? ""}
                  onChange={(event) =>
                    updateAssignedTo(Number(event.target.value))
                  }
                >
                  {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label={t("housekeeping.tickets.dialog.deadline", "Deadline")}
                  value={form.deadline ? dayjs(form.deadline) : null}
                  onChange={(value) =>
                    updateDeadline(
                      value && value.isValid()
                        ? value.format("YYYY-MM-DDTHH:mm")
                        : ""
                    )
                  }
                  slotProps={{
                    textField: { fullWidth: true, size: "small" },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                size="small"
                label={t("housekeeping.tickets.dialog.title", "Title")}
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
                label={t("housekeeping.tickets.dialog.description", "Description")}
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
          {t("common.cancel", "Cancel")}
        </Button>
        <Button
          variant="contained"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          {isEditing ? t("housekeeping.tickets.dialog.saveChanges", "Save Changes") : t("housekeeping.tickets.dialog.createTitle", "Create Ticket")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
