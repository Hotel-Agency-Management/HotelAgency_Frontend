import type {
  CreateFacilityDto,
  FacilityFilters,
  FacilityPhoto,
  HotelFacility,
  UpdateFacilityDto,
} from "../types/facility";
import { FACILITY_STATUS } from "../types/facility";
import { sleep } from "../utils/delay";

const US = (photoId: string, targetWidth = 1600) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${targetWidth}&q=80`;

let mockFacilities: HotelFacility[] = [
  {
    id: "facility-1",
    hotelId: "1",
    name: "Infinity Rooftop Pool",
    facilityType: "Recreation",
    description: "Sunset pool deck with loungers, palm shade, and skyline views",
    status: FACILITY_STATUS.AVAILABLE,
    openAt: "07:00:00",
    closeAt: "23:00:00",
    photos: [
      {
        id: "facility-1a",
        url: US("photo-1758192838598-a1de4da5dcaf"),
        isPrimary: true,
      },
      {
        id: "facility-1b",
        url: US("photo-1746475611952-1b12c680f3bc", 1200),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "facility-2",
    hotelId: "1",
    name: "Serenity Spa & Sauna",
    facilityType: "Wellness",
    description: "Private treatment rooms, steam sauna, aromatherapy, and a quiet lounge",
    status: FACILITY_STATUS.AVAILABLE,
    openAt: "10:00:00",
    closeAt: "21:00:00",
    photos: [
      {
        id: "facility-2a",
        url: US("photo-1761470575018-135c213340eb"),
        isPrimary: true,
      },
      {
        id: "facility-2b",
        url: US("photo-1737352777897-e22953991a32", 1200),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "facility-3",
    hotelId: "1",
    name: "Signature Boardroom",
    facilityType: "Business",
    description: "Executive meeting room with presentation display and private service setup",
    status: FACILITY_STATUS.AVAILABLE,
    openAt: "09:00:00",
    closeAt: "19:00:00",
    photos: [
      {
        id: "facility-3a",
        url: US("photo-1745920770891-b46fc1799646"),
        isPrimary: true,
      },
      {
        id: "facility-3b",
        url: US("photo-1744095407215-66e40734e23a", 1200),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "facility-4",
    hotelId: "1",
    name: "Atrium Dining Room",
    facilityType: "Dining",
    description: "Elegant all-day restaurant for breakfast service and private dinners",
    status: FACILITY_STATUS.AVAILABLE,
    openAt: "06:30:00",
    closeAt: "23:30:00",
    photos: [
      {
        id: "facility-4a",
        url: US("photo-1674657704103-b153830ba294"),
        isPrimary: true,
      },
      {
        id: "facility-4b",
        url: US("photo-1724015736694-1ba74e91896e", 1200),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "facility-5",
    hotelId: "1",
    name: "Pulse Fitness Studio",
    facilityType: "Wellness",
    description: "Bright fitness center with cardio machines, weights, and towel service",
    status: FACILITY_STATUS.AVAILABLE,
    openAt: "05:30:00",
    closeAt: "23:00:00",
    photos: [
      {
        id: "facility-5a",
        url: US("photo-1571902943202-507ec2618e8f"),
        isPrimary: true,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "facility-6",
    hotelId: "1",
    name: "Grand Lobby Lounge",
    facilityType: "Services",
    description: "Marble reception lounge with concierge support and comfortable seating",
    status: FACILITY_STATUS.UNAVAILABLE,
    openAt: "00:00:00",
    closeAt: "23:59:00",
    photos: [
      {
        id: "facility-6a",
        url: US("photo-1758193783649-13371d7fb8dd"),
        isPrimary: true,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function normalizeTime(value: string) {
  return value.length === 5 ? `${value}:00` : value;
}

function normalizeFacilityDto<T extends CreateFacilityDto | UpdateFacilityDto>(dto: T): T {
  return {
    ...dto,
    openAt: dto.openAt ? normalizeTime(dto.openAt) : dto.openAt,
    closeAt: dto.closeAt ? normalizeTime(dto.closeAt) : dto.closeAt,
  };
}

export const facilityApi = {
  getAll: async (hotelId: string, filters?: FacilityFilters): Promise<HotelFacility[]> => {
    await sleep(400);
    let result = mockFacilities.filter((facility) => facility.hotelId === hotelId);

    if (filters?.status) {
      result = result.filter((facility) => facility.status === filters.status);
    }

    if (filters?.facilityType) {
      result = result.filter((facility) => facility.facilityType === filters.facilityType);
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (facility) =>
          facility.name.toLowerCase().includes(search) ||
          facility.facilityType.toLowerCase().includes(search) ||
          facility.description.toLowerCase().includes(search)
      );
    }

    return result;
  },

  getById: async (id: string): Promise<HotelFacility> => {
    await sleep(250);
    const facility = mockFacilities.find((item) => item.id === id);
    if (!facility) throw new Error("Facility not found");
    return facility;
  },

  create: async (hotelId: string, dto: CreateFacilityDto): Promise<HotelFacility> => {
    await sleep(500);
    const newFacility: HotelFacility = {
      ...normalizeFacilityDto(dto),
      id: `facility-${Date.now()}`,
      hotelId,
      photos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockFacilities.push(newFacility);
    return newFacility;
  },

  update: async (id: string, dto: UpdateFacilityDto): Promise<HotelFacility> => {
    await sleep(500);
    const index = mockFacilities.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Facility not found");

    mockFacilities[index] = {
      ...mockFacilities[index],
      ...normalizeFacilityDto(dto),
      updatedAt: new Date().toISOString(),
    };

    return mockFacilities[index];
  },

  updatePhotos: async (id: string, photos: FacilityPhoto[]): Promise<HotelFacility> => {
    await sleep(350);
    const index = mockFacilities.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Facility not found");

    mockFacilities[index] = {
      ...mockFacilities[index],
      photos: photos.map((photo) => ({ ...photo })),
      updatedAt: new Date().toISOString(),
    };

    return mockFacilities[index];
  },

  delete: async (id: string): Promise<void> => {
    await sleep(300);
    mockFacilities = mockFacilities.filter((facility) => facility.id !== id);
  },
};
