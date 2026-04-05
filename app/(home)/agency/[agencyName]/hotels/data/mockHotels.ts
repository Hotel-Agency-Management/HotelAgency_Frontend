import type { HotelFormValues } from "../types/hotel";

export const MOCK_HOTELS: (HotelFormValues & { id: string; isActive: boolean })[] = [
  {
    id: "1",
    isActive: true,
    basicInfo: {
      name: "Grand Palace Hotel",
      phone: "+1 212 555 0101",
      city: "New York",
      address: "123 Fifth Avenue, Manhattan",
      currency: "USD",
      coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    },
    branding: {
      logo: null,
      colors: { primary: "#1a1a2e", secondary: "#16213e", tertiary: "#0f3460" },
    },
    managerId: "team_manager_001",
  },
  {
    id: "2",
    isActive: true,
    basicInfo: {
      name: "Azure Sea Resort",
      phone: "+44 20 7946 0301",
      city: "London",
      address: "45 Harbour Road, Chelsea",
      currency: "GBP",
      coverImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    },
    branding: {
      logo: null,
      colors: { primary: "#0077b6", secondary: "#00b4d8", tertiary: "#90e0ef" },
    },
    managerId: "team_manager_002",
  },
  {
    id: "3",
    isActive: false,
    basicInfo: {
      name: "Desert Rose Inn",
      phone: "+971 4 555 0201",
      city: "Dubai",
      address: "Sheikh Zayed Road, Downtown",
      currency: "AED",
      coverImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    },
    branding: {
      logo: null,
      colors: { primary: "#c9a84c", secondary: "#a07040", tertiary: "#7a4f2e" },
    },
    managerId: "team_manager_003",
  },
];
