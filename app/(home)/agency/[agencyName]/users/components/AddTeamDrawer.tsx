"use client";

import { Controller, useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { MuiTelInput } from "mui-tel-input";
import { X } from "lucide-react";
import {
  AGENCY_ROLE_OPTIONS,
  type AgencyTeamMemberInput,
} from "@/app/(home)/agency/types/teamMember";
import {
  defaultTeamMemberValues,
} from "./userManagement";

interface AddTeamDrawerProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onAddMember: (values: AgencyTeamMemberInput) => Promise<void>;
}

export function AddTeamDrawer({
  open,
  isLoading,
  onClose,
  onAddMember,
}: AddTeamDrawerProps) {
  const form = useForm<AgencyTeamMemberInput>({
    defaultValues: defaultTeamMemberValues,
    mode: "onBlur",
  });

  const handleClose = () => {
    form.reset(defaultTeamMemberValues);
    onClose();
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    await onAddMember(values);
    handleClose();
  });

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 440 },
        },
      }}
    >
      <Box component="form" onSubmit={event => void handleSubmit(event)} noValidate>
        <Stack>
          <CardHeader
            title="Add Team Member"
            subheader="Add a user and assign the role they should have in the agency."
            action={
              <IconButton size="small" onClick={handleClose}>
                <X size={18} />
              </IconButton>
            }
          />

          <CardContent>
            <Stack spacing={2.5}>
              <Alert severity="info" variant="outlined">
                Only team members with the <strong>Admin</strong> or <strong>Manager</strong> role will appear when selecting a hotel manager.
              </Alert>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...form.register("firstName", { required: "First name is required" })}
                  fullWidth
                  size="small"
                  label="First name"
                  error={!!form.formState.errors.firstName}
                  helperText={form.formState.errors.firstName?.message}
                />
                <TextField
                  {...form.register("lastName", { required: "Last name is required" })}
                  fullWidth
                  size="small"
                  label="Last name"
                  error={!!form.formState.errors.lastName}
                  helperText={form.formState.errors.lastName?.message}
                />
              </Stack>

              <TextField
                {...form.register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                fullWidth
                size="small"
                type="email"
                label="Email"
                error={!!form.formState.errors.email}
                helperText={form.formState.errors.email?.message}
              />

              <Controller
                name="phone"
                control={form.control}
                rules={{ required: "Phone is required" }}
                render={({ field, fieldState }) => (
                  <MuiTelInput
                    {...field}
                    fullWidth
                    size="small"
                    label="Phone"
                    defaultCountry="US"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <TextField
                {...form.register("role", { required: "Role is required" })}
                select
                fullWidth
                size="small"
                label="Role"
                error={!!form.formState.errors.role}
                helperText={form.formState.errors.role?.message ?? "Choose the access level for this team member."}
              >
                {AGENCY_ROLE_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={isLoading}
            >
              Add member
            </Button>
          </CardActions>
        </Stack>
      </Box>
    </Drawer>
  );
}
