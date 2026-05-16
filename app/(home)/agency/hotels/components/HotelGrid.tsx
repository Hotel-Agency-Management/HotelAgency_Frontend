"use client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { HotelCard } from "./hotelCard/HotelCard";
import type { HotelFormValues } from "../types/hotel";

interface HotelGridProps {
  hotels: (HotelFormValues & { id: string })[];
  onUpdate: (id: string) => void;
  onOpen: (id: string) => void;
  onAdd?: () => void;
  search?: string;
  onSearchChange?: (value: string) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (event: unknown, page: number) => void;
}

export function HotelGrid({
  hotels,
  onUpdate,
  onOpen,
  onAdd,
  search = '',
  onSearchChange,
  page = 1,
  totalPages = 1,
  onPageChange,
}: HotelGridProps) {
  const router = useRouter()
  const handleAdd = onAdd ?? (() => router.push('/agency/hotels/addHotel'))

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
        <Stack spacing={0.25} flexShrink={0}>
          <Typography variant="h6" fontWeight={500}>Hotels</Typography>
          <Typography variant="body2">
            {hotels.length} {hotels.length === 1 ? "hotel" : "hotels"}
          </Typography>
        </Stack>
        <Stack direction="row" gap={1.5} alignItems="center">
          <TextField
            size="small"
            placeholder="Search hotels…"
            value={search}
            onChange={e => onSearchChange?.(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
            sx={{ width: 220 }}
          />
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

      {totalPages > 1 && (
        <Stack alignItems="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={onPageChange}
            color="primary"
            shape="rounded"
          />
        </Stack>
      )}
    </Stack>
  );
}
