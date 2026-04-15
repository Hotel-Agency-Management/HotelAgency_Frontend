import {
  ROOM_AMENITY_CATEGORY,
  ROOM_AMENITY_STATUS,
  type CreateRoomAmenityDto,
  type RoomAmenity,
  type RoomAmenityFilters,
  type RoomAmenityPhoto,
  type UpdateRoomAmenityDto,
} from "../types/roomAmenity";
import { sleep } from "../util/delay";

const US = (photoId: string, targetWidth = 1200) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${targetWidth}&q=80`;

const mockAmenitySeed: Array<
  Omit<RoomAmenity, "id" | "photos" | "createdAt" | "updatedAt"> & {
    photoId: string;
    secondaryPhotoId?: string;
  }
> = [
  {
    key: "wifi",
    label: "High-Speed Wi-Fi",
    category: ROOM_AMENITY_CATEGORY.ACCESS,
    description: "Reliable high-speed internet for remote work, streaming, and calls.",
    status: ROOM_AMENITY_STATUS.ACTIVE,
    photoId: "photo-1516321318423-f06f85e504b3",
  },
  {
    key: "minibar",
    label: "Stocked Minibar",
    category: ROOM_AMENITY_CATEGORY.DINING,
    description: "Chilled drinks and curated snacks prepared inside the guest room.",
    status: ROOM_AMENITY_STATUS.ACTIVE,
    photoId: "photo-1589733955941-5eeaf752f6dd",
  },
  {
    key: "balcony",
    label: "Private Balcony",
    category: ROOM_AMENITY_CATEGORY.COMFORT,
    description: "Outdoor seating space for fresh air, morning coffee, and city views.",
    status: ROOM_AMENITY_STATUS.ACTIVE,
    photoId: "photo-1761039265583-9489b4246454",
    secondaryPhotoId: "photo-1733829994889-4a224e674c7b",
  },
  {
    key: "jacuzzi",
    label: "In-Room Jacuzzi",
    category: ROOM_AMENITY_CATEGORY.BATHROOM,
    description: "Private jacuzzi bath for premium rooms and suites.",
    status: ROOM_AMENITY_STATUS.ACTIVE,
    photoId: "photo-1584622650111-993a426fbf0a",
  },
  {
    key: "ac",
    label: "Climate Control",
    category: ROOM_AMENITY_CATEGORY.COMFORT,
    description: "Individually controlled cooling and heating for guest comfort.",
    status: ROOM_AMENITY_STATUS.ACTIVE,
    photoId: "photo-1560448204-e02f11c3d0e2",
  },
  {
    key: "tv",
    label: "Smart TV",
    category: ROOM_AMENITY_CATEGORY.ENTERTAINMENT,
    description: "Large smart TV with streaming-ready entertainment setup.",
    status: ROOM_AMENITY_STATUS.ACTIVE,
    photoId: "photo-1593305841991-05c297ba4575",
  },
  {
    key: "safe",
    label: "In-Room Safe",
    category: ROOM_AMENITY_CATEGORY.SECURITY,
    description: "Secure storage for passports, wallets, electronics, and valuables.",
    status: ROOM_AMENITY_STATUS.ACTIVE,
    photoId: "photo-1554224155-6726b3ff858f",
  },
  {
    key: "breakfast",
    label: "Breakfast Included",
    category: ROOM_AMENITY_CATEGORY.DINING,
    description: "Room package includes breakfast service for registered guests.",
    status: ROOM_AMENITY_STATUS.ACTIVE,
    photoId: "photo-1533089860892-a7c6f0a88666",
    secondaryPhotoId: "photo-1493770348161-369560ae357d",
  },
  {
    key: "workspace",
    label: "Work Desk",
    category: ROOM_AMENITY_CATEGORY.COMFORT,
    description: "Comfortable work desk with lighting and charging access.",
    status: ROOM_AMENITY_STATUS.ACTIVE,
    photoId: "photo-1497366754035-f200968a6e72",
  },
  {
    key: "coffee-machine",
    label: "Coffee Machine",
    category: ROOM_AMENITY_CATEGORY.DINING,
    description: "In-room coffee machine with capsules and tea setup.",
    status: ROOM_AMENITY_STATUS.ACTIVE,
    photoId: "photo-1495474472287-4d71bcdd2085",
  },
];

let mockRoomAmenities: RoomAmenity[] = mockAmenitySeed.map((amenity) => {
  return {
    id: `amenity-${amenity.key}`,
    key: amenity.key,
    label: amenity.label,
    description: amenity.description,
    category: amenity.category,
    status: amenity.status,
    photos: [
      {
        id: `amenity-${amenity.key}-photo`,
        url: US(amenity.photoId),
        isPrimary: true,
      },
      ...(amenity.secondaryPhotoId
        ? [
            {
              id: `amenity-${amenity.key}-photo-secondary`,
              url: US(amenity.secondaryPhotoId, 1000),
            },
          ]
        : []),
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
});

function normalizeKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function matchesSearch(amenity: RoomAmenity, search: string) {
  const normalized = search.toLowerCase();

  return (
    amenity.key.toLowerCase().includes(normalized) ||
    amenity.label.toLowerCase().includes(normalized) ||
    amenity.description.toLowerCase().includes(normalized) ||
    amenity.category.toLowerCase().includes(normalized)
  );
}

export const roomAmenityApi = {
  getAll: async (filters?: RoomAmenityFilters): Promise<RoomAmenity[]> => {
    await sleep(300);
    let result = [...mockRoomAmenities];

    if (filters?.status) {
      result = result.filter((amenity) => amenity.status === filters.status);
    }

    if (filters?.category) {
      result = result.filter((amenity) => amenity.category === filters.category);
    }

    if (filters?.search) {
      result = result.filter((amenity) => matchesSearch(amenity, filters.search!));
    }

    return result;
  },

  getById: async (id: string): Promise<RoomAmenity> => {
    await sleep(200);
    const amenity = mockRoomAmenities.find((item) => item.id === id);
    if (!amenity) throw new Error("Room amenity not found");

    return amenity;
  },

  create: async (dto: CreateRoomAmenityDto): Promise<RoomAmenity> => {
    await sleep(350);
    const key = normalizeKey(dto.key);
    const duplicate = mockRoomAmenities.some((amenity) => amenity.key === key);
    if (duplicate) throw new Error("Amenity key already exists");

    const newAmenity: RoomAmenity = {
      ...dto,
      key,
      id: `amenity-${Date.now()}`,
      photos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockRoomAmenities.push(newAmenity);
    return newAmenity;
  },

  update: async (id: string, dto: UpdateRoomAmenityDto): Promise<RoomAmenity> => {
    await sleep(350);
    const index = mockRoomAmenities.findIndex((amenity) => amenity.id === id);
    if (index === -1) throw new Error("Room amenity not found");

    const nextKey = dto.key ? normalizeKey(dto.key) : mockRoomAmenities[index].key;
    const duplicate = mockRoomAmenities.some(
      (amenity) => amenity.id !== id && amenity.key === nextKey
    );
    if (duplicate) throw new Error("Amenity key already exists");

    mockRoomAmenities[index] = {
      ...mockRoomAmenities[index],
      ...dto,
      key: nextKey,
      updatedAt: new Date().toISOString(),
    };

    return mockRoomAmenities[index];
  },

  updatePhotos: async (id: string, photos: RoomAmenityPhoto[]): Promise<RoomAmenity> => {
    await sleep(300);
    const index = mockRoomAmenities.findIndex((amenity) => amenity.id === id);
    if (index === -1) throw new Error("Room amenity not found");

    mockRoomAmenities[index] = {
      ...mockRoomAmenities[index],
      photos: photos.map((photo) => ({ ...photo })),
      updatedAt: new Date().toISOString(),
    };

    return mockRoomAmenities[index];
  },

  delete: async (id: string): Promise<void> => {
    await sleep(250);
    mockRoomAmenities = mockRoomAmenities.filter((amenity) => amenity.id !== id);
  },
};
