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
    photos: [{ id: "1a", url: US("photo-1631049307264-da0ec9d70304"), isPrimary: true }],
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
    photos: [{ id: "2a", url: US("photo-1566073771259-6a8506099945"), isPrimary: true }],
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
    photos: [{ id: "3a", url: US("photo-1578683010236-d716f9a3f461"), isPrimary: true }],
    pricePerNight: 350,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const roomsApi = {
  getAll: async (filters?: RoomFilters): Promise<Room[]> => {
    await sleep(500);
    let result = [...mockRooms];

    if (filters?.floor) result = result.filter((room) => room.floorNumber === filters.floor);
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (room) =>
          room.roomNumber.includes(filters.search ?? "") ||
          room.description?.toLowerCase().includes(search),
      );
    }

    return result;
  },

  getById: async (id: string): Promise<Room> => {
    await sleep(300);
    const room = mockRooms.find((item) => item.id === id);
    if (!room) throw new Error("Room not found");
    return room;
  },

  create: async (dto: CreateRoomDto): Promise<Room> => {
    await sleep(500);
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
    await sleep(500);
    const index = mockRooms.findIndex((room) => room.id === id);
    if (index === -1) throw new Error("Room not found");
    mockRooms[index] = { ...mockRooms[index], ...dto, updatedAt: new Date().toISOString() };
    return mockRooms[index];
  },

  updatePhotos: async (id: string, photos: RoomPhoto[]): Promise<Room> => {
    await sleep(400);
    const index = mockRooms.findIndex((room) => room.id === id);
    if (index === -1) throw new Error("Room not found");
    mockRooms[index] = { ...mockRooms[index], photos, updatedAt: new Date().toISOString() };
    return mockRooms[index];
  },

  delete: async (id: string): Promise<void> => {
    await sleep(300);
    mockRooms = mockRooms.filter((room) => room.id !== id);
  },
};
