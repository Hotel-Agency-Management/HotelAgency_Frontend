import { AgencyProfile } from "../types/agencyProfile";

export const MOCK_PROFILE: AgencyProfile = {
  name: "Bright Horizons Agency",
  phone: "+1 555 000 1234",
  city: "San Francisco",
  files: [
    {
      id: "1",
      name: "Agency License.pdf",
      url: "#",
      type: "application/pdf",
    },
    {
      id: "2",
      name: "logo-full.png",
      url: "#",
      type: "image/png",
    },
    {
      id: "3",
      name: "Contract Template.pdf",
      url: "#",
      type: "application/pdf",
    },
    {
      id: "4",
      name: "Team Photo.jpg",
      url: "#",
      type: "image/jpeg",
    },
  ],
};
