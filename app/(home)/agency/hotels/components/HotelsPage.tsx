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
}

export function HotelsPage({ hotels, onUpdate, onOpen, onAdd }: HotelsPageProps) {
  return (
    <HotelsPageContainer maxWidth="lg">
      <HotelGrid hotels={hotels} onUpdate={onUpdate} onOpen={onOpen} onAdd={onAdd} />
    </HotelsPageContainer>
  )
}

const HotelsPageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}))
