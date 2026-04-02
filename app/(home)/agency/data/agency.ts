import { AgencyProfile } from "../types/agencyProfile";
import { DOCUMENT_TYPES } from "../constants/documentTypes";

export const MOCK_PROFILE: AgencyProfile = {
  name: "Bright Horizons Agency",
  phone: "+1 555 000 1234",
  city: "San Francisco",
  files: [
    {
      id: "1",
      name: "Agency License.pdf",
      documentType: DOCUMENT_TYPES[0],
      url: "#",
      type: "application/pdf",
    },
    {
      id: "2",
      name: "logo-full.png",
      documentType: DOCUMENT_TYPES[1],
      url: "#",
      type: "application/pdf",
    },
    {
      id: "3",
      name: "Contract Template.pdf",
      documentType: DOCUMENT_TYPES[4],
      url: "#",
      type: "application/pdf",
    },
    {
      id: "4",
      name: "Team Photo.jpg",
      documentType: DOCUMENT_TYPES[7],
      url: "#",
      type: "application/pdf",
    },
  ],
};
