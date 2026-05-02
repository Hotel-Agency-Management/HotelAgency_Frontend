"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AddTeamDrawer } from "./AddTeamDrawer";
import { AssignTeamMemberRoleDialog } from "./AssignTeamMemberRoleDialog";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { useUserManagementPage } from "../hooks/useUserManagementPage";

export function UserManagementPage() {
  const { t } = useTranslation();
  const {
    isSuperAdmin,
    isLoading,
    isLoadingAgencies,
    hasSelectedAgency,
    agencies,
    selectedAgencyId,
    setSelectedAgencyId,
    members,
    isDrawerOpen,
    roleMember,
    setRoleMember,
    handleOpenDrawer,
    handleCloseDrawer,
    handleCloseRoleDialog,
    handleAddMember,
    handleUpdateMemberRole,
  } = useUserManagementPage();

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Stack spacing={0.75}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Users size={20} />
              <Typography variant="h5">
                {t("users.title", "User Management")}
              </Typography>
            </Stack>
            <Typography variant="body2">
              {t(
                "users.subtitle",
                "Manage the agency team and choose which members can be assigned as hotel managers."
              )}
            </Typography>
          </Stack>

          <Button
            variant="contained"
            disableElevation
            startIcon={<Plus size={16} />}
            onClick={handleOpenDrawer}
            disabled={!hasSelectedAgency || isLoadingAgencies}
          >
            {t("users.addTeam", "Add Team")}
          </Button>
        </Stack>

        {isSuperAdmin ? (
          <Stack spacing={0.5} sx={{ maxWidth: 360 }}>
            <Select
              size="small"
              displayEmpty
              value={selectedAgencyId}
              onChange={event => setSelectedAgencyId(event.target.value)}
              disabled={isLoadingAgencies}
              renderValue={value =>
                value
                  ? agencies.find(a => String(a.id) === value)?.name
                  : "Select an agency"
              }
            >
              {agencies.map(agency => (
                <MenuItem key={agency.id} value={String(agency.id)}>
                  {agency.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {isLoadingAgencies
                ? "Loading agencies..."
                : "Choose the agency before loading or adding team members."}
            </FormHelperText>
          </Stack>
        ) : null}

        <TeamMembersGrid members={members} onEditRole={setRoleMember} />
      </Stack>

      <AddTeamDrawer
        open={isDrawerOpen}
        isLoading={isLoading}
        onClose={handleCloseDrawer}
        onAddMember={handleAddMember}
      />
      <AssignTeamMemberRoleDialog
        open={!!roleMember}
        member={roleMember}
        isLoading={isLoading}
        onClose={handleCloseRoleDialog}
        onSave={handleUpdateMemberRole}
      />
    </Container>
  );
}
