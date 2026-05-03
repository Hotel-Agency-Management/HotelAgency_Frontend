'use client'
import Container from '@mui/material/Container'
import { HotelGrid } from './HotelGrid'
import type { Hotel } from '../types/hotel'

interface HotelsPageProps {
  hotels: Hotel[]
  onUpdate: (id: string) => void
  onAdd?: () => void
}

export function HotelsPage({ hotels, onUpdate, onAdd }: HotelsPageProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <HotelGrid hotels={hotels} onUpdate={onUpdate} onAdd={onAdd} />
    </Container>
  )
}
