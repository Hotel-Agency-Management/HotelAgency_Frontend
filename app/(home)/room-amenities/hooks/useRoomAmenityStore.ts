import { useAuth } from '@/core/context/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createRoomAmenityByAdmin,
  deleteRoomAmenityByAdmin,
  fetchRoomAmenitiesByAdmin,
} from '../clients/adminRoomAmenityClient'
import { getAllRoomAmenities } from '../clients/roomAmenityClient'
import { ROOM_AMENITIES_KEY } from '../constants/roomAmenityFormValues'
import type { CreateRoomAmenityDto, RoomAmenityFilters } from '../types/roomAmenity'
import { USER_ROLES } from '@/lib/abilities'

export const useAdminRoomAmenities = (filters?: RoomAmenityFilters, enabled = true) => {
  return useQuery({
    queryKey: [...ROOM_AMENITIES_KEY, 'admin', filters],
    queryFn: async () => {
      const amenities = await fetchRoomAmenitiesByAdmin()
      if (filters?.search) {
        const search = filters.search.toLowerCase()
        return amenities.filter((a) => a.name.toLowerCase().includes(search))
      }
      return amenities
    },
    enabled,
  })
}

export const useRoomAmenities = (enabled = true) => {
  return useQuery({
    queryKey: [...ROOM_AMENITIES_KEY, 'scoped'],
    queryFn: () => getAllRoomAmenities(),
    enabled,
  })
}

export const useRoomAmenitiesForPicker = () => {
  const { user } = useAuth()
  const isSuperAdmin = user?.role === USER_ROLES.SUPER_ADMIN

  const adminResult = useAdminRoomAmenities(undefined, isSuperAdmin)
  const scopedResult = useRoomAmenities(!isSuperAdmin)

  return isSuperAdmin ? adminResult : scopedResult
}

export const useCreateRoomAmenity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateRoomAmenityDto) => createRoomAmenityByAdmin(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_AMENITIES_KEY })
    },
  })
}

export const useDeleteRoomAmenity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteRoomAmenityByAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_AMENITIES_KEY })
    },
  })
}
