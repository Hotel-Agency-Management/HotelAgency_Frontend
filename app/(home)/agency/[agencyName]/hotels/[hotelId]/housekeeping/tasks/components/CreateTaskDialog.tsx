"use client";

import { useEffect, useState } from "react";
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
  Typography
} from "@mui/material";
import type {
  HousekeepingTask,
  HousekeepingTaskPriority,
  HousekeepingTaskType
} from "../types/task";
import { INITIAL_FORM } from "../constants/form";

interface CreateTaskDialogProps {
  open: boolean;
  employees: string[];
  initialValues?: HousekeepingTask | null;
  onClose: () => void;
  onCreate: (values: {
    roomNumber: string;
    type: HousekeepingTaskType;
    assignedTo: string;
    priority: HousekeepingTaskPriority;
    floor: number;
  }) => void;
}
export function CreateTaskDialog({
  open,
  employees,
  initialValues,
  onClose,
  onCreate
}: CreateTaskDialogProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const isEditing = !!initialValues;

  useEffect(() => {
    if (!open) return;

    if (initialValues) {
      setForm({
        roomNumber: initialValues.roomNumber,
        type: initialValues.type,
        assignedTo: initialValues.assignedTo,
        priority: initialValues.priority,
        floor: initialValues.floor
      });
      return;
    }

    setForm({
      ...INITIAL_FORM,
      assignedTo: employees[0] ?? ""
    });
  }, [employees, initialValues, open]);

  const isDisabled = !form.roomNumber.trim() || !form.assignedTo || form.floor <= 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? "Edit Task" : "Create Task"}</DialogTitle>
      <DialogContent dividers>
        <Stack gap={2.5}>
          <Typography variant="body2" color="text.secondary">
            {isEditing
              ? "Update the task details and keep assignments accurate for the housekeeping team."
              : "Create a new housekeeping assignment and send it to the right staff member."}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Room Number"
                value={form.roomNumber}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    roomNumber: event.target.value
                  }))
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Floor"
                value={form.floor}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    floor: Number(event.target.value)
                  }))
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="create-task-type-label">Task Type</InputLabel>
                <Select
                  labelId="create-task-type-label"
                  label="Task Type"
                  value={form.type}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      type: event.target.value as HousekeepingTaskType
                    }))
                  }
                >
                  <MenuItem value="CHECKOUT">Checkout</MenuItem>
                  <MenuItem value="STAYOVER">Stayover</MenuItem>
                  <MenuItem value="INSPECTION">Inspection</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="create-task-priority-label">Priority</InputLabel>
                <Select
                  labelId="create-task-priority-label"
                  label="Priority"
                  value={form.priority}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      priority: event.target.value as HousekeepingTaskPriority
                    }))
                  }
                >
                  <MenuItem value="LOW">Low</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="create-task-employee-label">Assigned To</InputLabel>
                <Select
                  labelId="create-task-employee-label"
                  label="Assigned To"
                  value={form.assignedTo}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      assignedTo: event.target.value
                    }))
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
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={() => {
            onCreate({
              roomNumber: form.roomNumber.trim(),
              type: form.type,
              assignedTo: form.assignedTo,
              priority: form.priority,
              floor: form.floor
            });
            onClose();
          }}
        >
          {isEditing ? "Save Changes" : "Create Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
