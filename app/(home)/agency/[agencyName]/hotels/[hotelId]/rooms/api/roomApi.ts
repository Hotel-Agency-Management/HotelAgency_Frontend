import {
  CreateRoomDto,
  Room,
  RoomFilters,
  RoomPhoto,
  UpdateRoomDto,
} from "../types/room";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let mockRooms: Room[] = [
  {
    id: "1",
    roomNumber: "101",
    floorNumber: 1,
    roomTypeId: "1",
    status: "available",
    description: "Cozy single room with garden view",
    notes: "",
    capacity: 1,
    bedType: "single",
    starRating: 3,
    amenities: ["wifi", "ac", "tv"],
    photos: [],
    pricePerNight: 80,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    roomNumber: "201",
    floorNumber: 2,
    roomTypeId: "2",
    status: "occupied",
    description: "Spacious double room with city view",
    notes: "VIP guest",
    capacity: 2,
    bedType: "queen",
    starRating: 4,
    amenities: ["wifi", "minibar", "ac", "tv", "balcony"],
    photos: [],
    pricePerNight: 150,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    roomNumber: "301",
    floorNumber: 3,
    roomTypeId: "3",
    status: "reserved",
    description: "Luxury suite with panoramic view",
    notes: "",
    capacity: 3,
    bedType: "king",
    starRating: 5,
    amenities: ["wifi", "minibar", "jacuzzi", "ac", "tv", "balcony", "spa"],
    photos: [],
    pricePerNight: 350,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const roomsApi = {
  getAll: async (filters?: RoomFilters): Promise<Room[]> => {
    await delay(500);
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
    await delay(300);
    const room = mockRooms.find((r) => r.id === id);
    if (!room) throw new Error("Room not found");
    return room;
  },

  create: async (dto: CreateRoomDto): Promise<Room> => {
    await delay(500);
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
    await delay(500);
    const index = mockRooms.findIndex((r) => r.id === id);
    if (index === -1) throw new Error("Room not found");
    mockRooms[index] = { ...mockRooms[index], ...dto, updatedAt: new Date().toISOString() };
    return mockRooms[index];
  },

  updatePhotos: async (id: string, photos: RoomPhoto[]): Promise<Room> => {
    await delay(400);
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
    await delay(300);
    mockRooms = mockRooms.filter((r) => r.id !== id);
  },

  importExcel: async (file: File): Promise<{ imported: number; failed: number }> => {
    await delay(1000);
    return { imported: 5, failed: 0 };
  },
};
