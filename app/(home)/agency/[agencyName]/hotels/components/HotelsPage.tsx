'use client'

import Container from "@mui/material/Container";
import { useParams, useRouter } from "next/navigation";
import { HotelGrid } from "./HotelGrid";
import { useHotelStore } from "../hooks/useHotelStore";

export function HotelsPage() {
  const router = useRouter()
  const { agencyName } = useParams<{ agencyName: string }>()
  const { hotels, deleteHotel } = useHotelStore()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <HotelGrid
        hotels={hotels}
        onDelete={deleteHotel}
        onUpdate={(id) => router.push(`/agency/${agencyName}/hotels/${id}/edit`)}
      />
    </Container>
  )
}
