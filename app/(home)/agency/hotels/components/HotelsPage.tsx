'use client'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import { HotelGrid } from './HotelGrid'
import type { Hotel } from '../types/hotel'

interface HotelsPageProps {
  hotels: Hotel[]
  onUpdate: (id: string) => void
  onOpen: (id: string) => void
  onAdd?: () => void
  search?: string
  onSearchChange?: (value: string) => void
  page?: number
  totalPages?: number
  onPageChange?: (event: unknown, page: number) => void
}

export function HotelsPage({
  hotels,
  onUpdate,
  onOpen,
  onAdd,
  search,
  onSearchChange,
  page,
  totalPages,
  onPageChange,
}: HotelsPageProps) {
  return (
    <HotelsPageContainer maxWidth="lg">
      <HotelGrid
        hotels={hotels}
        onUpdate={onUpdate}
        onOpen={onOpen}
        onAdd={onAdd}
        search={search}
        onSearchChange={onSearchChange}
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </HotelsPageContainer>
  )
}

const HotelsPageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}))
