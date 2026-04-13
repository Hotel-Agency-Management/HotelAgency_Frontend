import type { AgencyTeamMember } from "../types/teamMember";
import { USER_ROLES } from "@/lib/abilities";

export const MOCK_TEAM_MEMBERS: AgencyTeamMember[] = [
  {
    id: "team_admin_001",
    firstName: "Maya",
    lastName: "Bennett",
    email: "maya@brighthorizons.agency",
    phone: "+1 555 000 1200",
    role: USER_ROLES.AGENCY_OWNER,
  },
  {
    id: "team_manager_001",
    firstName: "James",
    lastName: "Anderson",
    email: "j.anderson@grandpalace.com",
    phone: "+1 212 555 0102",
    role: USER_ROLES.PROPERTY_MANAGER,
  },
  {
    id: "team_manager_002",
    firstName: "Sophie",
    lastName: "Williams",
    email: "s.williams@azuresea.co.uk",
    phone: "+44 20 7946 0302",
    role: USER_ROLES.PROPERTY_MANAGER,
  },
  {
    id: "team_manager_003",
    firstName: "Omar",
    lastName: "Al-Rashid",
    email: "o.alrashid@desertrose.ae",
    phone: "+971 4 555 0202",
    role: USER_ROLES.PROPERTY_MANAGER,
  },
  {
    id: "team_agent_001",
    firstName: "Nina",
    lastName: "Patel",
    email: "n.patel@brighthorizons.agency",
    phone: "+1 555 000 1220",
    role: USER_ROLES.FRONT_DESK_STAFF,
  },
];
