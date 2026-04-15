import type { AgencyTeamMemberInput } from "@/app/(home)/agency/types/teamMember";
import { USER_ROLES } from "@/lib/abilities";

export const defaultTeamMemberValues: AgencyTeamMemberInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: USER_ROLES.PROPERTY_MANAGER,
};
