"use client";

import { Controller, useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { MuiTelInput } from "mui-tel-input";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  AGENCY_ROLE_OPTIONS,
  type AgencyTeamMemberInput,
} from "../config/teamMemberConfig";
import { addTeamDrawerStyles } from "./AddTeamDrawer.styles";
import { defaultTeamMemberValues, EMAIL_PATTERN } from "./userManagement";

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
  const { t } = useTranslation();
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
        sx: addTeamDrawerStyles.paper,
      }}
    >
      <Box
        component="form"
        onSubmit={event => void handleSubmit(event)}
        noValidate
        sx={addTeamDrawerStyles.form}
      >
        <Stack sx={addTeamDrawerStyles.contentStack}>
          <CardHeader
            title={t("users.addTeamMember", "Add Team Member")}
            subheader={t(
              "users.addTeamMemberSubheader",
              "Add a user and assign the role they should have in the agency."
            )}
            action={
              <IconButton size="small" onClick={handleClose}>
                <X size={18} />
              </IconButton>
            }
          />

          <CardContent sx={addTeamDrawerStyles.content}>
            <Stack spacing={2.5} sx={addTeamDrawerStyles.contentBody}>
              <Stack spacing={2.5}>
                <Alert severity="info" variant="outlined">
                  {t(
                    "users.hotelManagerInfo",
                    "Only team members with the Property Manager role will appear when selecting a hotel manager."
                  )}
                </Alert>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    {...form.register("firstName", {
                      required: t("users.firstNameRequired", "First name is required"),
                    })}
                    fullWidth
                    size="small"
                    label={t("users.firstName", "First name")}
                    error={!!form.formState.errors.firstName}
                    helperText={form.formState.errors.firstName?.message}
                  />
                  <TextField
                    {...form.register("lastName", {
                      required: t("users.lastNameRequired", "Last name is required"),
                    })}
                    fullWidth
                    size="small"
                    label={t("users.lastName", "Last name")}
                    error={!!form.formState.errors.lastName}
                    helperText={form.formState.errors.lastName?.message}
                  />
                </Stack>

                <TextField
                  {...form.register("email", {
                    required: t("users.emailRequired", "Email is required"),
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: t("users.emailInvalid", "Invalid email address"),
                    },
                  })}
                  fullWidth
                  size="small"
                  type="email"
                  label={t("users.email", "Email")}
                  error={!!form.formState.errors.email}
                  helperText={form.formState.errors.email?.message}
                />

                <Controller
                  name="phoneNumber"
                  control={form.control}
                  rules={{ required: t("users.phoneRequired", "Phone is required") }}
                  render={({ field, fieldState }) => (
                    <MuiTelInput
                      {...field}
                      fullWidth
                      size="small"
                      label={t("users.phone", "Phone")}
                      defaultCountry="US"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

                <TextField
                  {...form.register("role", {
                    required: t("users.roleRequired", "Role is required"),
                  })}
                  select
                  fullWidth
                  size="small"
                  label={t("users.role", "Role")}
                  error={!!form.formState.errors.role}
                  helperText={
                    form.formState.errors.role?.message ??
                    t("users.roleHelperText", "Choose the access level for this team member.")
                  }
                >
                  {AGENCY_ROLE_OPTIONS.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                sx={addTeamDrawerStyles.actions}
              >
                <Button color="inherit" onClick={handleClose}>
                  {t("common.cancel", "Cancel")}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  disabled={isLoading}
                >
                  {t("users.addMember", "Add member")}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Stack>
      </Box>
    </Drawer>
  );
}
