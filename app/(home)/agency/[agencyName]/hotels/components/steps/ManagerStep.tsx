"use client";
import Link from "next/link";
import { Controller, useFormContext } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useAgencyTeamStore } from "@/app/(home)/agency/hooks/useAgencyTeamStore";
import {
  canAssignAsHotelManager,
  getAgencyTeamMemberName,
  getRoleLabel,
} from "@/app/(home)/agency/types/teamMember";
import type { HotelFormValues } from "../../types/hotel";
import { StepLayout } from "../layout/StepLayout";

interface ManagerStepProps {
  isFirst: boolean;
  isLast: boolean;
  isSubmitting: boolean;
  mode?: 'add' | 'edit';
  onBack: () => void;
  onNext: () => void;
}

export function ManagerStep({ isFirst, isLast, isSubmitting, mode, onBack, onNext }: ManagerStepProps) {
  const { agencyName } = useParams<{ agencyName: string }>();
  const { members, getMemberById } = useAgencyTeamStore();
  const {
    control,
    watch,
    trigger,
  } = useFormContext<HotelFormValues>();

  const selectedManagerId = watch("managerId");
  const selectedManager = selectedManagerId ? getMemberById(selectedManagerId) : undefined;
  const eligibleManagers = members.filter(member => canAssignAsHotelManager(member.role));
  const managerOptions =
    selectedManager && !eligibleManagers.some(member => member.id === selectedManager.id)
      ? [selectedManager, ...eligibleManagers]
      : eligibleManagers;

  const handleNext = async () => {
    const valid = await trigger("managerId");
    if (valid) onNext();
  };

  return (
    <StepLayout
      title="Manager assignment"
      subtitle="Choose the hotel manager from the agency team. Team members are managed separately in User Management."
      isFirst={isFirst}
      isLast={isLast}
      isSubmitting={isSubmitting}
      mode={mode}
      onBack={onBack}
      onNext={handleNext}
    >
      <Stack spacing={2.5}>
        {eligibleManagers.length === 0 && (
          <Alert
            severity="warning"
            variant="outlined"
            action={
              <Button
                component={Link}
                href={`/agency/${agencyName}/users`}
                size="small"
                color="inherit"
              >
                Open users
              </Button>
            }
          >
            Add at least one Admin or Manager in User Management before creating the hotel.
          </Alert>
        )}

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="managerId"
              control={control}
              rules={{ required: "Manager selection is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  size="small"
                  label="Hotel manager"
                  disabled={managerOptions.length === 0}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message ??
                    "Only team members with Admin or Manager roles can be assigned."
                  }
                >
                  <MenuItem value="" disabled>
                    Select a manager
                  </MenuItem>
                  {managerOptions.map(member => (
                    <MenuItem key={member.id} value={member.id}>
                      {getAgencyTeamMemberName(member)} • {getRoleLabel(member.role)}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>

        {selectedManager && (
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ borderRadius: 2.5, p: 2.5 }}
          >
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  Selected manager
                </Typography>
                <Chip size="small" label={getRoleLabel(selectedManager.role)} color="primary" variant="outlined" />
              </Stack>
              <Typography variant="body1">{getAgencyTeamMemberName(selectedManager)}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedManager.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedManager.phone}
              </Typography>
            </Stack>
          </Paper>
        )}
      </Stack>
    </StepLayout>
  );
}
