"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import type { UserRole } from "@/lib/abilities";
import {
  AGENCY_ROLE_OPTIONS,
  getAgencyTeamMemberName,
  type AgencyTeamMember,
} from "../config/teamMemberConfig";
import toast from "react-hot-toast";

interface AssignTeamMemberRoleDialogProps {
  open: boolean;
  member: AgencyTeamMember | null;
  isLoading: boolean;
  onClose: () => void;
  onSave: (memberId: string, role: UserRole) => Promise<void>;
}

export function AssignTeamMemberRoleDialog({
  open,
  member,
  isLoading,
  onClose,
  onSave,
}: AssignTeamMemberRoleDialogProps) {
  const { t } = useTranslation();
  const [role, setRole] = useState<UserRole | "">("");

  useEffect(() => {
    setRole(member?.role ?? "");
  }, [member]);

  const handleSave = async () => {
  if (!member || !role) return;

    try {
    await onSave(member.id, role);
    onClose();
    } catch (error) {
    toast.error(t('users.updateRoleFailed', 'Failed to update member role'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{t('users.assignRole', 'Assign role')}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {member ? (
            <Typography variant="body2" color="text.secondary">
              {getAgencyTeamMemberName(member)}
            </Typography>
          ) : null}

          <TextField
            select
            fullWidth
            size="small"
            label={t('users.role', 'Role')}
            value={role}
            onChange={event => setRole(event.target.value as UserRole)}
          >
            {AGENCY_ROLE_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose} disabled={isLoading}>
          {t('common.cancel', 'Cancel')}
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => void handleSave()}
          disabled={isLoading || !member || !role || role === member.role}
        >
          {t('users.save', 'Save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
