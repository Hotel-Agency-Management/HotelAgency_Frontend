import { useState } from "react";
import { useAuth } from "@/core/context/AuthContext";
import { USER_ROLES, type UserRole } from "@/lib/abilities";
import { useTeamMembers } from "./useTeamMembers";
import { useGetAdminAgencyOptions } from "./queries/useAgencyOptionQueries";
import type { AgencyTeamMember, AgencyTeamMemberInput } from "../config/teamMemberConfig";

export function useUserManagementPage() {
  const { user } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [roleMember, setRoleMember] = useState<AgencyTeamMember | null>(null);

  const isSuperAdmin = user?.role === USER_ROLES.SUPER_ADMIN;
  const initialAgencyId =
    user?.agencyId && Number(user.agencyId) > 0 ? String(user.agencyId) : "";
  const [selectedAgencyId, setSelectedAgencyId] = useState(initialAgencyId);

  const { data: agencies = [], isLoading: isLoadingAgencies } =
    useGetAdminAgencyOptions(isSuperAdmin);

  const selectedAgencyIdNumber = selectedAgencyId ? Number(selectedAgencyId) : undefined;
  const hasSelectedAgency = !isSuperAdmin || Number(selectedAgencyIdNumber) > 0;

  const { members, isLoading, addMember, updateMemberRole } = useTeamMembers(
    undefined,
    selectedAgencyIdNumber
  );

  const handleOpenDrawer = () => {
    if (!hasSelectedAgency) return;
    setIsDrawerOpen(true);
  };

  const handleAddMember = async (values: AgencyTeamMemberInput) => {
    try {
      await addMember(values);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateMemberRole = async (memberId: string, role: UserRole) => {
    try {
      await updateMemberRole(memberId, role);
    } catch (error) {
      throw error;
    }
  };

  return {
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
    handleCloseDrawer: () => setIsDrawerOpen(false),
    handleCloseRoleDialog: () => setRoleMember(null),
    handleAddMember,
    handleUpdateMemberRole,
  };
}
