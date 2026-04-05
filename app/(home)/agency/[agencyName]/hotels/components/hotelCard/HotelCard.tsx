"use client";
import Card from "@/components/ui/Card";
import { HotelCardBase } from "./HotelCardBase";
import { HotelCardOverlay } from "./HotelCardOverlay";
import type { HotelCardProps } from "./types";
import { useParams, useRouter } from "next/navigation";

export function HotelCard({ hotel, onEdit, onDelete }: HotelCardProps) {
  const { basicInfo, branding } = hotel;
  const router = useRouter();
  const params = useParams();
  const agencyName = params.agencyName;

  return (
    <Card
      variant="hotel"
      elevation={0}
      onClick={() => router.push(`/agency/${agencyName}/hotels/${hotel.id}/rooms`)}
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