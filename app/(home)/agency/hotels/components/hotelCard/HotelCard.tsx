"use client";
import Card from "@/components/ui/Card";
import { HotelCardBase } from "./HotelCardBase";
import { HotelCardOverlay } from "./HotelCardOverlay";
import type { HotelCardProps } from "./types";
import { useRouter } from "next/navigation";

export function HotelCard({ hotel, onEdit, onDelete }: HotelCardProps) {
  const { basicInfo, branding } = hotel;
  const router = useRouter();

  return (
    <Card
      variant="hotel"
      elevation={0}
      onClick={() => router.push(`/agency/hotels/${hotel.id}/rooms`)}
    >
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
