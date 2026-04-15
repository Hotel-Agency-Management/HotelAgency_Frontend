"use client";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Pencil, Trash2 } from "lucide-react";

interface HotelCardActionsProps {
  hotelId: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function HotelCardActions({ hotelId, onEdit, onDelete }: HotelCardActionsProps) {
  return (
    <Stack direction="row" spacing={0.25}>
      <Tooltip title="Edit">
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(hotelId);
          }}
          aria-label="Edit hotel"
        >
          <Pencil size={14} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(hotelId);
          }}
          aria-label="Delete hotel"
        >
          <Trash2 size={14} color="red"/>
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
