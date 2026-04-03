import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roomTypesApi } from "../api/roomTypeApi";
import { CreateRoomTypePayload, UpdateRoomTypePayload } from "../types/roomType";

export const useRoomTypes = (hotelId: string) => {
  return useQuery({
    queryKey: ["roomTypes", hotelId],
    queryFn: () => roomTypesApi.getAll(hotelId),
    enabled: !!hotelId,
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["roomTypes", variables.hotelId],
      });
    },
  });
};

export const useUpdateRoomType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateRoomTypePayload) => roomTypesApi.update(payload),
    onSuccess: (updatedRoomType) => {
      queryClient.invalidateQueries({
        queryKey: ["roomTypes", updatedRoomType.hotelId],
      });
      queryClient.invalidateQueries({
        queryKey: ["roomType", updatedRoomType.id],
      });
    },
  });
};

export const useDeleteRoomType = (hotelId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => roomTypesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roomTypes", hotelId],
      });
    },
  });
};
