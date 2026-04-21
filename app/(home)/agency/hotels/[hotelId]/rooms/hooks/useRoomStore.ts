import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { roomsApi } from "../api/roomApi";
import { RoomFilters, CreateRoomDto, UpdateRoomDto } from "../types/room";
import { ROOMS_KEY } from "../constants/roomFormValues";

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
    mutationFn: async (_file: File) => roomsApi.importExcel(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOMS_KEY });
    },
  });
};
