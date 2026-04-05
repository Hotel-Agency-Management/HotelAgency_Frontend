"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus, Users } from "lucide-react";
import { useAgencyTeamStore } from "@/app/(home)/agency/hooks/useAgencyTeamStore";
import type { AgencyTeamMemberInput } from "@/app/(home)/agency/types/teamMember";
import { AddTeamDrawer } from "./AddTeamDrawer";
import { TeamMembersGrid } from "./TeamMembersGrid";

export function UserManagementPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { members, isLoading, addMember, deleteMember } = useAgencyTeamStore();

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);
  const handleAddMember = async (values: AgencyTeamMemberInput) => {
    await addMember(values);
  };

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
              <Typography variant="h5">User Management</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Manage the agency team and choose which members can be assigned as hotel managers.
            </Typography>
          </Stack>

          <Button
            variant="contained"
            disableElevation
            startIcon={<Plus size={16} />}
            onClick={handleOpenDrawer}
          >
            Add Team
          </Button>
        </Stack>

        <TeamMembersGrid
          members={members}
          onDeleteMember={(id) => void deleteMember(id)}
        />
      </Stack>

      <AddTeamDrawer
        open={isDrawerOpen}
        isLoading={isLoading}
        onClose={handleCloseDrawer}
        onAddMember={handleAddMember}
      />
    </Container>
  );
}
