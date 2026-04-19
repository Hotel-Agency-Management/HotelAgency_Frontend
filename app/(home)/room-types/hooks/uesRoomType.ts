import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roomTypesApi } from "../api/roomTypeApi";
import { CreateRoomTypePayload, UpdateRoomTypePayload } from "../types/roomType";

const ROOM_TYPES_KEY = ["roomTypes"] as const;

export const useRoomTypes = () => {
  return useQuery({
    queryKey: ROOM_TYPES_KEY,
    queryFn: roomTypesApi.getAll,
  });
};

export const useRoomType = (id: string) => {
  return useQuery({
    queryKey: ["roomType", id],
    queryFn: () => roomTypesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateRoomType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateRoomTypePayload) => roomTypesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_TYPES_KEY });
    },
  });
};

export const useUpdateRoomType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateRoomTypePayload) => roomTypesApi.update(payload),
    onSuccess: (updatedRoomType) => {
      queryClient.invalidateQueries({ queryKey: ROOM_TYPES_KEY });
      queryClient.invalidateQueries({
        queryKey: ["roomType", updatedRoomType.id],
      });
    },
  });
};

export const useDeleteRoomType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => roomTypesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_TYPES_KEY });
    },
  });
};
