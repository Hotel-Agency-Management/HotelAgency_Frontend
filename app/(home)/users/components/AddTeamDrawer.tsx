"use client";

import { Controller, useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
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
import {
  AddTeamDrawerRoot,
  DrawerActions,
  DrawerContent,
  DrawerContentBody,
  DrawerContentStack,
  DrawerForm,
} from "./AddTeamDrawer.styles";
import { defaultTeamMemberValues, EMAIL_PATTERN } from "../constants/teamMember";

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
    try {
      await onAddMember(values);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <AddTeamDrawerRoot anchor="right" open={open} onClose={handleClose}>
      <DrawerForm onSubmit={event => void handleSubmit(event)} noValidate>
        <DrawerContentStack>
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

          <DrawerContent>
            <DrawerContentBody spacing={2.5}>
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

              <DrawerActions direction="row" spacing={2}>
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
              </DrawerActions>
            </DrawerContentBody>
          </DrawerContent>
        </DrawerContentStack>
      </DrawerForm>
    </AddTeamDrawerRoot>
  );
}
