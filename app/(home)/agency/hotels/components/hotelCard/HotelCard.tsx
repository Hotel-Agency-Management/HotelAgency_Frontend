"use client";
import Card from "@/components/ui/Card";
import { HotelCardBase } from "./HotelCardBase";
import { HotelCardOverlay } from "./HotelCardOverlay";
import type { HotelCardProps } from "./types";

export function HotelCard({ hotel, onEdit, onOpen }: HotelCardProps) {
  const { basicInfo, branding } = hotel;

  return (
    <Card
      variant="hotel"
      elevation={0}
      onClick={() => onOpen?.(hotel.id)}
    >
      <HotelCardBase
        name={basicInfo.name}
        city={basicInfo.city}
        coverImage={basicInfo.coverImage}
        primaryColor={branding.colors.primary}
      />
      <HotelCardOverlay hotel={hotel} onEdit={onEdit} />
    </Card>
  );
}
