import {
  BED_TYPE,
  CreateRoomDto,
  Room,
  RoomFilters,
  RoomPhoto,
  ROOM_STATUS,
  UpdateRoomDto,
} from "../types/room";
import { sleep } from "../util/delay";

// TODO: Remove when integrating backend

/** Stable Unsplash URLs for mock gallery (hotel / room interiors). */
const US = (photoId: string, targetWidth = 1600) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${targetWidth}&q=80`;

let mockRooms: Room[] = [
  {
    id: "1",
    roomNumber: "101",
    floorNumber: 1,
    roomTypeId: "1",
    status: ROOM_STATUS.AVAILABLE,
    description: "Cozy single room with garden view",
    notes: "",
    capacity: 1,
    bedType: BED_TYPE.SINGLE,
    starRating: 3,
    amenities: ["wifi", "ac", "tv"],
    photos: [
      {
        id: "1a",
        url: US("photo-1631049307264-da0ec9d70304"),
        isPrimary: true,
      },
      {
        id: "1b",

        url: US("photo-1590490360182-c33d57733427", 1200),
      },
      {
        id: "1c",
        url: US("photo-1582719478250-c89cae4dc85b", 1200),
      },
      {
        id: "1d",
        url: US("photo-1566665797739-1674de7a421a", 1200),
      },
    ],
    pricePerNight: 80,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    roomNumber: "201",
    floorNumber: 2,
    roomTypeId: "2",
    status: ROOM_STATUS.OCCUPIED,
    description: "Spacious double room with city view",
    notes: "VIP guest",
    capacity: 2,
    bedType: BED_TYPE.QUEEN,
    starRating: 4,
    amenities: ["wifi", "minibar", "ac", "tv", "balcony"],
    photos: [
      {
        id: "2a",
        url: US("photo-1566073771259-6a8506099945"),
        isPrimary: true,
      },
      {
        id: "2b",
        url: US("photo-1598928636135-d146006ff4be", 1200),
      },
      {
        id: "2c",
        url: US("photo-1566073771259-6a8506099945", 1200),
      },
    ],
    pricePerNight: 150,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    roomNumber: "301",
    floorNumber: 3,
    roomTypeId: "3",
    status: ROOM_STATUS.RESERVED,
    description: "Luxury suite with panoramic view",
    notes: "",
    capacity: 3,
    bedType: BED_TYPE.KING,
    starRating: 5,
    amenities: ["wifi", "minibar", "jacuzzi", "ac", "tv", "balcony", "spa"],
    photos: [
      {
        id: "3a",
        url: US("photo-1578683010236-d716f9a3f461"),

        isPrimary: true,
      },
      {
        id: "3b",
        url: US("photo-1618221195710-dd6b41faaea6", 1200),
      },
      {
        id: "3c",
        url: US("photo-1600210492493-0946911123ea", 1200),
      },
      {
        id: "3d",
        url: US("photo-1502672260266-1c1ef2d93688", 1200),
      },
    ],
    pricePerNight: 350,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// TODO: Remove when integrating backend — replace entire roomsApi with real API calls
export const roomsApi = {
  getAll: async (filters?: RoomFilters): Promise<Room[]> => {
    await sleep(500); // TODO: Remove when integrating backend
    let result = [...mockRooms];

    if (filters?.status) result = result.filter((r) => r.status === filters.status);
    if (filters?.roomTypeId)
      result = result.filter((r) => r.roomTypeId === filters.roomTypeId);
    if (filters?.floor) result = result.filter((r) => r.floorNumber === filters.floor);
    if (filters?.search)
      result = result.filter(
        (r) =>
          r.roomNumber.includes(filters.search!) ||
          r.description?.toLowerCase().includes(filters.search!.toLowerCase())
      );

    return result;
  },

  getById: async (id: string): Promise<Room> => {
    await sleep(300); // TODO: Remove when integrating backend
    const room = mockRooms.find((r) => r.id === id);
    if (!room) throw new Error("Room not found");
    return room;
  },

  create: async (dto: CreateRoomDto): Promise<Room> => {
    await sleep(500); // TODO: Remove when integrating backend
    const newRoom: Room = {
      ...dto,
      id: Date.now().toString(),
      photos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockRooms.push(newRoom);
    return newRoom;
  },

  update: async (id: string, dto: UpdateRoomDto): Promise<Room> => {
    await sleep(500); // TODO: Remove when integrating backend
    const index = mockRooms.findIndex((r) => r.id === id);
    if (index === -1) throw new Error("Room not found");
    mockRooms[index] = { ...mockRooms[index], ...dto, updatedAt: new Date().toISOString() };
    return mockRooms[index];
  },

  updatePhotos: async (id: string, photos: RoomPhoto[]): Promise<Room> => {
    await sleep(400); // TODO: Remove when integrating backend
    const index = mockRooms.findIndex((r) => r.id === id);
    if (index === -1) throw new Error("Room not found");
    mockRooms[index] = {
      ...mockRooms[index],
      photos: photos.map((p) => ({ ...p })),
      updatedAt: new Date().toISOString(),
    };
    return mockRooms[index];
  },

  delete: async (id: string): Promise<void> => {
    await sleep(300); // TODO: Remove when integrating backend
    mockRooms = mockRooms.filter((r) => r.id !== id);
  },

  importExcel: async (): Promise<{ imported: number; failed: number }> => {
    await sleep(1000); // TODO: Remove when integrating backend
    return { imported: 5, failed: 0 };
  },
};
