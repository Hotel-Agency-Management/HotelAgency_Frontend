"use client";

import Card from "@/components/ui/Card";
import { HotelCardBase } from "./HotelCardBase";
import { HotelCardOverlay } from "./HotelCardOverlay";
import type { HotelCardProps } from "./types";

export function HotelCard({ hotel, onEdit, onDelete }: HotelCardProps) {
  const { basicInfo, branding } = hotel;

  return (
    <Card variant="hotel" elevation={0}>
      <HotelCardBase
        name={basicInfo.name}
        city={basicInfo.city}
        coverImage={basicInfo.coverImage}
        primaryColor={branding.colors.primary}
      />

      <HotelCardOverlay hotel={hotel} onEdit={onEdit} onDelete={onDelete} />
    </Card>
  );
}
