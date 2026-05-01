import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  adminCreateRoomAmenity,
  adminDeleteRoomAmenity,
  adminGetAllRoomAmenities,
} from '../clients/adminRoomAmenityClient'
import { getAllRoomAmenities } from '../clients/roomAmenityClient'
import { ROOM_AMENITIES_KEY } from '../constants/roomAmenityFormValues'
import type { CreateRoomAmenityDto, RoomAmenityFilters } from '../types/roomAmenity'

export const useAdminRoomAmenities = (filters?: RoomAmenityFilters) => {
  return useQuery({
    queryKey: [...ROOM_AMENITIES_KEY, 'admin', filters],
    queryFn: async () => {
      const amenities = await adminGetAllRoomAmenities()
      if (filters?.search) {
        const search = filters.search.toLowerCase()
        return amenities.filter((a) => a.name.toLowerCase().includes(search))
      }
      return amenities
    },
  })
}

export const useRoomAmenities = () => {
  return useQuery({
    queryKey: [...ROOM_AMENITIES_KEY, 'scoped'],
    queryFn: () => getAllRoomAmenities(),
  })
}

export const useCreateRoomAmenity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateRoomAmenityDto) => adminCreateRoomAmenity(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_AMENITIES_KEY })
    },
  })
}

export const useDeleteRoomAmenity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => adminDeleteRoomAmenity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_AMENITIES_KEY })
    },
  })
}
