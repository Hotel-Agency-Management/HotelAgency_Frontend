import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { facilityApi } from "../data/facilityApi";
import { FACILITIES_KEY } from "../constants/facilityFormValues";
import type {
  CreateFacilityDto,
  FacilityFilters,
  FacilityPhoto,
  UpdateFacilityDto,
} from "../types/facility";

export const useFacilities = (hotelId: string, filters?: FacilityFilters) => {
  return useQuery({
    queryKey: [...FACILITIES_KEY, hotelId, filters],
    queryFn: () => facilityApi.getAll(hotelId, filters),
    enabled: !!hotelId,
  });
};

export const useFacility = (id: string) => {
  return useQuery({
    queryKey: [...FACILITIES_KEY, "detail", id],
    queryFn: () => facilityApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateFacility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ hotelId, dto }: { hotelId: string; dto: CreateFacilityDto }) =>
      facilityApi.create(hotelId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FACILITIES_KEY });
    },
  });
};

export const useUpdateFacility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateFacilityDto }) =>
      facilityApi.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FACILITIES_KEY });
    },
  });
};

export const useUpdateFacilityPhotos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, photos }: { id: string; photos: FacilityPhoto[] }) =>
      facilityApi.updatePhotos(id, photos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FACILITIES_KEY });
    },
  });
};

export const useDeleteFacility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => facilityApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FACILITIES_KEY });
    },
  });
};
