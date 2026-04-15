"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { STAFF_OPTIONS } from "../constants/issueAlerts";
import type { HousekeepingIssue } from "../types/issue";
import { SeverityChip } from "./SeverityChip";

interface ReassignDialogProps {
  issue: HousekeepingIssue | null;
  selectedStaff: string;
  onClose: () => void;
  onStaffChange: (staff: string) => void;
  onConfirm: () => void;
}

export function ReassignDialog({
  issue,
  selectedStaff,
  onClose,
  onStaffChange,
  onConfirm
}: ReassignDialogProps) {
  if (!issue) {
    return null;
  }

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Stack>
            <Typography variant="h6" fontWeight={800}>
              Reassign Room {issue.roomNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Choose the staff member who should handle this issue.
            </Typography>
          </Stack>
          <SeverityChip severity={issue.severity} />
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack gap={1.5}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Issue
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              {issue.issueType} - {issue.delayLabel}
            </Typography>
          </Paper>

          <FormControl fullWidth>
            <InputLabel id="reassign-staff-label">Assigned Staff</InputLabel>
            <Select
              labelId="reassign-staff-label"
              value={selectedStaff}
              label="Assigned Staff"
              onChange={(event: SelectChangeEvent) => onStaffChange(event.target.value)}
            >
              {STAFF_OPTIONS.map((staff) => (
                <MenuItem key={staff} value={staff}>
                  {staff}
                  {staff === issue.assignedTo ? " (current)" : ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" disableElevation onClick={onConfirm}>
          Confirm Reassign
        </Button>
      </DialogActions>
    </Dialog>
  );
}
