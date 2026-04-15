import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { roomAmenityApi } from "../api/roomAmenityApi";
import { ROOM_AMENITIES_KEY } from "../constants/roomAmenityFormValues";
import type {
  CreateRoomAmenityDto,
  RoomAmenityFilters,
  RoomAmenityPhoto,
  UpdateRoomAmenityDto,
} from "../types/roomAmenity";

export const useRoomAmenities = (filters?: RoomAmenityFilters) => {
  return useQuery({
    queryKey: [...ROOM_AMENITIES_KEY, filters],
    queryFn: () => roomAmenityApi.getAll(filters),
  });
};

export const useRoomAmenity = (id: string) => {
  return useQuery({
    queryKey: [...ROOM_AMENITIES_KEY, "detail", id],
    queryFn: () => roomAmenityApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateRoomAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateRoomAmenityDto) => roomAmenityApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_AMENITIES_KEY });
    },
  });
};

export const useUpdateRoomAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateRoomAmenityDto }) =>
      roomAmenityApi.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_AMENITIES_KEY });
    },
  });
};

export const useDeleteRoomAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => roomAmenityApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_AMENITIES_KEY });
    },
  });
};

export const useUpdateRoomAmenityPhotos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, photos }: { id: string; photos: RoomAmenityPhoto[] }) =>
      roomAmenityApi.updatePhotos(id, photos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_AMENITIES_KEY });
    },
  });
};
