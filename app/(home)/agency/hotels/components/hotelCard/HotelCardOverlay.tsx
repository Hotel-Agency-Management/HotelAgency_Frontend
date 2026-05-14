"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { Building2, MapPin, Phone } from "lucide-react";
import { useTeamMembers } from "@/app/(home)/users/hooks/useTeamMembers";
import { DEFAULT_HOTEL_CARD_TEAM_MEMBERS_PAGE_SIZE } from "../../constants/hotel";
import { HotelCardActions } from "./HotelCardActions";
import { HotelCardManager } from "./HotelCardManager";
import type { HotelCardHotel } from "./types";

interface HotelCardOverlayProps {
  hotel: HotelCardHotel;
  onEdit?: (id: string) => void;
}

export function HotelCardOverlay({ hotel, onEdit }: HotelCardOverlayProps) {
  const { getMemberById } = useTeamMembers(
    { pageSize: DEFAULT_HOTEL_CARD_TEAM_MEMBERS_PAGE_SIZE },
    hotel.agencyId
  );
  const { basicInfo, branding, managerId } = hotel;
  const manager = getMemberById(managerId);

  return (
    <Box className="hover-overlay">
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src={branding.logo ?? undefined}
              sx={{
                bgcolor: alpha(branding.colors.primary, 0.27),
                color: "common.white",
                flexShrink: 0,
              }}
            >
              <Building2 size={15} />
            </Avatar>

            <Stack spacing={0.25}>
              <Typography variant="subtitle2" fontWeight={600} color="common.white" noWrap>
                {basicInfo.name}
              </Typography>
            </Stack>
          </Stack>

          <HotelCardActions hotelId={hotel.id} onEdit={onEdit} />
        </Stack>

        <Stack spacing={0.4}>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <MapPin size={14} />
            <Typography
              variant="caption"
              noWrap >
              {basicInfo.city} — {basicInfo.address}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.75} alignItems="center">
            <Phone size={13} />
            <Typography
              variant="caption"
            >
              {basicInfo.phone}
            </Typography>
          </Stack>
        </Stack>

        <HotelCardManager
          manager={manager}
          accentColor={branding.colors.secondary}
        />
      </Stack>
    </Box>
  );
}
