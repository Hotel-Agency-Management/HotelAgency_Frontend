import { type MouseEvent, useEffect, useMemo, useState } from 'react'
import { RoomAmenity } from '../types/roomAmenity'
import { PAGE_SIZE, NAME_TOOLTIP_LIMIT } from '../constants/roomAmenityFormValues'



interface Props {
  amenities: RoomAmenity[]
  onDelete: (amenity: RoomAmenity) => void
}

export function useRoomAmenitiesCards({ amenities, onDelete }: Props) {
  const [page, setPage] = useState(1)
  const [menuState, setMenuState] = useState<{
    anchorEl: HTMLElement | null
    amenity: RoomAmenity | null
  }>({ anchorEl: null, amenity: null })

  const pageCount = Math.max(1, Math.ceil(amenities.length / PAGE_SIZE))

  useEffect(() => {
    setPage(1)
  }, [amenities])

  const paginatedAmenities = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return amenities.slice(start, start + PAGE_SIZE)
  }, [amenities, page])

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>, amenity: RoomAmenity) => {
    setMenuState({ anchorEl: event.currentTarget, amenity })
  }

  const handleCloseMenu = () => {
    setMenuState({ anchorEl: null, amenity: null })
  }

  const handleDeleteAmenity = () => {
    const { amenity } = menuState
    handleCloseMenu()
    if (amenity) onDelete(amenity)
  }

  const isMenuOpen = (amenityId: RoomAmenity['id']) => menuState.amenity?.id === amenityId

  return {
    page,
    setPage,
    pageCount,
    menuState,
    paginatedAmenities,
    isMenuOpen,
    handleOpenMenu,
    handleCloseMenu,
    handleDeleteAmenity,
    PAGE_SIZE,
    NAME_TOOLTIP_LIMIT,
  }
}
