import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { roomsApi } from "../api/roomApi";
import { RoomFilters, CreateRoomDto, UpdateRoomDto } from "../types/room";


const ROOMS_KEY = ["rooms"] as const;

// GET ALL
export const useRooms = (filters?: RoomFilters) => {
  return useQuery({
    queryKey: [...ROOMS_KEY, filters],
    queryFn: () => roomsApi.getAll(filters),
  });
};

// GET BY ID
export const useRoom = (id: string) => {
  return useQuery({
    queryKey: [...ROOMS_KEY, id],
    queryFn: () => roomsApi.getById(id),
    enabled: !!id,
  });
};

// CREATE
export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateRoomDto) => roomsApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOMS_KEY });
    },
  });
};

// UPDATE
export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateRoomDto }) =>
      roomsApi.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOMS_KEY });
    },
  });
};

// DELETE
export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => roomsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOMS_KEY });
    },
  });
};

// IMPORT EXCEL
export const useImportRooms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => roomsApi.importExcel(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOMS_KEY });
    },
  });
};
