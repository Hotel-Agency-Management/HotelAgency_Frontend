import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_TEAM_MEMBERS } from "../data/teamMembers";
import type { AgencyTeamMember, AgencyTeamMemberInput } from "../types/teamMember";

interface AgencyTeamStore {
  members: AgencyTeamMember[];
  isLoading: boolean;
  addMember: (member: AgencyTeamMemberInput) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  getMemberById: (id: string) => AgencyTeamMember | undefined;
}

const mergeTeamMembers = (persistedMembers?: AgencyTeamMember[]) => {
  const mergedMembers = new Map<string, AgencyTeamMember>();

  MOCK_TEAM_MEMBERS.forEach(member => {
    mergedMembers.set(member.id, member);
  });

  persistedMembers?.forEach(member => {
    mergedMembers.set(member.id, member);
  });

  return Array.from(mergedMembers.values());
};

export const useAgencyTeamStore = create<AgencyTeamStore>()(
  persist(
    (set, get) => ({
      members: MOCK_TEAM_MEMBERS,
      isLoading: false,

      addMember: async (member) => {
        set({ isLoading: true });
        try {
          const newMember: AgencyTeamMember = {
            ...member,
            id: crypto.randomUUID(),
          };

          set(state => ({ members: [newMember, ...state.members] }));
        } finally {
          set({ isLoading: false });
        }
      },

      deleteMember: async (id) => {
        set({ isLoading: true });
        try {
          set(state => ({ members: state.members.filter(member => member.id !== id) }));
        } finally {
          set({ isLoading: false });
        }
      },

      getMemberById: (id) => get().members.find(member => member.id === id),
    }),
    {
      name: "agency-team-store",
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<AgencyTeamStore> | undefined;

        return {
          ...currentState,
          ...persisted,
          members: mergeTeamMembers(persisted?.members),
        };
      },
    }
  )
);
