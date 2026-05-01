"use client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { HotelCard } from "./hotelCard/HotelCard";
import type { HotelFormValues } from "../types/hotel";

interface HotelGridProps {
  hotels: (HotelFormValues & { id: string })[];
  onUpdate: (id: string) => void;
  onOpen: (id: string) => void;
  onAdd?: () => void;
}

export function HotelGrid({ hotels, onUpdate, onOpen, onAdd }: HotelGridProps) {
  const router = useRouter()
  const handleAdd = onAdd ?? (() => router.push('/agency/hotels/addHotel'))

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={0.25}>
          <Typography variant="h6" fontWeight={500}>Hotels</Typography>
          <Typography variant="body2">
            {hotels.length} {hotels.length === 1 ? "hotel" : "hotels"}
          </Typography>
        </Stack>
        <Button
          size="small"
          variant="contained"
          disableElevation
          startIcon={<Plus size={15} />}
          onClick={handleAdd}
        >
          Add hotel
        </Button>
      </Stack>

      {hotels.length === 0 ? (
        <Stack alignItems="center" justifyContent="center" py={8} spacing={1}>
          <Typography variant="body2" color="text.secondary">
            No hotels yet. Add your first one.
          </Typography>
        </Stack>
      ) : (
        <Grid container spacing={2.5}>
          {hotels.map((hotel) => (
            <Grid key={hotel.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <HotelCard hotel={hotel} onEdit={onUpdate} onOpen={onOpen} />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
