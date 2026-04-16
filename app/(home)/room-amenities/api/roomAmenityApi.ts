import type {
  CreateRoomAmenityDto,
  RoomAmenity,
  RoomAmenityFilters,
  UpdateRoomAmenityDto,
} from "../types/roomAmenity";
import { sleep } from "../../agency/hotels/[hotelId]/rooms/util/delay";

const mockAmenitySeed: Pick<RoomAmenity, "id" | "title" | "icon">[] = [
  {
    id: "wifi",
    title: "High-Speed Wi-Fi",
    icon: "wifi",
  },
  {
    id: "minibar",
    title: "Stocked Minibar",
    icon: "minibar",
  },
  {
    id: "balcony",
    title: "Private Balcony",
    icon: "balcony",
  },
  {
    id: "jacuzzi",
    title: "In-Room Jacuzzi",
    icon: "jacuzzi",
  },
  {
    id: "ac",
    title: "Climate Control",
    icon: "ac",
  },
  {
    id: "tv",
    title: "Smart TV",
    icon: "tv",
  },
  {
    id: "safe",
    title: "In-Room Safe",
    icon: "safe",
  },
  {
    id: "breakfast",
    title: "Complimentary Daily Breakfast Buffet with Fresh Juices and International Menu",
    icon: "breakfast",
  },
  {
    id: "workspace",
    title: "Work Desk",
    icon: "workspace",
  },
  {
    id: "coffee-machine",
    title: "Coffee Machine",
    icon: "coffee",
  },
];

let mockRoomAmenities: RoomAmenity[] = mockAmenitySeed.map((amenity) => {
  return {
    id: amenity.id,
    title: amenity.title,
    icon: amenity.icon,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
});

function normalizeId(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function matchesSearch(amenity: RoomAmenity, search: string) {
  const normalized = search.toLowerCase();

  return amenity.title.toLowerCase().includes(normalized);
}

export const roomAmenityApi = {
  getAll: async (filters?: RoomAmenityFilters): Promise<RoomAmenity[]> => {
    await sleep(300);
    let result = [...mockRoomAmenities];

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
    const title = dto.title.trim();
    const id = normalizeId(title);
    const duplicate = mockRoomAmenities.some(
      (amenity) => amenity.title.toLowerCase() === title.toLowerCase()
    );
    if (duplicate) throw new Error("Amenity title already exists");

    const newAmenity: RoomAmenity = {
      id,
      title,
      icon: dto.icon,
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

    const nextTitle = dto.title?.trim() ?? mockRoomAmenities[index].title;
    const duplicate = mockRoomAmenities.some(
      (amenity) =>
        amenity.id !== id && amenity.title.toLowerCase() === nextTitle.toLowerCase()
    );
    if (duplicate) throw new Error("Amenity title already exists");

    mockRoomAmenities[index] = {
      ...mockRoomAmenities[index],
      title: nextTitle,
      icon: dto.icon ?? mockRoomAmenities[index].icon,
      updatedAt: new Date().toISOString(),
    };

    return mockRoomAmenities[index];
  },

  delete: async (id: string): Promise<void> => {
    await sleep(250);
    mockRoomAmenities = mockRoomAmenities.filter((amenity) => amenity.id !== id);
  },
};
